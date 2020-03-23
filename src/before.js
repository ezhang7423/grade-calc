class gradeComponent {
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

let x = new gradeComponent("x", 12);
print(x.calc);
