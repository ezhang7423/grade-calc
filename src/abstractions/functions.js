function print(thing) {
  console.log(thing);
}

let alph = (num) => {
  return String.fromCharCode(97 + num);
};

function getColors(num) {
  if (num < 2) {
    num = 2;
  }
  let act = [];
  let colors = colormap({
    colormap: "summer", //allow user customization
    nshades: num,
    format: "rgba",
    alpha: 1,
  });
  for (let x of colors) {
    [r, g, b] = lighten(x);
    act.push("rgba(" + r + "," + g + "," + b + "," + x[3] + ")");
  }
  return act;
}

function create(htmlStr) {
  var frag = document.createDocumentFragment(),
    temp = document.createElement("div");
  temp.innerHTML = htmlStr;
  while (temp.firstChild) {
    frag.appendChild(temp.firstChild);
  }
  return frag;
}

function editCSS(rule) {
  for (const sheet of document.styleSheets) {
    if (sheet.href.includes("style.css")) {
      var styling = sheet;
      break;
    }
  }
  sel = document.all ? "rules" : "cssRules";
  stylingL = Object.keys(styling[sel]).length;
  styling.insertRule(rule, stylingL);
}

let addFake = () => {
  let x = new Course("MATH4B", [10, 20, 70]);
  x.weights[0].grade = { hw1: 100, hw2: 90, hw3: 80, hw4: 90 };
  x.weights[2].grade = { lab1: 100, lab2: 90, lab3: 80, lab4: 90 };
  let y = new Course("PSTAT120A", [1, 1, 2, 96]);
  y.weights[0].grade = {
    "0": 1,
    "1": 2,
    "2": 3,
    "3": 4,
    "4": 5,
    "5": 6,
    "6": 7,
  };
  y.weights[1].grade = { a: 1, b: 2, c: 3, d: 4, e: 50, f: 6, g: 7 };
  y.weights[2].grade = {
    "0": 1,
    "-1": 2,
    "-2": 30,
    "-3": 40,
    "-4": 5,
    "-5": 6,
    "-6": 70,
  };
  save(x, "course");
  save(y, "course");
  location.reload();
};
let cClear = () => {
  localStorage.removeItem("gc-datastore");
  location.reload();
};

function largestUntitled() {
  store = reconstruct();
  let max = 0;
  for (let x of Object.keys(store)) {
    if (store[x].name.includes("untitled")) {
      if (parseInt(store[x].name.split(" ")[2]) > max) {
        max = parseInt(store[x].name.split(" ")[2]);
      }
    }
  }
  return max;
}

function reconstruct() {
  try {
    let store = JSON.parse(localStorage.getItem("gc-datastore"));
    let act = {};
    if (store !== null) {
      for (let course of Object.keys(store)) {
        let weights = [];
        for (let component of Object.keys(store[course].weights)) {
          weights.push(store[course].weights[component].weight);
        }
        act[course] = new Course(store[course].name, weights);
        for (let component of Object.keys(store[course].weights)) {
          if (typeof store[course].weights[component].grad === "object") {
            act[course].weights[component].grad =
              store[course].weights[component].grad;
            act[course].weights[component].isList = true;
          } else {
            act[course].weights[component].grade =
              store[course].weights[component].grad;
          }
          act[course].weights[component].name =
            store[course].weights[component].name;
        }
      }
      return act;
    } else {
      return null;
    }
  } catch (e) {
    cClear();
  }
}

function save(data, type) {
  store = reconstruct();
  try {
    var storelen = Object.keys(store).reduce((a, b) => {
      a = parseInt(a);
      b = parseInt(b);

      return a > b ? a : b;
    });
  } catch {
    var storelen = -1;
  }
  storelen++;
  if (type === "course") {
    store[storelen] = {};
    store[storelen].name = data.name;
    store[storelen].weights = data.export();
    localStorage.setItem("gc-datastore", JSON.stringify(store));
  } else if (type === "component") {
    let courseKey = searchObj(store, data.name);
    store[courseKey] = data;
    localStorage.setItem("gc-datastore", JSON.stringify(store));
  }
}

function searchObj(store, name) {
  for (let course of Object.keys(store)) {
    if (store[course].name === name) {
      return course;
    }
  }
}
function searchObjPos(store, name) {
  let c = 0;
  for (let course of Object.keys(store)) {
    if (store[course].name === name) {
      return c;
    }
    c++;
  }
  return -1;
}

function calcSum(data) {
  let sum = 0;
  for (let i of Object.keys(data.weights)) {
    sum += calcGrad(data.weights[i].grade, data.weights[i].weight);
  }
  return Math.round((sum + Number.EPSILON) * 100) / 100;
}

function letterGrade(data) {
  let number = 0;
  for (let i of Object.keys(data.weights)) {
    number += calcGrad(data.weights[i].grade, data.weights[i].weight);
  }
  let numbergrade = number;
  if (numbergrade >= 97) {
    return "A+";
  } else if (numbergrade >= 93) {
    return "A";
  } else if (numbergrade >= 90) {
    return "A-";
  } else if (numbergrade >= 87) {
    return "B+";
  } else if (numbergrade >= 83) {
    return "B";
  } else if (numbergrade >= 80) {
    return "B-";
  } else if (numbergrade >= 77) {
    return "C+";
  } else if (numbergrade >= 73) {
    return "C";
  } else if (numbergrade >= 70) {
    return "C-";
  } else if (numbergrade >= 67) {
    return "D+";
  } else if (numbergrade >= 63) {
    return "D";
  } else if (numbergrade >= 60) {
    return "D-";
  } else {
    return "F";
  }
}
function del(name) {
  store = reconstruct();
  delete store[name];
  localStorage.setItem("gc-datastore", JSON.stringify(store));
  location.reload();
}
