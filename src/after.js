let input = document.querySelector(".name-input");
let nameContainer = document.querySelector(".name-container");
let classContainer = document.querySelector(".main-content");
let addClass = document.querySelector(".add-class");
let exportData = document.querySelector(".export-data");
store = reconstruct();
numClasses = Object.keys(store).length;
let tmp;

exportData.addEventListener("click", exportt);
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
  }
});
generate(store, numClasses);
document.querySelectorAll(".addcc")[1].click();
