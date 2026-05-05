# Moat Landing

[모앗(Moat)](https://apps.apple.com/kr/app/id6761710550) — 동호회 운영 앱의 소개 랜딩 페이지.

정적 HTML/CSS/JS 한 페이지로 구성. 빌드 도구 없이 브라우저로 바로 열림.

## 구조

```
moat-landing/
├── index.html        # 마크업
├── styles.css        # 스타일
├── script.js         # 스크롤 애니메이션 (IntersectionObserver)
├── vercel.json       # 배포 설정 (보안 헤더 등)
├── assets/           # 이미지
│   ├── icon.jpg          # 앱 아이콘 (로고)
│   ├── home.png          # 히어로 폰 화면
│   ├── schedule.png      # 정모 일정
│   ├── fee.png           # 회비 납부
│   ├── court.png         # 코트 배치
│   ├── guest.png         # 회원 목록
│   ├── vote.png          # 투표
│   ├── role.png          # 설정·관리
│   ├── payment.png       # 멤버 회비 송금 (Deep Dive)
│   ├── unpaid.png        # 운영진 미납 관리 (Deep Dive)
│   └── og-image.png      # SNS 공유 미리보기 (1200×630)
└── README.md
```

## 페이지 구성

1. **Hero** — 헤드라인 + 다운로드 버튼 + 홈 화면 폰 목업
2. **Problem** — 단톡방·엑셀 운영의 페인포인트 3가지
3. **Features** — 좌우 교차 블록 6개 (정모·회비·코트·회원·투표·권한)
4. **Deep Dive** — 운영진/멤버 양쪽 시점의 핵심 가치
5. **Compare** — 단톡방·기존 도구 vs 모앗 비교 표
6. **FAQ** — 자주 묻는 질문 6개
7. **Final CTA** — 다운로드 유도

## 로컬 미리보기

브라우저로 직접 열기:

```bash
open index.html
```

또는 로컬 서버 (외부 폰트 캐싱이나 CORS가 필요한 경우):

```bash
python3 -m http.server 3000
# → http://localhost:3000
```

## 배포

Vercel CLI로 배포:

```bash
vercel              # 미리보기 배포
vercel --prod       # 프로덕션 배포
```

`vercel.json`에 보안 헤더(`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`)와 `cleanUrls` 설정이 포함되어 있음.

## OG 이미지 재생성

`og-image.png`를 다시 만들려면 Chrome 헤드리스로 캡처:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars \
  --window-size=1200,630 \
  --screenshot=assets/og-image.png \
  "file:///tmp/og-template.html"
```

(템플릿은 `/tmp/og-template.html`에 별도 보관)

## 디자인 토큰

`:root`에 정의됨 (`styles.css` 상단):

| 토큰 | 값 | 용도 |
|---|---|---|
| `--primary` | `#2563eb` | 브랜드 블루 |
| `--primary-dark` | `#1e40af` | 진한 블루 (호버) |
| `--accent` | `#f59e0b` | 멤버 강조 (앰버) |
| `--text` | `#0f172a` | 본문 |
| `--text-muted` | `#64748b` | 보조 텍스트 |
| `--bg-soft` | `#f8fafc` | 섹션 배경 |
| `--radius-lg` | `24px` | 카드 라운드 |

## 폰트

[Pretendard](https://github.com/orioncactus/pretendard) (Google Fonts CDN, 가중치 400/500/600/700/800/900)
