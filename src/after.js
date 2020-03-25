let input = document.querySelector(".name-input");
let name = localStorage.getItem("gc-name");
let nameContainer = document.querySelector(".name-container");
let classContainer = document.querySelector(".main-content");
let addClass = document.querySelector(".add-class");
let exportData = document.querySelector(".export-data");

store = reconstruct();
numClasses = Object.keys(store).length;
let tmp;

function addClassCallback(e) {
  e.preventDefault();
  store = reconstruct();
  numClasses = Object.keys(store).length;
  untitled = numUntitled();
  let x = new Course(`untitled course ${untitled}`, [100]);
  save(x, "course");
  location.reload();
}

if (numClasses < 8) {
  addClass.addEventListener("click", addClassCallback);
} else {
  addClass.classList.add("disabled");
}

exportData.addEventListener("click", function(e) {
  e.preventDefault();
  let textToSave = JSON.stringify(store);
  let hiddenElement = document.createElement("a");
  hiddenElement.href = "data:attachment/text," + encodeURI(textToSave);
  hiddenElement.target = "_blank";
  hiddenElement.download = `${name}'s courses.json`;
  hiddenElement.click();
});
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    print(input.value);
    event.preventDefault();
    localStorage.setItem("gc-name", input.value);
    location.reload();
  }
});

if (name !== null) {
  // print("name exists");
  let nameE = create(
    `<div>Welcome back <span name="gc-name" class = "cc">${name}</span></div>`
  );
  nameContainer.insertBefore(nameE, input);
  input.classList.add("hidden");
  //add change name functionality test
}

let canChanges = document.querySelectorAll(".cc");
for (let x of canChanges) {
  x.addEventListener("click", changeMe);
}

generate(store, numClasses);
