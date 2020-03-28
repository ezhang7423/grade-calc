function print(thing) {
  console.log(thing);
}

let alph = num => {
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
    alpha: 1
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
    "6": 7
  };
  y.weights[1].grade = { a: 1, b: 2, c: 3, d: 4, e: 50, f: 6, g: 7 };
  y.weights[2].grade = {
    "0": 1,
    "-1": 2,
    "-2": 30,
    "-3": 40,
    "-4": 5,
    "-5": 6,
    "-6": 70
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
  let max = -1;
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
        act[course].weights[component].grade =
          store[course].weights[component].grad;
        act[course].weights[component].name =
          store[course].weights[component].name;
      }
    }
    return act;
  } else {
    return null;
  }
}

function save(data, type) {
  store = reconstruct();
  try {
    var storelen = Object.keys(store).reduce((a, b) => {
      return a > b ? a : b;
    });
  } catch {
    var storelen = 0;
  }
  storelen++;
  if (type === "course") {
    store[storelen] = {};
    store[storelen].name = data.name;
    store[storelen].weights = data.export();
    localStorage.setItem("gc-datastore", JSON.stringify(store));
  } else if (type === "component") {
    let courseKey = searchCourses(data.name);
    store[courseKey] = data;
    localStorage.setItem("gc-datastore", JSON.stringify(store));
  }
}

function searchCourses(name) {
  for (let course of Object.keys(store)) {
    if (store[course].name === name) {
      return course;
    }
  }
}
function searchComp(course, name) {
  let weights = store[course].weights;
  for (let x of Object.keys(weights)) {
    if (weights[x].name === name) {
      return x;
    }
  }
}

function del(name) {
  store = reconstruct();
  delete store[name];
  localStorage.setItem("gc-datastore", JSON.stringify(store));
  location.reload();
}
