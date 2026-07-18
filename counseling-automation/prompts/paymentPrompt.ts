import { SHARED_EXTRACTION_RULES } from "./sharedRules";

/**
 * 결제자 로그 추출 프롬프트. types/counseling.ts의 PaymentLogData와
 * 반드시 같은 키를 가진 JSON을 반환하도록 지시한다.
 * 확인되지 않은 값은 "미확인"으로 채운다.
 */
export function buildPaymentPrompt(transcript: string): string {
  return `당신은 취업 컨설팅 상담 내용에서 결제 관련 정보를 정리하는 어시스턴트입니다.
아래 상담 스크립트를 분석해서 "결제자 로그"를 작성하세요.

# 규칙
${SHARED_EXTRACTION_RULES}
- 확인할 수 없는 항목은 반드시 "미확인"이라는 문자열로 채운다.

# 출력 형식
아래 JSON 스키마와 정확히 동일한 키를 가진 JSON 객체 하나만 출력하세요.
설명, 마크다운 코드블록, 그 외 텍스트는 절대 포함하지 마세요.

{
  "name": string,
  "contact": string,
  "program": string,
  "freeConsultingRound0Needed": string,
  "freeConsultingRound1Provided": string,
  "round1StartDate": string,
  "desiredJob": string,
  "desiredCompanyIndustry": string,
  "etc": string
}

# 상담 스크립트
"""
${transcript}
"""`;
}
