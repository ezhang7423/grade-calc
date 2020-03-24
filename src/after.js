let input = document.querySelector(".name-input");
let name = localStorage.getItem("grc-name");
let nameContainer = document.querySelector(".name-container");
let classContainer = document.querySelector(".main-content");
let addClass = document.querySelector(".add-class");
let exportData = document.querySelector(".export-data");
store = JSON.parse(localStorage.getItem("gc-datastore"));
numClasses = Object.keys(store).length;
let tmp;

function addClassCallback(e) {
  e.preventDefault();
  store = JSON.parse(localStorage.getItem("gc-datastore"));
  numClasses = Object.keys(store).length;
  untitled = numUntitled();
  let x = new Course(`untitled course ${untitled}`, [100]);
  tmp = create(`<div class="course">untitled course ${untitled}</div>`);
  classContainer.appendChild(tmp);
  save(x, "course");
  editCSS(`.course{ width: ${80 / (numClasses + 1)}vw;}`);
  if (numClasses + 1 >= 8) {
    addClass.removeEventListener("click", addClassCallback);
    addClass.classList.add("disabled");
  }
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
    localStorage.setItem("grc-name", input.value);
    location.reload();
  }
});

if (name !== null) {
  // print("name exists");
  let nameE = create(`<div>Welcome back ${name}</div>`);
  nameContainer.insertBefore(nameE, input);
  input.classList.add("hidden");
  //add change name functionality
}

colors = getColors(numClasses);

let counter = 0;
for (let x of Object.keys(store)) {
  print(colors[counter]);
  tmp = create(`<div class="course ${alph(counter)}">${x}</div>`);
  classContainer.appendChild(tmp);
  editCSS(`.${alph(counter)}.course{background-color: ${colors[counter]};}`);
  counter++;
}
//counter = 0;
