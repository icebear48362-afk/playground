import type { PaymentLogData } from "@/types/counseling";

/**
 * 결제자 로그 양식. 양식을 바꾸고 싶으면 이 파일만 수정하면 된다.
 * (컴포넌트/서비스 로직은 건드릴 필요 없음)
 */
export function renderPaymentTemplate(data: PaymentLogData): string {
  return `- 이름 : ${data.name}
- 연락처 : ${data.contact}
- 프로그램 : ${data.program}
- 0회차 무료 컨설팅 필요 : ${data.freeConsultingRound0Needed}
- 1회차 무료 컨설팅 혜택 제공 : ${data.freeConsultingRound1Provided}
- 1회차 시작일 : ${data.round1StartDate}
- 희망 직무 : ${data.desiredJob}
- 희망 기업/산업 : ${data.desiredCompanyIndustry}
- 특이사항 : ${data.etc}`;
}
