import type { CounselingLogData, PaymentLogData } from "@/types/counseling";

/**
 * ANTHROPIC_API_KEY가 없을 때 UI 확인용으로 보여주는 예시 데이터.
 * 실제 상담 내용이 아니므로 값 자체는 자유롭게 바꿔도 된다.
 */
export const counselingMockData: CounselingLogData = {
  basicInfo: { date: "2026-01-15", method: "화상 상담", customerName: "홍길동 (예시)" },
  customerInfo: {
    currentStatus: "재직 중, 이직 준비",
    careerSummary: "백엔드 개발 3년차",
    desiredJob: "백엔드 개발자",
    desiredCompany: "IT 대기업",
  },
  mainContent: {
    needs: "이직 컨설팅 및 이력서 첨삭",
    painPoint: "이력서 작성과 코딩테스트 준비에 대한 부담",
    keyDelivered: "프리미엄 이직 컨설팅 프로그램 구성 안내",
  },
  productGuide: {
    programIntroduced: "프리미엄 이직 컨설팅",
    customerReaction: "긍정적, 상담 후 결제 진행",
    paymentStatus: "결제 완료",
  },
  dropoutReason: "",
  followUp: { nextContactDate: "다음 주 월요일", actionItems: "이력서 초안 요청" },
  etc: "이 카드는 ANTHROPIC_API_KEY 미설정 상태의 예시 데이터입니다.",
};

export const paymentMockData: PaymentLogData = {
  name: "홍길동 (예시)",
  contact: "010-0000-0000",
  program: "프리미엄 이직 컨설팅",
  freeConsultingRound0Needed: "미확인",
  freeConsultingRound1Provided: "미확인",
  round1StartDate: "다음 주 월요일",
  desiredJob: "백엔드 개발자",
  desiredCompanyIndustry: "IT 대기업",
  etc: "이 카드는 ANTHROPIC_API_KEY 미설정 상태의 예시 데이터입니다.",
};
