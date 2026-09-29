// ─── 환경 설정 ──────────────────────────────────────────
// 개발판과 운영판은 이 파일만 다르다. 운영 반영(덮어쓰기) 때 이 파일은 운영값으로 둔다.
window.WH_CONFIG = {
  ENV: 'dev',        // 'dev' | 'prod'
  GS_URL: '',        // 개발용 Apps Script 웹앱 URL (사본 시트에 연결된 것) — 받으면 채울 것
  GS_TOKEN: 'TEAM_SECRET_2024',
  ADMIN_PIN: '5552',
};
