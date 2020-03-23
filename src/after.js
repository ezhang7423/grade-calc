let input = document.querySelector(".name-input");
let name = localStorage.getItem("grc-name");
let nameContainer = document.querySelector(".name-container");
input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    print(input.value);
    event.preventDefault();
    localStorage.setItem("grc-name", input.value);
  }
});

if (name !== null) {
  print("name exists");
  let nameE = create(`<div>Hello there, ${name}</div>`);
  nameContainer.insertBefore(nameE, input);
  input.classList.add("hidden");
}
