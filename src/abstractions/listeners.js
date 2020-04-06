function saveMeEnter(e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    saveMe(e);
    print("enter called");
  }
}

function openTooltip(e) {
  e.preventDefault();
  let tooltip = e.target.firstElementChild;
  if (tooltip === null) {
    return;
  }
  for (let x of document.querySelectorAll(".tooltip")) {
    if (x.firstElementChild.className.includes("visible") && x != e.target) {
      x.firstElementChild.classList.toggle("visible");
    }
  }
  tooltip.classList.toggle("visible");
}
function togandPopModal(e) {
  e.preventDefault();
  let name =
    e.target.parentElement.parentElement.parentElement.children[1].placeholder;
  let modal = document.querySelector(".modal");
  modal.innerHTML = populateModal(name);
  let canChanges = document.querySelectorAll(".ric.cc, .lic.cc");
  for (let x of canChanges) {
    x.addEventListener("focusout", saveMeBlur);
    x.addEventListener("keyup", saveMeEnter);
  }
  document.querySelector(".modal-save").addEventListener("click", saveModal);
  modal.classList.toggle("show-modal");
  for (let x of document.querySelectorAll(".addmcc")) {
    x.addEventListener("click", addcomcom);
  }
  let num = numComponents(name);
  if (num < 8) {
    for (let x of document.querySelectorAll(".madd")) {
      x.addEventListener("click", addcom);
    }
  }
  for (let x of document.querySelectorAll(".del-com")) {
    x.addEventListener("click", delcom);
  }
}
function delcom(e) {
  e.preventDefault();
  print("hi");
  let name = getParentCourse();
  let dad = store[searchObj(store, name)];
  let child =
    dad.weights[
      searchObj(dad.weights, e.target.parentElement.parentElement.firstElementChild.placeholder)
    ];
  if (child.weight != 0) {
    alert("Change this component's weight to zero first please.");
    return;
  }
  let totalW = 0;
  for (let x of Object.keys(dad.weights)) {
    totalW += dad.weights[x].weight;
  }
  if (totalW != 100) {
    alert("Weights do not add up to 100");
    throw "effed weights";
  }

  delete dad.weights[
    searchObj(dad.weights, e.target.nextElementSibling.placeholder)
  ];
  save(dad, "component");
  location.reload();
}

function addcom(e) {
  e.preventDefault();
  let name = getParentCourse();
  let dad = store[searchObj(store, name)];
  let id = e.target.parentElement.getAttribute("name");
  if (id === "t") {
    try {
      var storelen = Object.keys(dad.weights).reduce((a, b) => {
        a = parseInt(a);
        b = parseInt(b);
        return a > b ? a : b;
      });
    } catch {
      var storelen = -1;
    }
    storelen++;
    dad.weights[storelen] = new GradeComponent(`untitled ${storelen}`, 100, 0);
  } else {
    try {
      var storelen = Object.keys(dad.weights).reduce((a, b) => {
        a = parseInt(a);
        b = parseInt(b);
        return a > b ? a : b;
      });
    } catch {
      var storelen = -1;
    }
    storelen++;
    dad.weights[storelen] = new GradeComponent(`untitled ${storelen}`, 100, 0);
    dad.weights[storelen].grade = { "0": 100 };
  }
  try {
    saveModal(e);
  } catch (e) {
    throw e;
  }
  localStorage.setItem("modal", name);
  location.reload();
}

function addcomcom(e) {
  e.preventDefault();
  let name = getParentCourse();
  let cname =
    e.target.parentElement.parentElement.firstElementChild.placeholder;
  let dad = store[searchObj(store, name)];
  dad = dad.weights[searchObj(dad.weights, cname)];
  try {
    var storelen = Object.keys(dad.grad).reduce((a, b) => {
      a = parseInt(a);
      b = parseInt(b);
      return a > b ? a : b;
    });
  } catch {
    var storelen = -1;
  }
  storelen++;
  dad.grad[storelen] = { name: `untitled ${storelen}`, gradie: 100 };
  let mu = create(`<div class="full-comp">
      <input class="cc nakinput lic" name="mcomp-gradename" title="Enter your grade. Example: If you got 89% enter 89" placeholder="untitled ${storelen}">
      <input class="cc nakinput ric" name="mcomp-grade" title="Enter your grade. Example: If you got 89% enter 89" placeholder="100%">
      </div>`);
  e.target.parentElement.parentElement.insertBefore(mu, e.target.parentElement);
  unsaved();
}
function recalc() {
  let dad = store[searchObj(store, getParentCourse())];
  document.querySelector(
    ".mcn-wrapper"
  ).innerHTML = `<h1 class = "modalcoursename"> ${dad.name}: ${calcSum(dad)}%
  <span class=${calcSum(dad) < 93 ? "bad" : "good"}>${letterGrade(
    dad
  )}</span></h1></div>
  `;
  let c = 0;
  let d;
  for (let x of document.querySelectorAll("[title='Contribution']")) {
    d = dad.weights[c];
    x.nextElementSibling.innerText = `${calcC(d.grade, d.weight)}%`;
    c++;
  }
}

