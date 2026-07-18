import { analysisTasks } from "@/services/analysisRegistry";
import { extractStructuredData } from "@/services/claudeService";
import type { AnalysisResult } from "@/types/analysis";

/**
 * 상담 스크립트 텍스트를 받아 등록된 모든 분석 결과물을 생성한다.
 */
export async function analyzeTranscript(
  transcript: string
): Promise<AnalysisResult[]> {
  return Promise.all(
    analysisTasks.map(async (task) => {
      try {
        const prompt = task.buildPrompt(transcript);
        const data = await extractStructuredData(prompt);
        return {
          id: task.id,
          label: task.label,
          content: task.render(data),
        };
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new Error(`[${task.label}] 분석 실패: ${message}`);
      }
    })
  );
}
