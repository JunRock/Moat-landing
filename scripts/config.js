// 앱 전역 설정값 — 한 곳에서 관리
// 다른 스크립트는 window.MoatConfig로 접근
window.MoatConfig = {
  // 스토어 링크
  appStore: 'https://apps.apple.com/kr/app/id6761710550',
  playStore: 'https://play.google.com/store/apps/details?id=com.moat.moat_app',

  // 소셜
  instagramUrl: 'https://www.instagram.com/moat.official.app/',
  instagramHandle: '@moat.official.app',

  // 문의 채널: Slack Incoming Webhook
  // 새 웹훅 발급은 Slack → Tools → Manage apps → "Incoming Webhooks"
  slackWebhookUrl: 'https://hooks.slack.com/services/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',

  // 지원 메일 (현재는 Slack 채널이 인박스 역할이라 사용 안 함, 향후 도메인 발급 시 사용)
  supportEmail: 'support.moat@gmail.com',

  // 법적 정보
  privacyPolicyUrl: 'https://www.notion.so/Moat-33a4660ff1e7809db69dea0c87e687f0?source=copy_link',
};
