"use client";

import { useState } from "react";
import { FileUploadZone } from "@/components/FileUploadZone";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ResultCard } from "@/components/ResultCard";
import type { AnalysisResult } from "@/types/analysis";

export function ConsultationAutomation() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  function handleFileLoaded(name: string, content: string) {
    setFileName(name);
    setTranscript(content);
    setResults([]);
    setError(null);
  }

  async function handleAnalyze() {
    if (!transcript.trim()) {
      setError("먼저 상담 스크립트 파일을 업로드해주세요.");
      return;
    }
    setIsAnalyzing(true);
    setError(null);
    setResults([]);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "분석 중 오류가 발생했습니다.");
      }
      setResults(data.results as AnalysisResult[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "분석 중 오류가 발생했습니다.");
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-6 py-16">
      <header className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-slate-900">상담 자동화</h1>
        <p className="text-sm text-slate-500">
          Clova Note에서 다운로드한 상담 스크립트를 업로드하면 상담로그와
          결제자 로그를 자동 생성합니다.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <FileUploadZone
          selectedFileName={fileName}
          onFileLoaded={handleFileLoaded}
          onError={setError}
        />

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={isAnalyzing || !transcript}
          className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          상담 분석 시작
        </button>

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </p>
        )}
      </section>

      {isAnalyzing && <LoadingSpinner label="상담 내용을 분석하고 있습니다..." />}

      {results.length > 0 && (
        <section className="flex flex-col gap-5">
          {results.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </section>
      )}
    </div>
  );
}
