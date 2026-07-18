import { ANTHROPIC_MODEL, getAnthropicClient } from "@/lib/anthropic";

const MAX_TOKENS = 2048;

/**
 * 프롬프트를 Claude에 보내고, 응답에서 JSON 객체 하나를 파싱해서 반환한다.
 * AI 호출/파싱 로직이 여기 한 곳에만 있어야 프롬프트나 모델을 바꿀 때
 * 다른 코드를 건드리지 않아도 된다.
 */
export async function extractStructuredData<T>(prompt: string): Promise<T> {
  const client = getAnthropicClient();

  const response = await client.messages.create({
    model: ANTHROPIC_MODEL,
    max_tokens: MAX_TOKENS,
    messages: [{ role: "user", content: prompt }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Claude 응답에서 텍스트를 찾을 수 없습니다.");
  }

  return parseJsonResponse<T>(textBlock.text);
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
    throw new Error(`Claude 응답을 JSON으로 파싱하지 못했습니다: ${cleaned}`);
  }
}
