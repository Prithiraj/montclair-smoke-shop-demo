import test from 'node:test';
import assert from 'node:assert/strict';
import { store } from '../src/data/store.js';
import { formatClock, getHoursRows, getStoreStatus, timeToMinutes } from '../src/lib/storeStatus.js';

test('time utilities format public hours', () => {
  assert.equal(timeToMinutes('09:30'), 570);
  assert.equal(formatClock('09:00'), '9:00 AM');
  assert.equal(formatClock('23:00'), '11:00 PM');
});

test('store is open during a Monday morning in New Jersey', () => {
  const date = new Date('2026-01-05T15:00:00.000Z');
  const status = getStoreStatus(store, date);
  assert.equal(status.isOpen, true);
  assert.equal(status.label, 'Open now');
  assert.match(status.detail, /11:00 PM/);
});

test('store reports the next opening after Sunday close', () => {
  const date = new Date('2026-01-05T04:30:00.000Z');
  const status = getStoreStatus(store, date);
  assert.equal(status.isOpen, false);
  assert.equal(status.detail, 'Opens tomorrow at 9:00 AM');
});

test('weekly hours expose seven rows', () => {
  const rows = getHoursRows(store);
  assert.equal(rows.length, 7);
  assert.equal(rows.at(-1).label, 'Sunday');
});
