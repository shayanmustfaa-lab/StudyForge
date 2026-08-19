(() => {
  'use strict';

  const SCHEDULE = {
    breakStart: '20 Aug 2026',
    breakEnd: '21 Aug 2026',
    resumeDate: '22 Aug 2026',
    testDate: '25 Aug 2026',
    testShort: 'Tuesday, 25 August · 7:00 PM',
    testName: '6-Day Weekly Test',
    coverage: 'Day 10–15 + pending Board Exam Part 2'
  };

  try {
    localStorage.setItem('studyforge-break-2026-08-20-21', JSON.stringify({
      type: '2-day break',
      start: '2026-08-20',
      end: '2026-08-21',
      resume: '2026-08-22',
      nextTest: '2026-08-25T19:00:00+05:00',
      note: 'Day 10 resumes after the 2-day break.'
    }));
  } catch {}

  const setText = (el, text) => {
    if (el && el.textContent !== text) el.textContent = text;
  };

  function replaceText(root, pairs) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      let next = node.nodeValue;
      for (const [pattern, replacement] of pairs) next = next.replace(pattern, replacement);
      if (next !== node.nodeValue) node.nodeValue = next;
    }
  }

  function countdown() {
    const ms = new Date('2026-08-25T19:00:00+05:00').getTime() - Date.now();
    if (ms <= 0) return 'Test window started';
    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    return d > 0 ? `${d}d ${h}h ${m}m remaining` : `${h}h ${m}m remaining`;
  }

  function syncGlobalDates() {
    replaceText(document.querySelector('.content'), [
      [/Sunday, 23 August · 7:00 PM/g, SCHEDULE.testShort],
      [/Sunday, 23 Aug · 7:00 PM/g, 'Tuesday, 25 Aug · 7:00 PM'],
      [/23 Aug · 7 PM/g, '25 Aug · 7 PM'],
      [/Sunday, 23 August/g, 'Tuesday, 25 August']
    ]);
  }

  function syncOverview() {
    const hero = document.querySelector('.hero-card');
    if (hero) {
      setText(hero.querySelector('.live-pill'), '2-DAY OFF · 20–21 AUG');
      setText(hero.querySelector('.hero-copy h2'), '2-day break. Day 10 resumes 22 Aug.');
    }

    const next = document.querySelector('.next-test-card');
    if (next) {
      setText(next.querySelector('h3'), SCHEDULE.testName);
      setText(next.querySelector('p'), 'Tuesday, 25 Aug · 7:00 PM · Day 10–15 + Board Part 2');
      const meta = next.querySelectorAll('.test-meta span');
      if (meta[0]) setText(meta[0], 'Board-style');
      if (meta[1]) setText(meta[1], '2-day off: 20–21 Aug · Resume 22 Aug');
    }
  }

  function syncTests() {
    const root = document.querySelector('.tests-view');
    if (!root) return;
    const card = root.querySelector('.combined-test');
    if (card) {
      const date = card.querySelector('.test-date');
      if (date) {
        setText(date.querySelector('span'), 'AUG');
        setText(date.querySelector('strong'), '25');
        setText(date.querySelector('small'), 'TUE');
      }
      setText(card.querySelector('.section-kicker'), 'Upcoming · 7:00 PM');
      setText(card.querySelector('h2'), SCHEDULE.testName);
      const p = card.querySelector('p');
      if (p) setText(p, '20–21 Aug 2-day off. Day 10 resumes 22 Aug. Weekly board-style test Tuesday, 25 Aug at 7:00 PM; pending Board Exam Part 2 bhi isi test mein rahega.');
    }
  }

  function syncCurrentProgress(center) {
    const kickers = [...center.querySelectorAll('.sf-kicker')];
    const k = kickers.find(x => x.textContent.trim() === 'CURRENT PROGRESS');
    const card = k?.closest('.sf-card');
    if (!card) return;
    let note = card.querySelector('[data-sf-break-note]');
    if (!note) {
      note = document.createElement('p');
      note.className = 'sf-note';
      note.dataset.sfBreakNote = '1';
      card.appendChild(note);
    }
    setText(note, '2-day off: 20–21 Aug · Day 10 resumes 22 Aug · next test 25 Aug, 7:00 PM.');
  }

  function syncCalendar(center) {
    center.querySelectorAll('.sf-calendar .day').forEach(day => {
      const n = day.querySelector('strong')?.textContent.trim();
      const sm = day.querySelector('small');
      if (n === '20' || n === '21') {
        day.classList.remove('study', 'test');
        day.dataset.sfBreakDay = '1';
        if (sm) setText(sm, 'OFF');
      }
      if (n === '23') {
        day.classList.remove('test');
        if (sm && /6-Day Test/i.test(sm.textContent)) setText(sm, 'Study');
      }
      if (n === '25') {
        day.classList.add('test');
        if (sm) setText(sm, '6-Day Test');
      }
    });
  }

  function syncTestCenter(center) {
    const kickers = [...center.querySelectorAll('.sf-kicker')];
    const k = kickers.find(x => /^(SUNDAY|TUESDAY) · 7:00 PM$/.test(x.textContent.trim()));
    const card = k?.closest('.sf-card');
    if (card) {
      setText(k, 'TUESDAY · 7:00 PM');
      setText(card.querySelector('h3'), SCHEDULE.testName);
      setText(card.querySelector('.sf-countdown'), countdown());
      const p = card.querySelector('p');
      if (p) setText(p, '2-day off 20–21 Aug · Day 10 resumes 22 Aug · Day 10–15 + pending Board Exam Part 2.');
    }
  }

  function syncReports(center) {
    const report = center.querySelector('#sf-report');
    if (!report) return;
    const cards = report.querySelectorAll(':scope > .sf-card');
    const checkpoint = [...cards].find(c => c.querySelector('h3')?.textContent.trim() === 'Next checkpoint');
    if (checkpoint) {
      const ps = checkpoint.querySelectorAll('p');
      if (ps[0]) ps[0].innerHTML = '<b>6-Day Weekly Test</b><br>Tuesday, 25 August · 7:00 PM<br><small>2-day off: 20–21 Aug · resume 22 Aug · Day 10–15 + pending Board Part 2</small>';
      if (ps[1]) setText(ps[1], countdown());
    }
  }

  function syncNotifications(center) {
    const kickers = [...center.querySelectorAll('.sf-kicker')];
    const k = kickers.find(x => x.textContent.trim() === 'REMINDER RULES');
    const card = k?.closest('.sf-card');
    if (!card) return;
    card.querySelectorAll('.sf-list > div').forEach(row => {
      const b = row.querySelector('b');
      const span = row.querySelector('span');
      if (!b || !span) return;
      if (b.textContent.trim() === 'Sunday test' || b.textContent.trim() === 'Weekly test') {
        setText(b, 'Weekly test');
        setText(span, '25 Aug · 7 PM · 6-Day Weekly Test');
      }
    });
  }

  function syncStudyCenter() {
    const center = document.getElementById('sf-center');
    if (!center) return;
    syncCurrentProgress(center);
    syncCalendar(center);
    syncTestCenter(center);
    syncReports(center);
    syncNotifications(center);
  }

  function patch() {
    syncGlobalDates();
    syncOverview();
    syncTests();
    syncStudyCenter();
  }

  let queued = false;
  const queue = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      patch();
    });
  };

  new MutationObserver(queue).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', patch);
  else patch();
  setInterval(patch, 500);
})();
