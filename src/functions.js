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
function reconstruct() {
  let store = JSON.parse(localStorage.getItem("gc-datastore"));
  print(store);
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

// need to make responsive, not for now
// function changeMe(e) {
//   e.preventDefault();
//   let id = e.target.getAttribute("name");
//   if (id === "gc-name") {
//     e.target.style["margin-right"] = `${38 - name.length}vw`;
//     setTimeTout(() => {
//       e.target.replaceWith(
//         create(
//           `<input name = "gc-name" class="rep nakinput" style = "margin-bottom: 0; padding: 0; width: 50%; font-size: 4vw" spellcheck="false" placeholder="${e.target.innerText}" type="text" />`
//         )
//       );
//       let input = document.querySelector('[name="gc-name"]');
//       input.addEventListener("blur", saveMeBlur);
//       input.addEventListener("keyup", saveMeEnter);
//       print("syntax?");
//     }, 1000);
//   } else if (id === "course-title") {
//     print(e.target.innerText);
//   } else if (id === "component") {
//     print(e.target.innerText);
//     let parent =
//       e.target.parentElement.parentElement.parentElement.firstElementChild;
//     print(parent.innerText);
//   }
// }

function saveMeEnter(e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    saveMe(e);
    print("enter called");
  }
}
function saveCourse(e) {
  print(e.target);
}

function saveMeBlur(e) {
  e.preventDefault();
  let id = e.target.getAttribute("name");
  saveMe(e);
  print("blur called");
}

function saveMe(e) {
  let id = e.target.getAttribute("name");
  if (id === "gc-name") {
    localStorage.setItem("gc-name", e.target.value);
    // e.target.setAttribute("size", e.target.value.length);
    e.target.style.width = `${e.target.value.length}rem`;
  } else if (id === "course-title") {
    let name = e.target.getAttribute("placeholder");
    print(e.target.value);
    store[name].name = e.target.value;
    save(store[name], "course");
    store = reconstruct();
    delete store[name];
    localStorage.setItem("gc-datastore", JSON.stringify(store));
    location.reload();
  } else if (id === "component") {
    let name = e.target.parentElement.parentElement.parentElement.parentElement.firstElementChild.getAttribute(
      "placeholder"
    );
    let cname = e.target.getAttribute("placeholder");
    print(e.target.value);
    store = reconstruct();
    store[name].weights[cname].name = e.target.value;
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
  store = reconstruct();
  counter = 0;
  for (let x of Object.keys(store)) {
    if (x.includes("untitled")) {
      counter++;
    }
  }
  return counter;
}
function save(data, type) {
  store = reconstruct();
  if (type === "course") {
    store[data.name] = {};
    store[data.name].name = data.name;
    store[data.name].weights = data.export();
    localStorage.setItem("gc-datastore", JSON.stringify(store));
  }
}

function deleteCourse(e) {
  e.preventDefault();
  let name = e.target.parentElement.parentElement.firstElementChild.getAttribute(
    "placeholder"
  );
  del(name);
}

function del(name) {
  store = reconstruct();
  delete store[name];
  localStorage.setItem("gc-datastore", JSON.stringify(store));
  location.reload();
}
