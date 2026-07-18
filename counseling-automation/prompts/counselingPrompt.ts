import { SHARED_EXTRACTION_RULES } from "./sharedRules";

/**
 * 상담로그 추출 프롬프트. types/counseling.ts의 CounselingLogData와
 * 반드시 같은 키를 가진 JSON을 반환하도록 지시한다.
 * 확인되지 않은 값은 빈 문자열("")로 남긴다.
 */
export function buildCounselingPrompt(transcript: string): string {
  return `당신은 취업 컨설팅 상담 내용을 정리하는 어시스턴트입니다.
아래 상담 스크립트를 분석해서 "상담로그"를 작성하세요.

# 규칙
${SHARED_EXTRACTION_RULES}
- 확인할 수 없는 항목은 빈 문자열("")로 남긴다. 절대 "미확인" 같은 임의 텍스트를 넣지 않는다.

# 출력 형식
아래 JSON 스키마와 정확히 동일한 키를 가진 JSON 객체 하나만 출력하세요.
설명, 마크다운 코드블록, 그 외 텍스트는 절대 포함하지 마세요.

{
  "basicInfo": { "date": string, "method": string, "customerName": string },
  "customerInfo": { "currentStatus": string, "careerSummary": string, "desiredJob": string, "desiredCompany": string },
  "mainContent": { "needs": string, "painPoint": string, "keyDelivered": string },
  "productGuide": { "programIntroduced": string, "customerReaction": string, "paymentStatus": string },
  "dropoutReason": string,
  "followUp": { "nextContactDate": string, "actionItems": string },
  "etc": string
}

# 상담 스크립트
"""
${transcript}
"""`;
}
