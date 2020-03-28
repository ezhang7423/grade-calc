class GradeComponent {
  constructor(name, gradee, weight) {
    this.name = name;
    this.grad = gradee;
    this.weight = weight;
    if (typeof this.grad === "object") {
      for (let x of gradee) {
        if (gradee[x] < 1) {
          throw "fcked-grades";
        }
      }
      this.isList = true;
    } else {
      this.isList = false;
    }
  }
  set grade(e) {
    if (typeof e === "object") {
      this.grad = {};
      let keys = Object.keys(e);
      for (let i in keys) {
        this.grad[i] = { name: keys[i], grade: e[keys[i]] };
      }
      this.isList = true;
    } else {
      this.grad = e;
      this.isList = false;
    }
  }
  get grade() {
    if (typeof this.grad === "object") {
      let sum = 0;
      for (let x of Object.keys(this.grad)) {
        sum += this.grad[x];
      }
      return sum / Object.keys(this.grad).length;
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
      this.weights[x] = new GradeComponent(String(x), 100, weights[x]);
    }
  }
  export() {
    return this.weights;
  }
}
