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
    colormap: "autumn", //allow user customization
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
function reconstruct() {
  let store = JSON.parse(localStorage.getItem("gc-datastore"));
  let act = {};
  if (store !== null) {
    for (let course of Object.keys(store)) {
      let weights = [];
      for (let component of Object.keys(store[course])) {
        weights.push(store[course][component].weight);
      }
      act[course] = new Course(course, weights);
      for (let component of Object.keys(store[course])) {
        act[course].weights[component].grade = store[course][component].grad;
      }
    }
    return act;
  } else {
    return null;
  }
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

function changeMe(e) {
  e.preventDefault();
  let id = e.target.getAttribute("name");
  // print(id);
  if (id === "gc-name") {
    e.target.replaceWith(
      create(
        `<input name = "gc-name" class="rep nakinput" style = "text-align: center; margin-bottom: 0; width: 20%; font-size: 4vw" spellcheck="false" placeholder="${e.target.innerText}" type="text" />`
      )
    );
    let input = document.querySelector('[name="gc-name"]');
    print(input);
    input.addEventListener("onblur", saveMe);
    input.addEventListener("keyup", function(event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        localStorage.setItem("gc-name", input.value);
      }
    });
  } else if (id === "course-title") {
    print(e.target.innerText);
  } else if (id === "component") {
    print(e.target.innerText);
    let parent =
      e.target.parentElement.parentElement.parentElement.firstElementChild;
    print(parent.innerText);
  }
}

function saveMe(e) {
  print("working");
  e.preventDefault();
  let id = e.target.getAttribute("name");
  if (id === "gc-name") {
    print(e.target.value);
    localStorage.setItem("gc-name", e.target.value);
  }
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
  store = JSON.parse(localStorage.getItem("gc-datastore"));
  counter = 0;
  for (let x of Object.keys(store)) {
    if (x.includes("untitled")) {
      counter++;
    }
  }
  return counter;
}
function save(data, type) {
  store = JSON.parse(localStorage.getItem("gc-datastore"));
  if (type === "course") {
    store[data.name] = data.export();
    localStorage.setItem("gc-datastore", JSON.stringify(store));
  }
}
