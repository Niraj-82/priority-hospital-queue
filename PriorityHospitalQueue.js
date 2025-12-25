class PriorityHospitalQueue {
  constructor() {
    this.heap = [];
    this.indexMap = new Map();
  }

  addPatient(patient_id, urgency_score, name) {
    if (!Number.isInteger(patient_id)) {
      throw new TypeError("patient_id must be an integer");
    }
    if (
      !Number.isInteger(urgency_score) ||
      urgency_score < 1 ||
      urgency_score > 10
    ) {
      throw new RangeError("urgency_score must be between 1 and 10");
    }
    if (typeof name !== "string") {
      throw new TypeError("name must be a string");
    }

    // If patient already exists -> update
    if (this.indexMap.has(patient_id)) {
      const idx = this.indexMap.get(patient_id);
      this.heap[idx].urgency = urgency_score;
      this.heap[idx].name = name;

      // Restore heap order
      this._siftUp(idx);
      this._siftDown(idx);
      return;
    }

    // Insert new patient
    const node = { id: patient_id, urgency: urgency_score, name };
    this.heap.push(node);
    const index = this.heap.length - 1;
    this.indexMap.set(patient_id, index);
    this._siftUp(index);
  }

  getNextPatient() {
    if (this.isEmpty()) return null;
    const p = this.heap[0];
    return { id: p.id, urgency: p.urgency, name: p.name };
  }


  isEmpty() {
    return this.heap.length === 0;
  }



  // Compare priority
  _higherPriority(a, b) {
    if (a.urgency !== b.urgency) return a.urgency > b.urgency;
    return a.id < b.id;
  }

  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    this.indexMap.set(this.heap[i].id, i);
    this.indexMap.set(this.heap[j].id, j);
  }

  _siftUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this._higherPriority(this.heap[i], this.heap[parent])) {
        this._swap(i, parent);
        i = parent;
      } else break;
    }
  }

  _siftDown(i) {
    const n = this.heap.length;
    while (true) {
      let best = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;

      if (left < n && this._higherPriority(this.heap[left], this.heap[best])) {
        best = left;
      }
      if (right < n && this._higherPriority(this.heap[right], this.heap[best])) {
        best = right;
      }
      if (best === i) break;

      this._swap(i, best);
      i = best;
    }
  }
}

module.exports = PriorityHospitalQueue;
