let store = JSON.parse(localStorage.getItem("gc-datastore"));
if (store === null) {
  localStorage.setItem("gc-datastore", "{}");
  let numClasses = 0;
} else {
  let numClasses = Object.keys(store).length;

  editCSS(`.course{ width: ${80 / numClasses}vw;}`);
}

class GradeComponent {
  constructor(name, grade, weight) {
    this.name = name;
    this.grade = grade;
    this.weight = weight;
    for (let x in grade) {
      if (grade[x] < 1) {
        throw "fcked-grades";
      }
    }
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
      this.weights[x] = new GradeComponent("untitled", 100, weights[x]);
    }
  }
  export() {
    return this.weights;
  }
}
