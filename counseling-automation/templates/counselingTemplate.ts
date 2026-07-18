import type { CounselingLogData } from "@/types/counseling";

/**
 * 상담로그 양식. 양식을 바꾸고 싶으면 이 파일만 수정하면 된다.
 * (컴포넌트/서비스 로직은 건드릴 필요 없음)
 */
export function renderCounselingTemplate(data: CounselingLogData): string {
  return `1. 기본 정보

- 상담 일자 : ${data.basicInfo.date}
- 상담 방식 : ${data.basicInfo.method}
- 고객명 : ${data.basicInfo.customerName}

2. 고객 정보

- 현재 상태 : ${data.customerInfo.currentStatus}
- 전공 / 경력 요약 : ${data.customerInfo.careerSummary}
- 희망 직무 : ${data.customerInfo.desiredJob}
- 희망 기업/산업 : ${data.customerInfo.desiredCompany}

3. 상담 주요 내용

- 고객 니즈 : ${data.mainContent.needs}
- 주요 고민 / Pain Point : ${data.mainContent.painPoint}
- 상담 중 전달한 핵심 내용 : ${data.mainContent.keyDelivered}

4. 상품 안내

- 안내한 프로그램 : ${data.productGuide.programIntroduced}
- 고객 반응 : ${data.productGuide.customerReaction}
- 결제 여부 : ${data.productGuide.paymentStatus}

5. 이탈 / 보류 사유

- ${data.dropoutReason}

6. Follow-up 계획

- 재컨택 일정 : ${data.followUp.nextContactDate}
- 액션 아이템 : ${data.followUp.actionItems}

7. 기타 특이사항

- ${data.etc}`;
}
