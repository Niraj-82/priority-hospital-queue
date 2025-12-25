// Basic tests and examples for PriorityHospitalQueue
const assert = require('assert');
const PriorityHospitalQueue = require('./PriorityHospitalQueue');

// Helper to quickly get top
function top(q) {
  const p = q.getNextPatient();
  return p ? `${p.id}|${p.urgency}|${p.name}` : null;
}

(function runTests() {
  const q = new PriorityHospitalQueue();

  // Edge: empty queue
  assert.strictEqual(q.isEmpty(), true);
  assert.strictEqual(q.getNextPatient(), null);

  // Add some patients
  q.addPatient(101, 5, 'Alice');
  q.addPatient(50, 8, 'Bob');     // higher urgency -> should be top
  q.addPatient(200, 8, 'Charlie'); // same urgency as Bob, but id 50 < 200 -> Bob first
  q.addPatient(75, 10, 'Dana');    // highest urgency -> top

  assert.strictEqual(q.isEmpty(), false);
  assert.strictEqual(top(q), '75|10|Dana'); // Dana (urgency 10)

  // Same urgency different IDs: lower ID first
  // Add two with same urgency 7
  q.addPatient(10, 7, 'Eve');
  q.addPatient(9, 7, 'Frank'); // id 9 < 10 -> Frank should be before Eve among urgency 7 group
  // But overall top remains Dana (10)
  assert.strictEqual(top(q), '75|10|Dana');

  // Duplicate IDs: update existing patient (change urgency)
  // Update Alice (101) urgency from 5 -> 11 (invalid) -> will throw; we use valid update
  q.addPatient(101, 9, 'Alice Updated'); // increased urgency, should move up
  // Now top still Dana (10). After removing Dana (we don't have removal API), just check getNextPatient remains Dana
  assert.strictEqual(top(q), '75|10|Dana');

  // Show mid-process arrival: peek then add new more urgent patient
  const currentTopBefore = q.getNextPatient();
  q.addPatient(1, 10, 'Zed'); // urgency 10, id 1 < 75 => Zed should become top since same urgency (10) and smaller id
  const currentTopAfter = q.getNextPatient();
  assert.strictEqual(`${currentTopBefore.id}|${currentTopBefore.urgency}|${currentTopBefore.name}`, '75|10|Dana');
  assert.strictEqual(`${currentTopAfter.id}|${currentTopAfter.urgency}|${currentTopAfter.name}`, '1|10|Zed');

  // Duplicate ID updating name
  q.addPatient(1, 10, 'Zed Renamed');
  assert.strictEqual(q.getNextPatient().name, 'Zed Renamed');

  console.log('All tests passed.');
})();