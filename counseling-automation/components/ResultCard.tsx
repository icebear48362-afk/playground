"use client";

import { useState } from "react";
import { copyToClipboard } from "@/utils/clipboard";
import type { AnalysisResult } from "@/types/analysis";

export function ResultCard({ result }: { result: AnalysisResult }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const ok = await copyToClipboard(result.content);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
        <h3 className="text-sm font-semibold text-slate-800">{result.label}</h3>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50"
        >
          {copied ? "복사됨" : "복사"}
        </button>
      </div>
      <pre className="whitespace-pre-wrap break-words px-5 py-4 text-sm leading-relaxed text-slate-700">
        {result.content}
      </pre>
    </div>
  );
}
