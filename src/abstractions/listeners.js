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

function saveMeBlur(e) {
  e.preventDefault();
  saveMe(e);
  print("blur called");
}

function saveMe(e) {
  let id = e.target.getAttribute("name");
  if (id === "gc-name") {
    localStorage.setItem("gc-name", e.target.value);
    let letterL = e.target.value.length;
    letterL = Math.max(1, letterL);
    e.target.style.width = `${letterL * 1.1}rem`;
    e.target["placeholder"] = e.target.value;
  } else if (id === "course-title") {
    let name = e.target.getAttribute("placeholder");
    print(e.target.value);
    store[name].name = e.target.value;
    save(store[name], "course");
    del(name);
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
function addNew(e) {
  e.preventDefault();
  store = reconstruct();
  numClasses = Object.keys(store).length;
  untitled = numUntitled();
  let x = new Course(`untitled course ${untitled}`, [100]);
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
  let name = e.target.parentElement.parentElement.firstElementChild.getAttribute(
    "placeholder"
  );
  del(name);
}

function saveCourse(e) {
  print(e.target);
}
