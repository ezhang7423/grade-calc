function print(thing) {
  console.log(thing);
}

function create(htmlStr) {
  var frag = document.createDocumentFragment(),
    temp = document.createElement("div");
  temp.innerHTML = htmlStr;
  while (temp.firstChild) {
    frag.appendChild(temp.firstChild);
  }
  return frag;
}

function save(data, type) {
  if (type === "course") {
    store[data.name] = data.export();
  }
  //   if (type === "gc") {
  //       let toChange = store[]
  //     if (data.isList){

  //     }
  //   }
}
