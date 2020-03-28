function saveMeEnter(e) {
  e.preventDefault();
  if (e.keyCode === 13) {
    saveMe(e);
    print("enter called");
  }
}

function openTooltip(e) {
  let tooltip = e.target.firstElementChild;
  print(tooltip);
  tooltip.classList.toggle("visible");
}
function toggleModal(e) {
  print(e.target);
  e.target.classList.toggle("show-modal");
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
      let name = e.target.getAttribute("placeholder");
      Object.defineProperty(
        store,
        e.target.value,
        Object.getOwnPropertyDescriptor(store, name)
      );
      localStorage.setItem("gc-datastore", JSON.stringify(store));
      del(name);
    } else if (id === "component") {
      let name = e.target.parentElement.parentElement.parentElement.parentElement.children[1].getAttribute(
        "placeholder"
      );
      let cname = searchComp(name, e.target.getAttribute("placeholder"));
      store[name].weights[cname].name = e.target.value;
      save(store[name], "component");
      e.target["placeholder"] = e.target.value;
      e.target.value = "";
    } else if (id === "percentage") {
      let name = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].getAttribute(
        "placeholder"
      );
      let cname = searchComp(
        name,
        e.target.parentElement.parentElement.children[1].getAttribute(
          "placeholder"
        )
      );
      let val = parseInt(e.target.value);
      if (isNaN(val) || val < 0 || val > 100) {
        throw "ur dumb bruh";
      } else {
        print(store[name].weights[cname]);
        store[name].weights[cname].grade = val;
        save(store[name], "component");
        // print(e.target.parentElement.innerText.slice(, -1));
        e.target["placeholder"] = calcGrad(
          e.target.value,
          store[name].weights[cname].weight
        );
        e.target.value = "";
        let courseChildren =
          e.target.parentElement.parentElement.parentElement.parentElement
            .parentElement.children;
        print(courseChildren);
        courseChildren[
          courseChildren.length - 1
        ].children[1].firstElementChild.innerText = `${calcSum(
          store[name]
        )}/100%`;
      }
    }
  }
}
function addNew(e) {
  e.preventDefault();
  store = reconstruct();
  numClasses = Object.keys(store).length;
  untitled = largestUntitled();
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
  del(name);
}

function saveCourse(e) {
  print(e.target);
}
