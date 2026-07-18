/**
 * 새로운 분석 유형을 추가할 때 이 인터페이스만 만족시키면
 * services/analysisRegistry.ts에 등록하는 것으로 확장이 끝난다.
 */
export interface AnalysisTask<T> {
  id: string;
  label: string;
  buildPrompt: (transcript: string) => string;
  render: (data: T) => string;
}

export interface AnalysisResult {
  id: string;
  label: string;
  content: string;
}
