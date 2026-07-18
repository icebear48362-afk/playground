import { OPENAI_MODEL, getOpenAIClient } from "@/lib/openai";

/**
 * 프롬프트를 GPT에 보내고, 응답에서 JSON 객체 하나를 파싱해서 반환한다.
 * AI 호출/파싱 로직이 여기 한 곳에만 있어야 프롬프트나 모델을 바꿀 때
 * 다른 코드를 건드리지 않아도 된다.
 */
export async function extractStructuredData<T>(prompt: string): Promise<T> {
  const client = getOpenAIClient();

  const completion = await client.chat.completions.create({
    model: OPENAI_MODEL,
    messages: [{ role: "user", content: prompt }],
    response_format: { type: "json_object" },
  });

  const text = completion.choices[0]?.message?.content;
  if (!text) {
    throw new Error("GPT 응답에서 텍스트를 찾을 수 없습니다.");
  }

  return parseJsonResponse<T>(text);
}

function parseJsonResponse<T>(raw: string): T {
  const cleaned = raw
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/```\s*$/i, "")
    .trim();

  try {
    return JSON.parse(cleaned) as T;
  } catch {
    throw new Error(`GPT 응답을 JSON으로 파싱하지 못했습니다: ${cleaned}`);
  }
}
