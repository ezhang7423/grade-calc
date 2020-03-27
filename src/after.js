let input = document.querySelector(".name-input");
let nameContainer = document.querySelector(".name-container");
let classContainer = document.querySelector(".main-content");
let addClass = document.querySelector(".add-class");
let exportData = document.querySelector(".export-data");

store = reconstruct();
numClasses = Object.keys(store).length;
let tmp;

if (numClasses < 8) {
  addClass.addEventListener("click", addNew);
} else {
  addClass.classList.add("disabled");
}

exportData.addEventListener("click", exportt);
input.addEventListener("keyup", setName);

if (name !== null && name !== "") {
  // print("name exists");
  let nameE = create(
    `<div>Welcome back <input size = "1" name = "gc-name" class="nakinput cc namecc" spellcheck="false" placeholder="${name}" type="text" /></div>`
  );
  nameContainer.insertBefore(nameE, input);
  input.classList.add("hidden");
}
generate(store, numClasses);
