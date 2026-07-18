/**
 * 새로운 분석 유형을 추가할 때 이 인터페이스만 만족시키면
 * services/analysisRegistry.ts에 등록하는 것으로 확장이 끝난다.
 */
export interface AnalysisTask<T> {
  id: string;
  label: string;
  buildPrompt: (transcript: string) => string;
  render: (data: T) => string;
  /** OPENAI_API_KEY가 없을 때 실제 호출 대신 보여줄 예시 데이터 */
  mockData: T;
}

export interface AnalysisResult {
  id: string;
  label: string;
  content: string;
  /** true면 실제 GPT 분석이 아니라 mockData를 렌더링한 결과 */
  isMock: boolean;
}
