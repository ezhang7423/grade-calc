function populateModal(name) {
  ` <div class="modal-content">
  <span onclick="toggleModal()" class="mc">&#xf00d;</span>
  <h1>PSTAT120A: 36% <span class="bad">(F)</span></h1>
<div class="mgrid">
  <div class="bb">
    <h2 class="nomargin" title="assuming equal weighting">
      homework
    </h2>
    <h4 class="nomargin">
      <div>weight: <span class="ri">30/100</span></div>
    </h4>
    <div>hw1<span class="ri">30</span></div>
    <div>hw1<span class="ri">30</span></div>
    <div>hw1<span class="ri">30</span></div>
    <div>hw1<span class="ri">30</span></div>
    <div>hw1<span class="ri">30</span></div>
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

  <div class="bb">
    <h2 class="nomargin" title="assuming equal weighting">
      homework
    </h2>
    <h4 class="nomargin">
      <div>weight: <span class="ri">30/100</span></div>
    </h4>
    <div>hw1<span class="ri">30</span></div>
    <div>hw1<span class="ri">30</span></div>
    <div>hw1<span class="ri">30</span></div>
    <div>hw1<span class="ri">30</span></div>
    <div>hw1<span class="ri">30</span></div>
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
  <div class="bb">
    <h2 class="nomargin" title="assuming equal weighting">
      final
    </h2>
    <h4 class="nomargin">
      <div>Weight: <span class="ri">30/100</span></div>
      <div>Score: <span class="ri">30/100</span></div>
      <div>contribution: <span class="ri">30/100</span></div>
    </h4>
  </div>
  <div class="bb">
    <h2 class="nomargin" title="assuming equal weighting">
      new component
    </h2>
    <h4 class="nomargin">
      <div>weight: 0/100</div>
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
  print(x);
  if (x.isList) {
    return `<div class="bb">
    <h2 class="nomargin" title="assuming equal weighting">
      homework
    </h2>
    <h4 class="nomargin">
      <div>weight: <span class="ri">30/100</span></div>
    </h4>
    <div>hw1<span class="ri">30</span></div>
    <div>hw1<span class="ri">30</span></div>
    <div>hw1<span class="ri">30</span></div>
    <div>hw1<span class="ri">30</span></div>
    <div>hw1<span class="ri">30</span></div>
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
    `;
  } else {
    return `<div class="bb">
    <h2 class="nomargin" title="assuming equal weighting">
      final
    </h2>
    <h4 class="nomargin">
      <div>Weight: <span class="ri">30/100</span></div>
      <div>Score: <span class="ri">30/100</span></div>
      <div>contribution: <span class="ri">30/100</span></div>
    </h4>
  </div>`;
  }
}

//edit css of grid (for however many components there are)
