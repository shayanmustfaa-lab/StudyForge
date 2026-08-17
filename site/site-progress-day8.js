(() => {
  'use strict';

  const CURRENT = {
    date: '17 Aug 2026',
    studyDays: 8,
    lessons: 24,
    marks: 286,
    augustCoveredBlocks: 9,
    augustTargetBlocks: 24,
    augustPct: 38,
    milestoneTarget: 20,
    milestonePct: 40,
    milestoneLeft: 12,
    boardDate: '16 Aug 2026',
    boardEarned: 52,
    boardTotal: 61,
    boardPct: '85.2%',
    nextTestDate: '23 Aug 2026',
    nextTestShort: 'Sunday, 23 August · 7:00 PM',
    nextTestName: '6-Day Weekly Test',
    nextCoverage: 'Day 10–15 · 6 study days',
    pendingBoard: 'English, Urdu, Pak Studies, Tarjuma-tul-Quran'
  };

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

  function nextCountdown() {
    const target = new Date('2026-08-23T19:00:00+05:00').getTime();
    const ms = target - Date.now();
    if (ms <= 0) return 'Test window started';
    const d = Math.floor(ms / 86400000);
    const h = Math.floor((ms % 86400000) / 3600000);
    const m = Math.floor((ms % 3600000) / 60000);
    return d > 0 ? `${d}d ${h}h ${m}m remaining` : `${h}h ${m}m remaining`;
  }

  function syncTopbar() {
    setText(document.querySelector('.date-card strong'), CURRENT.date);
  }

  function syncCommonAggregates() {
    const root = document.querySelector('.content');
    replaceText(root, [
      [/\b7 recorded study days\b/gi, '8 recorded study days'],
      [/\b7 study days recorded\b/gi, '8 study days recorded'],
      [/\b7 scored days\b/gi, '8 scored days'],
      [/\b237\s*\/\s*237\b/g, '286/286'],
      [/\b21 lesson blocks\b/gi, '24 lesson blocks'],
      [/\b21 lessons\b/gi, '24 lessons'],
      [/\b13 days to Day-20\b/gi, '12 days to Day-20']
    ]);
  }

  function syncOverviewCheckpoint() {
    const card = document.querySelector('.next-test-card');
    if (!card) return;
    setText(card.querySelector('h3'), CURRENT.nextTestName);
    setText(card.querySelector('p'), 'Sunday, 23 Aug · 7:00 PM · Day 10–15 (6 study days)');
    const meta = card.querySelectorAll('.test-meta span');
    if (meta[0]) setText(meta[0], 'Board-style');
    if (meta[1]) setText(meta[1], '6 study days + Board Part 2');
  }

  function syncPlan() {
    const root = document.querySelector('.plan-view');
    if (!root) return;

    const augustCards = [...root.querySelectorAll('.month-card')].filter(el => /august|\baug\b/i.test(el.textContent));
    augustCards.forEach(card => {
      replaceText(card, [
        [/\b33%\b/g, '38%'],
        [/\b8\s+of\s+24\s+planned learning blocks covered\b/gi, '9 of 24 planned learning blocks covered'],
        [/\b8\s*\/\s*24\b/g, '9 / 24'],
        [/\b7 study days\b/gi, '8 study days']
      ]);
      const progressValue = card.querySelector('.month-progress-copy strong');
      if (progressValue && /%/.test(progressValue.textContent)) setText(progressValue, '38%');
      const summary = card.querySelector('.month-progress-copy p');
      if (summary && /planned learning blocks/i.test(summary.textContent)) setText(summary, '9 of 24 planned learning blocks covered');
      const bar = card.querySelector('.month-progress-track span');
      if (bar) bar.style.width = '38%';
    });

    replaceText(root, [
      [/\b7 recorded study days\b/gi, '8 recorded study days'],
      [/\b7 study days completed\b/gi, '8 study days completed'],
      [/\bDay 1\s*(?:to|–|-)\s*Day 7\b/gi, 'Day 1–Day 8']
    ]);
  }

  function syncMilestones() {
    const root = document.querySelector('.milestones-view');
    if (!root) return;

    replaceText(root, [
      [/\b7\s*\/\s*20\b/g, '8 / 20'],
      [/\b7\s+of\s+20\b/gi, '8 of 20'],
      [/\b7 study days\b/gi, '8 study days'],
      [/\b35%\b/g, '40%'],
      [/\b13 days\b/gi, '12 days']
    ]);

    const badge = root.querySelector('.current-level-badge small');
    if (badge) setText(badge, '8 study days');

    const commandText = root.querySelector('.milestone-command-top p');
    if (commandText && /more study days/i.test(commandText.textContent)) {
      commandText.innerHTML = '12 more study days to unlock <strong>Focus Room</strong>.';
    }

    const active = root.querySelector('.active-level-progress');
    if (active) {
      const value = active.querySelector('div:first-child strong');
      if (value) setText(value, '8/20 days');
      const bar = active.querySelector('.active-level-track span');
      if (bar) bar.style.width = '40%';
      const note = active.querySelector('small');
      if (note) setText(note, '40% of this level complete');
    }

    const reward = root.querySelector('.reward-card.current');
    if (reward) {
      const bar = reward.querySelector('.reward-progress span');
      if (bar) bar.style.width = '40%';
      const copy = reward.querySelector('.reward-progress-copy');
      if (copy) {
        const span = copy.querySelector('span');
        const strong = copy.querySelector('strong');
        if (span) setText(span, '8/20 study days');
        if (strong) setText(strong, '40%');
      }
      const button = reward.querySelector('.reward-action');
      if (button && button.disabled) setText(button, '12 days remaining');
    }
  }

  function boardResultPanel() {
    const article = document.createElement('article');
    article.className = 'panel test-log sf-board-exam-result';
    article.dataset.boardExamResult = '1';
    article.innerHTML = `
      <div class="panel-heading"><div><span class="section-kicker">Completed board exam</span><h3>Board Exam · Part 1</h3></div></div>
      <div class="test-log-row">
        <span class="test-day">BOARD</span>
        <div><strong>Maths + Physics + Chemistry + Computer</strong><small>16 Aug 2026 · final locked result</small></div>
        <strong>52/61</strong>
        <span class="result-pass">85.2%</span>
      </div>
      <p style="margin-top:14px">Pending for Part 2: English, Urdu, Pak Studies and Tarjuma-tul-Quran.</p>`;
    return article;
  }

  function syncTests() {
    const root = document.querySelector('.tests-view');
    if (!root) return;

    const combined = root.querySelector('.combined-test');
    if (combined) {
      const date = combined.querySelector('.test-date');
      if (date) {
        setText(date.querySelector('span'), 'AUG');
        setText(date.querySelector('strong'), '23');
        setText(date.querySelector('small'), 'SUN');
      }
      const kicker = combined.querySelector('.section-kicker');
      if (kicker) setText(kicker, 'Upcoming · 7:00 PM');
      setText(combined.querySelector('h2'), CURRENT.nextTestName);
      const p = combined.querySelector('p');
      if (p) setText(p, 'Day 10–15 ke 6 study days ka weekly board-style test. Pending Board Exam Part 2 ke 4 subjects bhi isi test mein complete honge.');
      const badge = combined.querySelector('.scheduled-badge');
      if (badge) setText(badge, 'Scheduled');
    }

    replaceText(root, [
      [/\b9-Day Combined Test\b/gi, CURRENT.nextTestName],
      [/\bDay 9 Weekly Test\b/gi, CURRENT.nextTestName],
      [/\b7 study days\b/gi, '8 study days'],
      [/\b21 lessons\b/gi, '24 lessons'],
      [/\b237\s*\/\s*237\b/g, '286/286'],
      [/\bDay 1\s*(?:to|–|-)\s*Day 7\b/gi, 'Day 1–8']
    ]);

    const summaryCards = root.querySelectorAll('.test-summary-grid article');
    summaryCards.forEach(card => {
      const label = card.querySelector('.section-kicker')?.textContent.trim();
      if (label === 'Topic tests') {
        const strong = card.querySelector('.big-stat');
        if (strong) strong.innerHTML = '286<small>/286</small>';
        const p = card.querySelector('p');
        if (p) setText(p, '8 study days · 24 lesson blocks · recorded mastery bank.');
      }
      if (label === 'Board papers') {
        setText(card.querySelector('.big-stat'), '1');
        const p = card.querySelector('p');
        if (p) setText(p, 'Board Exam Part 1 completed · 52/61 (85.2%).');
      }
    });

    if (!root.querySelector('[data-board-exam-result]')) {
      const log = root.querySelector('.test-log');
      if (log) log.before(boardResultPanel());
    }
  }

  function syncStudyCenterAndPower() {
    const center = document.getElementById('sf-center');
    if (center) {
      replaceText(center, [
        [/\b7 recorded study days\b/gi, '8 recorded study days'],
        [/\b7 study days recorded\b/gi, '8 study days recorded'],
        [/\b237\s*\/\s*237\b/g, '286/286'],
        [/\b21 lesson blocks\b/gi, '24 lesson blocks'],
        [/\b21 lessons\b/gi, '24 lessons'],
        [/\b9-Day Combined Test\b/gi, CURRENT.nextTestName],
        [/\bDay 9 Weekly Test\b/gi, CURRENT.nextTestName],
        [/\b16 Aug · 7 PM\b/gi, '23 Aug · 7 PM'],
        [/\bSunday, 16 August · 7:00 PM\b/gi, CURRENT.nextTestShort],
        [/\b13 days to Day-20 Focus Room from current 7-day record\b/gi, '12 days to Day-20 Focus Room from current 8-day record'],
        [/\bCurrent recorded final marks:\s*237\s*\/\s*237\.?/gi, 'Current recorded final marks: 286/286.']
      ]);

      const sunday = [...center.querySelectorAll('.sf-kicker')].find(x => x.textContent.trim() === 'SUNDAY · 7:00 PM');
      if (sunday) {
        const card = sunday.closest('.sf-card');
        if (card) {
          setText(card.querySelector('h3'), CURRENT.nextTestName);
          const cd = card.querySelector('.sf-countdown');
          if (cd) setText(cd, nextCountdown());
          const p = card.querySelector('p');
          if (p) setText(p, 'Day 10–15 ke 6 study days · pending Board Exam Part 2: English, Urdu, Pak Studies, Tarjuma-tul-Quran.');
        }
      }

      const historyKicker = [...center.querySelectorAll('.sf-kicker')].find(x => x.textContent.trim() === 'TEST HISTORY');
      if (historyKicker) {
        const list = historyKicker.nextElementSibling;
        if (list && list.classList.contains('sf-list') && !list.querySelector('[data-board-exam-history]')) {
          const row = document.createElement('div');
          row.dataset.boardExamHistory = '1';
          row.innerHTML = '<b>85.2%</b><span>Board Exam Part 1 · Maths, Physics, Chemistry, Computer · 52/61</span><strong>16 Aug</strong>';
          list.prepend(row);
        }
      }

      const report = center.querySelector('#sf-report');
      if (report) {
        const cards = report.querySelectorAll(':scope > .sf-card');
        const totals = [...cards].find(c => c.querySelector('h3')?.textContent.trim() === 'Current totals');
        if (totals) {
          const s = totals.querySelectorAll('.sf-statrow strong');
          if (s[0]) setText(s[0], '8');
          if (s[1]) setText(s[1], '24');
          if (s[2]) setText(s[2], '286/286');
        }
        const checkpoint = [...cards].find(c => c.querySelector('h3')?.textContent.trim() === 'Next checkpoint');
        if (checkpoint) {
          const p = checkpoint.querySelector('p');
          if (p) p.innerHTML = '<b>6-Day Weekly Test</b><br>Sunday, 23 August · 7:00 PM<br><small>Day 10–15 + pending Board Part 2</small>';
          const ps = checkpoint.querySelectorAll('p');
          if (ps[1]) setText(ps[1], nextCountdown());
        }
      }

      [...center.querySelectorAll('.sfp-card')].forEach(card => {
        if (/Recorded study days to Day-20 reward/i.test(card.textContent)) {
          const strong = card.querySelector('.sfp-big');
          if (strong) setText(strong, '12');
        }
      });
    }

    const predictor = document.getElementById('sf-marks-predictor');
    if (predictor) {
      replaceText(predictor, [
        [/\bCurrent recorded final marks:\s*237\s*\/\s*237\.?/gi, 'Current recorded final marks: 286/286.']
      ]);
    }
  }

  function patch() {
    syncTopbar();
    syncCommonAggregates();
    syncOverviewCheckpoint();
    syncPlan();
    syncMilestones();
    syncTests();
    syncStudyCenterAndPower();
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
  setInterval(patch, 900);
})();
