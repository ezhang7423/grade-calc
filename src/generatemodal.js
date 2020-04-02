function populateModal(name) {
  ` 
  <div class="bb">
    <h2 class="nomargin" title="assuming equal weighting">
      new component
    </h2>
    <h4 class="nomargin">
      <div>Weight: 0/100</div>
    </h4>
    <select style="width: 10vw;" class="type-sel" name="type-sel">
      <option value="simple">Simple</option>
      <option value="list">List</option>
    </select>
    <div>hw1<span class="ri">30/100</span></div>
    <div>hw1<span class="ri">30/100</span></div>
    <div>hw1<span class="ri">30/100</span></div>
    <div>hw1<span class="ri">30/100</span></div>
    <div>hw1<span class="ri">30/100</span></div>
    <button class="naked nomargin">
      <i class="fas fa-plus-square"></i>
    </button>
    <div class="mup">
      <h4 class="nomargin">Total<span class="ri">30/100</span></h4>
      <h4 class="nomargin">
        Contribution<span class="ri">9/100</span>
      </h4>
    </div>
  </div>
  <button class="naked madd">
    add<i class="fas fa-plus-square"></i>
  </button>
</div>
<div class="ri">
  save
</div> 
</div>
`;
  let modalContent = `<div class="modal-content">
<span onclick="toggleModal()" class="mc">&#xf00d;</span>`;
  let comp = store[searchObj(store, name)];

  modalContent += `<h1>${name}: ${calcSum(comp)}% <span class=${
    calcSum(comp) < 93 ? "bad" : "good"
  }>${letterGrade(comp)}</span></h1>
  <div class="mgrid">
  ${genComponents(name)}
  `;
  modalContent += `<button class="naked madd">
    add<i class="fas fa-plus-square"></i>
  </button>
  </div>
  <div class="ri">
  save
  </div> 
  </div>`;
  let num = numComponents(name);
  editCSS(
    `.mgrid { grid-template-columns: ${Array(num + 1).join("1fr ")}0.1fr`
  );
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

function genComponent(x) {
  if (x.isList) {
    let num = Math.round((x.grade + Number.EPSILON) * 100) / 100;
    let comp = `<div class="bb">
    <input class="cc nakinput ric mheader"
    title="Enter your grade. Example: If you got 89% enter 89"
    placeholder="${x.name}" />
    <h4 class="nomargin">
      <div class = "full-comp">
      Weight: 
      <input class="cc nakinput ric b"
        title="Enter your grade. Example: If you got 89% enter 89"
        placeholder="${x.weight}%" />
      </div>
    </h4>`;
    for (let i of Object.keys(x.grad)) {
      comp += `<div class = "full-comp">
      ${x.grad[i].name}
      <input class="cc nakinput ric"
        title="Enter your grade. Example: If you got 89% enter 89"
        placeholder="${x.grad[i].gradie}%" />
      </div>`;
    }
    comp += `<button class="naked nomargin">
      <i class="fas fa-plus-square"></i>
    </button>
    <div class="mup">
    <div class = "full-comp">
    <strong>Total:</strong>
    <input class="cc nakinput ric b"
      title="Enter your grade. Example: If you got 89% enter 89"
      placeholder="${num}%" />
    </div>
  
    <div class = "full-comp">
    <strong>Contribution:</strong>
    <input class="cc nakinput ric b"
      title="Enter your grade. Example: If you got 89% enter 89"
      placeholder="${(num * x.weight) / 100}%" />
    </div>
    </div>
  </div>`;
    return comp;
  } else {
    let num = Math.round((x.grade + Number.EPSILON) * 100) / 100;
    return `<div class="bb">
    <input class="cc nakinput ric mheader"
    title="Enter your grade. Example: If you got 89% enter 89"
    placeholder="${x.name}" />
    <h4 class="nomargin">
    
    <div class = "full-comp">
    Weight: 
    <input class="cc nakinput ric b"
      title="Enter your grade. Example: If you got 89% enter 89"
      placeholder="${x.weight}%" />
    </div>

    <div class = "full-comp">
    <strong>Score:</strong>
    <input class="cc nakinput ric b"
      title="Enter your grade. Example: If you got 89% enter 89"
      placeholder="${num}%" />
    </div>
  
    <div class = "full-comp">
    <strong>Contribution:</strong>
    <input class="cc nakinput ric b"
      title="Enter your grade. Example: If you got 89% enter 89"
      placeholder="${(num * x.weight) / 100}%" />
    </div>
    </h4>
  </div>`;
  }
}
