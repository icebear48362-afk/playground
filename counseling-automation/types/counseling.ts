/**
 * 상담로그: 확인되지 않은 항목은 빈 문자열("")로 남긴다 (추측 금지).
 */
export interface CounselingLogData {
  basicInfo: {
    date: string;
    method: string;
    customerName: string;
  };
  customerInfo: {
    currentStatus: string;
    careerSummary: string;
    desiredJob: string;
    desiredCompany: string;
  };
  mainContent: {
    needs: string;
    painPoint: string;
    keyDelivered: string;
  };
  productGuide: {
    programIntroduced: string;
    customerReaction: string;
    paymentStatus: string;
  };
  dropoutReason: string;
  followUp: {
    nextContactDate: string;
    actionItems: string;
  };
  etc: string;
}

/**
 * 결제자 로그: 확인되지 않은 항목은 "미확인"으로 채운다.
 */
export interface PaymentLogData {
  name: string;
  contact: string;
  program: string;
  freeConsultingRound0Needed: string;
  freeConsultingRound1Provided: string;
  round1StartDate: string;
  desiredJob: string;
  desiredCompanyIndustry: string;
  etc: string;
}
