let input = document.querySelector(".name-input");
let name = localStorage.getItem("grc-name");
let nameContainer = document.querySelector(".name-container");
let addClass = document.querySelector(".add-class");

addClass.addEventListener("click", function(e) {
  e.preventDefault();
  console.log("wassup");
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

// for testing
let x = new Course("MATH4B", [10, 20, 70]);
let y = new Course("PSTAT120A", [30, 20, 20, 15, 15]);
save(x, "course");
save(y, "course");
