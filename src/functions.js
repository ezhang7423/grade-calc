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

function editCSS(rule) {
  for (const sheet of document.styleSheets) {
    if (sheet.href.includes("style.css")) {
      var styling = sheet;
      break;
    }
  }
  sel = document.all ? "rules" : "cssRules";
  stylingL = Object.keys(styling[sel]).length;
  styling.insertRule(rule, stylingL);
}

function save(data, type) {
  store = JSON.parse(localStorage.getItem("gc-datastore"));
  if (type === "course") {
    store[data.name] = data.export();
    localStorage.setItem("gc-datastore", JSON.stringify(store));
  }

  //   if (type === "gc") {
  //       let toChange = store[]
  //     if (data.isList){

  //     }
  //   }
}