function saveModal(e) {
  e.preventDefault();
  let course = getParentCourse();
  let dad = store[searchObj(store, course)];
  let weights = dad.weights;
  let totalW = 0;
  for (let x of Object.keys(weights)) {
    totalW += weights[x].weight;
  }
  if (totalW != 100) {
    alert("Weights do not add up to 100");
    throw "effed weights";
  }
  // after update contribuitons and title score
  recalc();
  save(dad, "component");
  if (!document.querySelector(".unsaved").classList.value.includes("hidden")) {
    document.querySelector(".unsaved").classList.toggle("hidden");
  }
}
function toggleModal() {
  document.querySelector(".modal").classList.toggle("show-modal");
}

function saveMeBlur(e) {
  e.preventDefault();
  saveMe(e);
  print("focusout called");
}

function saveMe(e) {
  let id = e.target.getAttribute("name");
  if (e.target.value !== "") {
    if (id === "gc-name") {
      localStorage.setItem("gc-name", e.target.value);
      let letterL = e.target.value.length;
      letterL = Math.max(1, letterL);
      e.target.style.width = `${letterL * 0.6}em`;
      e.target["placeholder"] = e.target.value;
      e.target.value = "";
    } else if (id === "course-title") {
      let name = e.target.placeholder;
      name = searchObj(store, name);
      store[name].name = e.target.value;
      localStorage.setItem("gc-datastore", JSON.stringify(store));
      e.target["placeholder"] = e.target.value;
      e.target.value = "";
    } else if (id === "component") {
      let name =
        e.target.parentElement.parentElement.parentElement.parentElement
          .children[1].placeholder;
      name = searchObj(store, name);
      let cname = searchObj(store[name].weights, e.target.placeholder);
      store[name].weights[cname].name = e.target.value;
      save(store[name], "component");
      e.target["placeholder"] = e.target.value;
      e.target.value = "";
    } else if (id === "percentage") {
      let name =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.children[1].placeholder;
      name = searchObj(store, name);
      let cname = searchObj(
        store[name].weights,
        e.target.parentElement.parentElement.children[1].getAttribute(
          "placeholder"
        )
      );
      let val = parseFloat(e.target.value);
      if (isNaN(val) || val < 0 || val > 100) {
        throw "bruh";
      } else {
        // print(store[name].weights[cname]);
        store[name].weights[cname].grade = val;
        save(store[name], "component");
        e.target["placeholder"] = calcGrad(
          e.target.value,
          store[name].weights[cname].weight
        );
        e.target.value = "";
        let courseChildren =
          e.target.parentElement.parentElement.parentElement.parentElement
            .parentElement.children;
        // print(courseChildren);
        courseChildren[
          courseChildren.length - 1
        ].children[1].firstElementChild.innerText = `${calcSum(
          store[name]
        )}/100%`;
      }
    } else if (id === "wcomp") {
      let name =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.children[1].placeholder;
      name = searchObj(store, name);
      let cname =
        e.target.parentElement.parentElement.parentElement.parentElement
          .firstElementChild.children[1].placeholder;
      cname = searchObj(store[name].weights, cname);
      let toUpdate = searchObj(
        store[name].weights[cname].grad,
        e.target.placeholder
      );
      store[name].weights[cname].grad[toUpdate].name = e.target.value;
      save(store[name], "component");
      e.target["placeholder"] = e.target.value;
      e.target.value = "";
    } else if (id === "wpercent") {
      let name =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.parentElement.parentElement.children[1].placeholder;
      name = searchObj(store, name);
      let cname =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.firstElementChild.children[1].placeholder;
      cname = searchObj(store[name].weights, cname);
      let toUpdate = searchObj(
        store[name].weights[cname].grad,
        e.target.parentElement.parentElement.firstElementChild.placeholder
      );
      let val = parseFloat(e.target.value);
      if (isNaN(val) || val < 0 || val > 100) {
        throw "bruh";
      } else {
        store[name].weights[cname].grad[toUpdate].gradie = val;
        save(store[name], "component");
        e.target["placeholder"] = val;
        e.target.value = "";

        let daddy = e.target.parentElement.parentElement.parentElement.parentElement.innerHTML.split(
          "\n"
        );
        let daddychange = daddy[0].split("/");
        daddychange[0] = String(
          calcGrad(
            store[name].weights[cname].grade,
            store[name].weights[cname].weight
          )
        );
        daddy[0] = daddychange.join("/");
        e.target.parentElement.parentElement.parentElement.parentElement.innerHTML = daddy.join(
          "\n"
        );
        let canChanges = document.querySelectorAll(".cc");
        for (let x of canChanges) {
          x.addEventListener("focusout", saveMeBlur);
          x.addEventListener("keyup", saveMeEnter);
        }
      }
    } else if (id === "mtitle") {
      let name = getParentCourse();
      let wname = e.target.placeholder;
      let dad = store[searchObj(store, name)];
      let toUpdate = dad.weights[searchObj(dad.weights, wname)];
      let val = e.target.value;
      toUpdate.name = val;
      e.target["placeholder"] = val;
      e.target.value = "";
      unsaved();
    } else if (id === "mweight") {
      let name = getParentCourse();
      let wname =
        e.target.parentElement.parentElement.parentElement.firstElementChild
          .placeholder;
      let dad = store[searchObj(store, name)];
      let toUpdate = dad.weights[searchObj(dad.weights, wname)];
      let val = e.target.value;
      toUpdate.weight = validNum(val);
      e.target["placeholder"] = String(val) + "%";
      e.target.value = "";
      unsaved();
    } else if (id === "mcomp-grade") {
      let name = getParentCourse();
      let wname =
        e.target.parentElement.parentElement.firstElementChild.placeholder;
      let dad = store[searchObj(store, name)];
      let toUpdate = dad.weights[searchObj(dad.weights, wname)];
      let val = e.target.value;
      let ccname =
        toUpdate.grad[
          searchObj(
            toUpdate.grad,
            e.target.parentElement.firstElementChild.placeholder
          )
        ];
      try {
        ccname.gradie = validNum(val);
      } catch (e) {
        throw e;
      }
      e.target["placeholder"] = String(val) + "%";
      e.target.value = "";
      unsaved();
    } else if (id === "mscore") {
      let name = getParentCourse();
      print(e.target);
      let wname =
        e.target.parentElement.parentElement.parentElement.firstElementChild
          .placeholder;
      let dad = store[searchObj(store, name)];
      let toUpdate = dad.weights[searchObj(dad.weights, wname)];
      let val = e.target.value;
      try {
        toUpdate.grad = validNum(val);
      } catch (e) {
        throw e;
      }
      e.target["placeholder"] = String(val) + "%";
      e.target.value = "";
      unsaved();
    } else if (id === "mcomp-gradename") {
      let name = getParentCourse();
      let wname =
        e.target.parentElement.parentElement.firstElementChild.placeholder;
      let dad = store[searchObj(store, name)];
      let toUpdate = dad.weights[searchObj(dad.weights, wname)];
      let val = e.target.value;
      let ccname =
        toUpdate.grad[searchObj(toUpdate.grad, e.target.placeholder)];

      ccname.name = val;
      e.target["placeholder"] = String(val);
      e.target.value = "";
      unsaved();
    } else {
      print("id not found");
      print(e.target);
    }
  } else {
    print("no change");
  }
}

