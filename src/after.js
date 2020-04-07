let input = document.querySelector(".name-input");
let nameContainer = document.querySelector(".name-container");
let classContainer = document.querySelector(".main-content");
let addClass = document.querySelector(".add-class");
let exportData = document.querySelector(".export-data");
let importData = document.querySelector(".import-data");
store = reconstruct();
numClasses = Object.keys(store).length;
let tmp;

exportData.addEventListener("click", exportt);
importData.addEventListener("click", importt);
input.addEventListener("keyup", setName);

if (numClasses < 8) {
  addClass.addEventListener("click", addNew);
} else {
  addClass.classList.add("disabled");
}
if (name !== null && name !== "") {
  // print("name exists");
  let nameE = create(
    `<div>Welcome back 
    <input name = "gc-name" class="nakinput cc namecc" 
    spellcheck="false" placeholder="${name}" type="text"
    maxlength="17" /></div>`
  );
  nameContainer.insertBefore(nameE, input);
  input.classList.add("hidden");
}

document.querySelector(".modal").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target === document.querySelector(".modal")) {
    document.querySelector(".modal").classList.toggle("show-modal");
    localStorage.removeItem("modal");
  }
});

document.querySelector(".save-theme").addEventListener("click", () => {
  localStorage.setItem("theme", document.querySelector("#theme-pick").value);
  location.reload();
});

document.querySelector(".theme-modal").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target === document.querySelector(".theme-modal")) {
    localStorage.setItem("theme", document.querySelector("#theme-pick").value);
    location.reload();
  }
});
let theme = localStorage.getItem("theme")
  ? localStorage.getItem("theme")
  : undefined;
if (theme != undefined) {
  for (let x of document.querySelector("#theme-pick").children) {
    if (x.getAttribute("value") === theme) {
      x.setAttribute("selected", "");
    }
  }
}
generate(store, numClasses, theme);

let reloadModal = localStorage.getItem("modal");
if (reloadModal != null) {
  try {
    document
      .querySelectorAll(".addcc.naked")
      [searchObjPos(store, reloadModal)].click();
  } catch {
    localStorage.removeItem("modal");
  }
}
