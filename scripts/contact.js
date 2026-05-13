// 문의 모달: Slack Incoming Webhook으로 바로 전송
// 설정값은 scripts/config.js의 window.MoatConfig에 모여 있음
(function () {
  const overlay = document.getElementById('contactModal');
  if (!overlay) return;

  const SLACK_WEBHOOK_URL = (window.MoatConfig && window.MoatConfig.slackWebhookUrl) || '';

  const triggers = document.querySelectorAll('[data-contact-trigger]');
  const modal = overlay.querySelector('.contact-modal');
  const closeBtn = overlay.querySelector('.contact-close');
  const form = overlay.querySelector('.contact-form');
  const submitBtn = overlay.querySelector('.contact-submit');
  const errorBox = overlay.querySelector('.contact-error');
  const firstInput = overlay.querySelector('input[name="name"]');
  let lastTrigger = null;

  function open(triggerEl) {
    lastTrigger = triggerEl || null;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => firstInput && firstInput.focus(), 200);
  }

  function close() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(resetState, 300);
    if (lastTrigger && typeof lastTrigger.focus === 'function') {
      lastTrigger.focus();
    }
  }

  function resetState() {
    modal && modal.classList.remove('is-success');
    hideError();
    form && form.reset();
    setLoading(false);
  }

  function setLoading(loading) {
    if (!submitBtn) return;
    submitBtn.disabled = loading;
    submitBtn.classList.toggle('is-loading', loading);
  }

  function showError(msg) {
    if (!errorBox) return;
    errorBox.textContent = msg;
    errorBox.classList.add('visible');
  }
  function hideError() {
    if (!errorBox) return;
    errorBox.textContent = '';
    errorBox.classList.remove('visible');
  }

  function showSuccess() {
    modal && modal.classList.add('is-success');
    setTimeout(close, 1800);
  }

  triggers.forEach((t) =>
    t.addEventListener('click', (e) => {
      e.preventDefault();
      open(t);
    })
  );

  closeBtn && closeBtn.addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) close();
  });

  // 문의 유형 칩 선택
  const chipGroup = overlay.querySelector('.chip-group');
  const typeInput = overlay.querySelector('input[name="type"]');
  chipGroup && chipGroup.addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    chipGroup.querySelectorAll('.chip').forEach((c) => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    if (typeInput) typeInput.value = chip.dataset.value || '일반 문의';
  });

  function buildSlackPayload({ name, email, type, message }) {
    const meta = ({
      '일반 문의': { emoji: '💬', color: '#3182F6', label: '일반 문의' },
      '기능 제안': { emoji: '💡', color: '#F59E0B', label: '기능 제안' },
      '버그 신고': { emoji: '🐞', color: '#F04452', label: '버그 알림' },
      '제휴/협업': { emoji: '🤝', color: '#00C896', label: '제휴 문의' },
    })[type] || { emoji: '📨', color: '#8B95A1', label: '문의' };

    const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const quote = (s) => esc(s).split('\n').map((l) => `> ${l || ' '}`).join('\n');

    return {
      // 푸시 알림용 fallback 텍스트
      text: `[${meta.label}]`,
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `${meta.emoji}  *[${meta.label}]*\n*보낸이* : ${esc(email)}`,
          },
        },
        {
          type: 'section',
          text: { type: 'mrkdwn', text: quote(message) },
        },
      ],
    };
  }

  form && form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    hideError();
    setLoading(true);

    const data = new FormData(form);
    const payload = {
      name: (data.get('name') || '').toString().trim(),
      email: (data.get('email') || '').toString().trim(),
      type: (data.get('type') || '일반 문의').toString(),
      message: (data.get('message') || '').toString().trim(),
    };

    try {
      const res = await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        // Slack 웹훅은 application/json 보내면 CORS preflight 발생하므로
        // text/plain으로 보내야 simple request로 처리됨
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: 'payload=' + encodeURIComponent(JSON.stringify(buildSlackPayload(payload))),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => '');
        console.error('Slack webhook failed:', res.status, text);
        showError('전송에 실패했어요. 잠시 후 다시 시도해주세요.');
        setLoading(false);
        return;
      }
      setLoading(false);
      showSuccess();
    } catch (err) {
      console.error(err);
      showError('네트워크 오류가 발생했어요.');
      setLoading(false);
    }
  });
})();
