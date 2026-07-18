import { hasOpenAIKey } from "@/lib/openai";
import { analysisTasks } from "@/services/analysisRegistry";
import { extractStructuredData } from "@/services/openaiService";
import type { AnalysisResult } from "@/types/analysis";

/**
 * 상담 스크립트 텍스트를 받아 등록된 모든 분석 결과물을 생성한다.
 * OPENAI_API_KEY가 없으면 실제 호출 없이 각 작업의 mockData를 렌더링한다.
 */
export async function analyzeTranscript(
  transcript: string
): Promise<AnalysisResult[]> {
  const useMock = !hasOpenAIKey();

  return Promise.all(
    analysisTasks.map(async (task) => {
      try {
        const data = useMock
          ? task.mockData
          : await extractStructuredData(task.buildPrompt(transcript));
        return {
          id: task.id,
          label: task.label,
          content: task.render(data),
          isMock: useMock,
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`[${task.label}] 분석 실패: ${message}`);
      }
    })
  );
}
