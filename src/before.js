let store = reconstruct();
let name = localStorage.getItem("gc-name");
if (store === null) {
  localStorage.setItem("gc-datastore", "{}");
  let numClasses = 0;
  k;
} else {
  let numClasses = Object.keys(store).length;
  let containerWidth = 100 / numClasses;

  editCSS(
    `.course { 
      width: ${containerWidth}vw; 
      font-size: ${numClasses > 2 ? containerWidth / 10 : 3}vw;
    }`
  );
}

if (name !== null && name !== "") {
  editCSS(
    `.nakinput.namecc{
      width: ${name.length}rem;
    }`
  );
}
