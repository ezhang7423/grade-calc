function populateModal(name) {
  let modalContent = `<div class="modal-content">
<span onclick="toggleModal()" class="mc">&#xf00d;</span>`;
  let comp = store[searchObj(store, name)];
  modalContent += `<div class = "mcn-wrapper">
  <h1 class = "modalcoursename" >${name}: ${calcSum(comp)}% <span class=${
    calcSum(comp) < 93 ? "bad" : "good"
  }>${letterGrade(comp)}</span></h1>
  </div>
  <div class="mgrid">
  ${genComponents(name)}
  `;
  let num = numComponents(name);
  modalContent += `

  <div style =     "display: flex;
    flex-direction: column;
    align-items: center;">
  <button name = "l" class="naked madd ${num == 8 ? "disabled" : ""} ">
  <i class="fas fa-list-ul"></i>
  
  </button>
  <button name = "t" class="naked madd ${num == 8 ? "disabled" : ""} ">
  <i style="margin-right: 0;" class="fas fa-check-square"></i>
  </button>
  </div>
  </div>
  
  <div class="ri">
  <span class='unsaved hidden'>unsaved &nbsp;</span>
  <span class = "modal-save">save</span>
  
  </div> 
  </div>`;

  if (num <= 5) {
    editCSS(
      `.mgrid { grid-template-columns: ${Array(num + 1).join("1fr ")}0.1fr`
    );
  } else {
    editCSS(
      `.mgrid { grid-template-columns: ${Array(5).join("1fr ")} 0.1fr ${Array(
        num - 5
      ).join("1 fr ")}`
    );
  }
  return modalContent;
}

function numComponents(name) {
  let components = store[searchObj(store, name)];
  return Object.keys(components.weights).length;
}
function genComponents(name) {
  compString = ``;
  let components = store[searchObj(store, name)];
  for (let x of Object.keys(components.weights)) {
    compString += genComponent(components.weights[x]);
  }
  return compString;
}

function calcC(num, weight) {
  let contribuition = num * weight;
  let lc = String(contribuition).replace(".", "").length;
  if (lc > 4) {
    contribuition = Math.round(contribuition);
  }
  return Math.round(contribuition * 100) / 10000;
}
function genComponent(x) {
  if (x.isList) {
    let num = Math.round((x.grade + Number.EPSILON) * 100) / 100;
    // print(num); //maxlen = 4
    //print(x.weight) // maxlen = 4
    let contribuition = calcC(num, x.weight);

    let comp = `
    <div class="bb"><input class="cc nakinput ric mheader"
    title="Enter your grade. Example: If you got 89% enter 89"
    name = "mtitle"
    placeholder="${x.name}" />
    <div class="del-com">&#xd7;</div>
    <h4 class="nomargin">
      <div class = "full-comp">
      Weight: 
      <input class="cc nakinput ric b"
      name = 'mweight'
      title="Enter your grade. Example: If you got 89% enter 89"
        placeholder="${x.weight}%" />
      </div>
    </h4>`;
    for (let i of Object.keys(x.grad)) {
      comp += `<div class = "full-comp">
      <input class="cc nakinput lic"
      name="mcomp-gradename"
        title="Enter your grade. Example: If you got 89% enter 89"
        placeholder="${x.grad[i].name}" />
      <input class="cc nakinput ric"
      name="mcomp-grade"
        title="Enter your grade. Example: If you got 89% enter 89"
        placeholder="${x.grad[i].gradie}%" />
      </div>`;
    }
    comp += `<button class="addmcc naked nomargin">
      <i class="fas fa-plus-square"></i>
    </button>
    <div class="mup">
    <div class = "full-comp">
    <strong>Total:</strong>
    <span style="font-weight: bold; margin-left: auto">
      ${num}%
     </span>
  </div>
  
    <div class = "full-comp">
    <strong title="Contribution" >Contrib. </strong>
    <span style="font-weight: bold; margin-left: auto">
      ${contribuition}%
     </span>
    </div>
    </div>
  </div>`;
    return comp;
  } else {
    let num = Math.round((x.grade + Number.EPSILON) * 100) / 100;
    let contribuition = calcC(num, x.weight);
    return `
    <div class="bb"> <input class="cc nakinput ric mheader"
    title="Enter your grade. Example: If you got 89% enter 89"
    name = "mtitle"
    placeholder="${x.name}" />
    <div class="del-com">&#xd7;</div>
    <h4 class="nomargin">
    
    <div class = "full-comp">
    Weight: 
    <input class="cc nakinput ric b"
      name = 'mweight'
      title="Enter your grade. Example: If you got 89% enter 89"
      placeholder="${x.weight}%" />
    </div>

    <div class = "full-comp">
    <strong>Score:</strong>
    <input class="cc nakinput ric b"
    name="mscore"
      title="Enter your grade. Example: If you got 89% enter 89"
      placeholder="${num}%" />
    </div>
  
    <div class = "full-comp">
    <strong title="Contribution" >Contrib. </strong>
    <span style="margin-left: auto">
      ${contribuition}%
     </span>
    </div>
    </h4>
  </div>`;
  }
}
//add limits to inputs
