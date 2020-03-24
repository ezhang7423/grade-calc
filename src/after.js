let input = document.querySelector(".name-input");
let name = localStorage.getItem("grc-name");
let nameContainer = document.querySelector(".name-container");
let classContainer = document.querySelector(".main-content");
let addClass = document.querySelector(".add-class");
store = JSON.parse(localStorage.getItem("gc-datastore"));
let tmp;
addClass.addEventListener("click", function(e) {
  e.preventDefault();
  store = JSON.parse(localStorage.getItem("gc-datastore"));
  numClasses = Object.keys(store).length;
  untitled = numUntitled();
  let x = new Course(`untitled course ${untitled}`, [100]);
  tmp = create(`<div class="course">untitled course ${untitled}</div>`);
  classContainer.appendChild(tmp);
  save(x, "course");
  print(numClasses + 1);
  editCSS(`.course{ width: ${80 / (numClasses + 1)}vw;}`);
  // i need to adjust the vw
  // i need to save the class
  // i need to disable this after 8 classes
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

for (let x of Object.keys(store)) {
  tmp = create(`<div class="course">${x}</div>`);
  classContainer.appendChild(tmp);
}