function unsaved() {
  if (document.querySelector(".unsaved").classList.value.includes("hidden")) {
    document.querySelector(".unsaved").classList.toggle("hidden");
  }
}

function validNum(val) {
  val = parseFloat(val);
  if (isNaN(val) || val < 0 || val > 100) {
    throw "bruh";
  } else {
    return val;
  }
}
function getParentCourse() {
  return document.querySelector(".modalcoursename").innerText.split(":")[0];
}
function addNew(e) {
  e.preventDefault();
  let untitled = largestUntitled();
  let x = new Course(`untitled course ${untitled + 1}`, [100]);
  save(x, "course");
  location.reload();
}

function setName(e) {
  if (e.keyCode === 13) {
    print(input.value);
    e.preventDefault();
    localStorage.setItem("gc-name", input.value);
    location.reload();
  }
}
function exportt(e) {
  e.preventDefault();
  let textToSave = JSON.stringify(store);
  let hiddenElement = document.createElement("a");
  hiddenElement.href = "data:attachment/text," + encodeURI(textToSave);
  hiddenElement.target = "_blank";
  hiddenElement.download = `${name}'s courses.json`;
  hiddenElement.click();
}

function deleteCourse(e) {
  e.preventDefault();
  let name = e.target.parentElement.parentElement.children[1].getAttribute(
    "placeholder"
  );
  name = searchObj(store, name);
  del(name);
}

function saveCourse(e) {
  print(e.target);
}
