import { analyzeTranscript } from "@/services/analysisService";

const MAX_TRANSCRIPT_LENGTH = 200_000;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "잘못된 요청 형식입니다." }, { status: 400 });
  }

  const transcript =
    typeof body === "object" && body !== null && "transcript" in body
      ? (body as { transcript: unknown }).transcript
      : undefined;

  if (typeof transcript !== "string" || transcript.trim().length === 0) {
    return Response.json(
      { error: "상담 스크립트 내용이 비어 있습니다." },
      { status: 400 }
    );
  }

  if (transcript.length > MAX_TRANSCRIPT_LENGTH) {
    return Response.json(
      { error: "상담 스크립트가 너무 깁니다." },
      { status: 400 }
    );
  }

  try {
    const results = await analyzeTranscript(transcript);
    return Response.json({ results });
  } catch (error) {
    const message = error instanceof Error ? error.message : "분석 중 오류가 발생했습니다.";
    return Response.json({ error: message }, { status: 500 });
  }
}
