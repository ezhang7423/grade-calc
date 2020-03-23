class GradeComponent {
  constructor(name, grade) {
    this.name = name;
    this.grade = grade;
    this.isList = Array.isArray(this.grade);
  }
  get calc() {
    if (Array.isArray(this.grade)) {
      let gSum = this.grade.reduce((a, b) => a + b, 0);
      return gSum / this.grade.length;
    } else {
      return this.grade;
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
      this.weights[weights[x]] = new GradeComponent("untitled", 100);
    }
  }
}

let x = new Course("x", [12, 90]);
