let store = reconstruct();
if (store === null) {
  localStorage.setItem("gc-datastore", "{}");
  let numClasses = 0;
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
