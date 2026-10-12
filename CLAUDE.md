# warehouse-management-dev

자재 입출고 웹앱의 **개발판**. 운영판(`pdw212235-eng/warehouse-management`, 팀이 실제로 쓰는 것)을
복제해서 전면 개편 중이며, 완성되면 운영판을 이 코드로 덮어쓴다.

## 운영/개발 분리 규칙

| | 운영판 | 개발판 (여기) |
|---|---|---|
| 저장소 | `pdw212235-eng/warehouse-management` | `pdw212235-eng/warehouse-management-dev` |
| 로컬 | `~/dev/warehouse-management` | `~/dev/warehouse-management-dev` |
| 주소 | pdw212235-eng.github.io/warehouse-management | pdw212235-eng.github.io/warehouse-management-dev |
| 백엔드 | 운영 시트 + Apps Script | **시트 사본** + 사본의 Apps Script |

- 개발판과 운영판의 차이는 `config.js` 하나뿐이다 (`ENV`, `GS_URL`, 토큰, PIN).
- `ENV !== 'prod'`인데 `GS_URL`이 운영 백엔드면 app.js가 **모든 요청을 차단**한다 (`BACKEND_BLOCK`).
  테스트 기록이 운영 시트에 들어가는 사고를 막는 장치이니 지우지 말 것.
- 이 로컬 저장소의 `prod` 리모트는 fetch 전용이다 (push URL을 막아둠). 운영 반영은 아래 절차로만 한다.
- 헤더의 주황색 DEV 배지와 탭 제목 `[DEV]`로 두 사이트를 구분한다.

## 백엔드 (Apps Script)

- 개발용 웹앱(사본 시트): `AKfycbz1xF…` — 2026-10-12 분리 실측 확인(개발 주소로 쓴 값이 운영엔 안 나타남).
  사본에는 `[개발판 연결 테스트]` 입고 1건(NotePC)이 테스트로 들어가 있다.
- Apps Script 코드는 아직 저장소 밖에 있다. 받으면 `backend/Code.gs`로 넣어 버전관리한다.
- 백엔드 사실: `settings`는 JSON 통째로 저장되고 모르는 키도 보존한다(`itemNotes`가 그렇게 들어감).
  `action=all`은 **최근 200건만** 내려준다 — 품목 합계는 `stock[].inQty/outQty`를 쓸 것.

## 운영 반영(덮어쓰기) 체크리스트

1. 개발판에서 기능 검증 완료 (폰에서 QR 스캔 포함 — 카메라는 HTTPS 주소에서만 됨)
2. 시트 구조가 바뀌었으면 운영 시트에 같은 열/시트를 먼저 추가 (마이그레이션)
3. 운영 Apps Script에 `backend/Code.gs` 붙여넣기 → **배포 관리 → 기존 배포 수정 → 새 버전**
   (새 배포를 만들면 URL이 바뀌어 운영판이 끊긴다)
4. 운영 저장소에 코드 반영. 단, 운영 `config.js`는 `ENV: 'prod'` + 운영 `GS_URL` 유지
5. 운영 주소에서 조회 + 입고 1건 확인
6. 개발용 시트 사본/웹앱 정리 (운영 데이터 사본이 공개 URL로 남지 않게)
