import { buildCounselingPrompt } from "@/prompts/counselingPrompt";
import { buildPaymentPrompt } from "@/prompts/paymentPrompt";
import { renderCounselingTemplate } from "@/templates/counselingTemplate";
import { renderPaymentTemplate } from "@/templates/paymentTemplate";
import { counselingMockData, paymentMockData } from "@/services/mockData";
import type { AnalysisTask } from "@/types/analysis";

/**
 * 상담 스크립트에서 생성할 결과물 목록.
 *
 * 새 결과물을 추가하려면:
 *   1. types/에 데이터 타입 추가
 *   2. prompts/에 프롬프트 함수 추가
 *   3. templates/에 렌더 함수 추가
 *   4. 아래 배열에 항목 하나 추가
 * 컴포넌트나 API 라우트는 수정할 필요 없다.
 */
export const analysisTasks: AnalysisTask<any>[] = [
  {
    id: "counselingLog",
    label: "상담로그",
    buildPrompt: buildCounselingPrompt,
    render: renderCounselingTemplate,
    mockData: counselingMockData,
  },
  {
    id: "paymentLog",
    label: "결제자 로그",
    buildPrompt: buildPaymentPrompt,
    render: renderPaymentTemplate,
    mockData: paymentMockData,
  },
];
