class GradeComponent {
  constructor(name, gradee, weight) {
    this.name = name;
    this.grad = gradee;
    this.weight = weight;
    for (let x in gradee) {
      if (gradee[x] < 1) {
        throw "fcked-grades";
      }
    }
    this.isList = Array.isArray(this.grad);
  }
  set grade(e) {
    if (Array.isArray(e)) {
      this.grad = e;
      this.isList = true;
    } else {
      this.grad = e;
      this.isList = false;
    }
  }
  get grade() {
    if (Array.isArray(this.grad)) {
      let gSum = this.grad.reduce((a, b) => a + b, 0);
      return gSum / this.grad.length;
    } else {
      return this.grad;
    }
  }
}

class Course {
  constructor(name, weights) {
    if (weights.reduce((a, b) => a + b, 0) != 100) {
      throw "fcked-weights";
    }
    this.name = name;
    this.weights = {};
    for (let x in weights) {
      this.weights[x] = new GradeComponent("untitled", 100, weights[x]);
    }
  }
  export() {
    return this.weights;
  }
}
