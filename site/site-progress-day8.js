(() => {
  'use strict';

  const CURRENT = {
    date: '16 Aug 2026',
    studyDays: 8,
    lessons: 24,
    marks: 286,
    augustTarget: 21,
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
        [/\b7\s*\/\s*21\b/g, '8 / 21'],
        [/\b7\s+of\s+21\b/gi, '8 of 21'],
        [/\b7 study days\b/gi, '8 study days']
      ]);
      const progressValue = card.querySelector('.month-progress-copy strong');
      if (progressValue && /%/.test(progressValue.textContent)) setText(progressValue, '38%');
      const bar = card.querySelector('.month-progress-track span');
      if (bar) bar.style.width = '38%';
    });

    const augustStops = [...root.querySelectorAll('.month-stop')].filter(el => /august|\baug\b/i.test(el.textContent));
    augustStops.forEach(stop => {
      replaceText(stop, [
        [/\b33%\b/g, '38%'],
        [/\b7\s*\/\s*21\b/g, '8 / 21']
      ]);
      const small = stop.querySelector('small');
      if (small && /%/.test(small.textContent)) small.textContent = small.textContent.replace(/\d+%/, '38%');
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
    if (badge && /20/.test(badge.textContent)) setText(badge, '8 / 20 study days');

    const active = root.querySelector('.active-level-progress');
    if (active) {
      const value = active.querySelector('div:first-child strong');
      if (value) setText(value, '8 / 20 study days');
      const bar = active.querySelector('.active-level-track span');
      if (bar) bar.style.width = '40%';
      const note = active.querySelector('small');
      if (note) note.textContent = note.textContent.replace(/13\s+days?/i, '12 days').replace(/7\s*\/\s*20/g, '8 / 20');
    }

    const reward = root.querySelector('.reward-card.current');
    if (reward) {
      const bar = reward.querySelector('.reward-progress span');
      if (bar) bar.style.width = '40%';
      replaceText(reward, [
        [/\b35%\b/g, '40%'],
        [/\b7\s*\/\s*20\b/g, '8 / 20'],
        [/\b13 days\b/gi, '12 days']
      ]);
    }
  }

  function syncTests() {
    const root = document.querySelector('.tests-view');
    if (!root) return;

    const combined = root.querySelector('.combined-test');
    if (combined) {
      setText(combined.querySelector('h2'), 'Day 9 Weekly Test');
      const p = combined.querySelector('p');
      if (p) setText(p, 'Sunday, 16 August · 7:00 PM · Day 1–8 coverage');
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
