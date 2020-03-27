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
  x.weights[0].grade = [100, 90, 80, 90];
  x.weights[2].grade = 11.1203;
  let y = new Course("PSTAT120A", [30, 20, 20, 15, 15]);
  y.weights[0].grade = 23;
  save(x, "course");
  save(y, "course");
  location.reload();
};
let cClear = () => {
  localStorage.removeItem("gc-datastore");
  location.reload();
};

function numUntitled() {
  store = reconstruct();
  counter = 0;
  for (let x of Object.keys(store)) {
    if (x.includes("untitled")) {
      counter++;
    }
  }
  return counter;
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
      act[course] = new Course(course, weights);
      for (let component of Object.keys(store[course].weights)) {
        act[course].weights[component].grade =
          store[course].weights[component].grad;
      }
    }
    return act;
  } else {
    return null;
  }
}
function save(data, type) {
  store = reconstruct();
  if (type === "course") {
    store[data.name] = {};
    store[data.name].name = data.name;
    store[data.name].weights = data.export();
    localStorage.setItem("gc-datastore", JSON.stringify(store));
  } else if (type === "component") {
    store[data.name] = data;
    localStorage.setItem("gc-datastore", JSON.stringify(store));
  }
}
function del(name) {
  store = reconstruct();
  delete store[name];
  localStorage.setItem("gc-datastore", JSON.stringify(store));
  location.reload();
}
