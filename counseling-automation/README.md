# 상담 자동화

Clova Note에서 다운로드한 상담 스크립트(txt)를 업로드하면 Claude가 상담 내용을
분석해 **상담로그**와 **결제자 로그**를 자동 생성하는 웹 서비스입니다.

## 시작하기

```bash
npm install
cp .env.local.example .env.local   # ANTHROPIC_API_KEY 입력
npm run dev
```

http://localhost:3000 에서 확인할 수 있습니다.

## 프로젝트 구조

```
app/          페이지, API 라우트(app/api/analyze)
components/   UI 컴포넌트
services/     분석 오케스트레이션, Claude 호출 로직
prompts/      AI 프롬프트 (결과물별로 분리)
templates/    결과물 텍스트 양식 (결과물별로 분리)
types/        공유 타입
utils/        범용 유틸 (클립보드 등)
lib/          외부 클라이언트 초기화 (Anthropic)
```

## 결과물 양식/프롬프트 수정하기

- **양식(출력 텍스트)을 바꾸고 싶다면** → `templates/counselingTemplate.ts`,
  `templates/paymentTemplate.ts`만 수정하면 됩니다.
- **AI 추출 규칙/프롬프트를 바꾸고 싶다면** → `prompts/` 안의 해당 파일
  (공통 규칙은 `prompts/sharedRules.ts`)만 수정하면 됩니다.
- 컴포넌트나 API 라우트는 건드릴 필요가 없습니다.

## 새로운 결과물 타입 추가하기

기존 코드를 수정하지 않고 파일 추가만으로 확장할 수 있습니다.

1. `types/`에 데이터 타입 추가
2. `prompts/`에 프롬프트 함수 추가
3. `templates/`에 렌더 함수 추가
4. `services/analysisRegistry.ts`의 `analysisTasks` 배열에 항목 하나 추가

## 향후 확장 아이디어

- 음성 파일 업로드 + Whisper/Clova Speech 연동 (`app/api/`에 별도 라우트 추가)
- Notion 자동 저장 (`services/`에 별도 서비스 추가)
- 모델 교체는 `lib/anthropic.ts`의 `ANTHROPIC_MODEL` 또는 `.env.local`만 수정
- 상담 유형별 프롬프트는 `prompts/` + `services/analysisRegistry.ts`에 추가
