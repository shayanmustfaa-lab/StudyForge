(() => {
  'use strict';

  const CURRENT = {
    date: '16 Aug 2026',
    studyDays: 8,
    lessons: 24,
    marks: 286,
    augustCoveredBlocks: 9,
    augustTargetBlocks: 24,
    augustPct: 38,
    milestoneTarget: 20,
    milestonePct: 40,
    milestoneLeft: 12
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
      [/\b13 days to Day-20\b/gi, '12 days to Day-20']
    ]);
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
      const strong = commandText.querySelector('strong');
      commandText.firstChild.nodeValue = '12 more study days to unlock ';
      if (strong) strong.textContent = 'Focus Room';
      if (commandText.lastChild && commandText.lastChild !== strong) commandText.lastChild.nodeValue = '.';
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

  function syncTests() {
    const root = document.querySelector('.tests-view');
    if (!root) return;

    const combined = root.querySelector('.combined-test');
    if (combined) {
      setText(combined.querySelector('h2'), 'Day 9 Weekly Test');
      const p = combined.querySelector('p');
      if (p) setText(p, 'Day 1–8 ke tamam studied topics ka board-style weekly test.');
    }

    replaceText(root, [
      [/\b9-Day Combined Test\b/gi, 'Day 9 Weekly Test'],
      [/\b9-Day Test\b/gi, 'Day 9 Weekly Test'],
      [/\b7 study days\b/gi, '8 study days'],
      [/\b21 lessons\b/gi, '24 lessons'],
      [/\b237\s*\/\s*237\b/g, '286/286'],
      [/\bDay 1\s*(?:to|–|-)\s*Day 7\b/gi, 'Day 1–8']
    ]);
  }

  function syncStudyCenterAndPower() {
    const center = document.getElementById('sf-center');
    if (center) {
      replaceText(center, [
        [/\bCurrent recorded final marks:\s*237\s*\/\s*237\.?/gi, 'Current recorded final marks: 286/286.']
      ]);
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
  setInterval(patch, 1200);
})();
