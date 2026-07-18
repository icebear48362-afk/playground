"use client";

import { useRef, useState } from "react";

interface FileUploadZoneProps {
  selectedFileName: string | null;
  onFileLoaded: (fileName: string, content: string) => void;
  onError: (message: string) => void;
}

export function FileUploadZone({
  selectedFileName,
  onFileLoaded,
  onError,
}: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFile(file: File) {
    if (!file.name.toLowerCase().endsWith(".txt")) {
      onError("txt 파일만 업로드할 수 있습니다.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onFileLoaded(file.name, String(reader.result ?? ""));
    };
    reader.onerror = () => {
      onError("파일을 읽는 중 오류가 발생했습니다.");
    };
    reader.readAsText(file, "utf-8");
  }

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
      }}
      className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
        isDragging
          ? "border-slate-500 bg-slate-50"
          : "border-slate-200 bg-white"
      }`}
    >
      <p className="text-sm text-slate-500">
        상담 스크립트(.txt) 파일을 이곳에 드래그하거나
      </p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
      >
        파일 선택
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".txt,text/plain"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      {selectedFileName && (
        <p className="text-sm font-medium text-slate-700">
          업로드된 파일: {selectedFileName}
        </p>
      )}
    </div>
  );
}
