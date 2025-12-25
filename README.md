# Priority Hospital Queue (Heap-Based)

This project implements a custom **priority queue system** for managing emergency patients in a hospital scenario.  
Patients are processed based on urgency and arrival rules using a **binary heap**, without relying on any built-in priority queue.

---

## Problem Statement

Zeigen Health manages emergency patients using the following rules:

- Patients with **higher urgency_score (1–10)** are treated first
- If urgency scores are equal, the patient with the **lower patient_id** is prioritized
- New patients can arrive while processing is ongoing
- Duplicate patient IDs should update the existing patient’s details

---

## Solution Approach

- Implemented an **array-based binary heap**
- Maintains heap order using:
  - `urgency_score` (higher first)
  - `patient_id` (lower first if urgency is equal)
- Uses a hash map (`Map`) to track patient indices for efficient updates
- Fully custom implementation (no built-in PriorityQueue)

---

## API Methods

```js
addPatient(patient_id, urgency_score, name)  
getNextPatient()                            
isEmpty()                                   
addPatient inserts or updates a patient

getNextPatient returns the highest-priority patient without removing them

isEmpty checks whether the queue has patients

Edge Cases Covered
Empty queue handling

Same urgency with different patient IDs

Duplicate patient ID updates

New patient arrival during processing

Files Included

PriorityHospitalQueue.js   // Core heap implementation
test_priority_queue.js    // Unit tests and edge cases
Running the Tests
Make sure you have Node.js installed.

node test_priority_queue.js
If all tests pass, you will see:


All tests passed.
Notes
No external libraries used

Designed for clarity, correctness, and interview readiness
