function print(thing) {
  console.log(thing);
}
function RGBToHSL(r, g, b, a) {
  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;

  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;
  // Calculate hue
  // No difference
  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;
  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  return [h, s, l];
  //return "hsl(" + h + "," + s + "%," + l + "%)";
}
let alph = num => {
  return String.fromCharCode(97 + num);
};
function getColors(num) {
  let act = [];
  let colors = colormap({
    colormap: "autumn", //allow user customization
    nshades: num,
    format: "rgba",
    alpha: 1
  });
  for (let x of colors) {
    [h, s, l] = RGBToHSL(x);
    print(h);
    act.push(
      "hsla(" +
        h +
        "," +
        s +
        "%," +
        String(parseInt(l) + 30) +
        "%," +
        x[3] +
        "%)"
    );
  }
  return act;
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

let addFake = () => {
  let x = new Course("MATH4B", [10, 20, 70]);
  let y = new Course("PSTAT120A", [30, 20, 20, 15, 15]);
  save(x, "course");
  save(y, "course");
  location.reload();
};
let cClear = () => {
  localStorage.removeItem("gc-datastore");
  location.reload();
};
function numUntitled() {
  store = JSON.parse(localStorage.getItem("gc-datastore"));
  counter = 0;
  for (let x of Object.keys(store)) {
    if (x.includes("untitled")) {
      counter++;
    }
  }
  return counter;
}
function save(data, type) {
  store = JSON.parse(localStorage.getItem("gc-datastore"));
  if (type === "course") {
    store[data.name] = data.export();
    localStorage.setItem("gc-datastore", JSON.stringify(store));
  }
}
