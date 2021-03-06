// add sorting for comps and for courses
// disallow same name of course, and same name of component
// keep positions
// disallow empty string as object key
// still to do: export
// and fix the width of name
function calcGrad(grade, weight) {
  let num = (grade / 100) * weight;
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
function generate(store, numClasses, theme) {
  colors = getColors(numClasses, theme);
  let count = 0;
  for (let component of Object.keys(store)) {
    // let tmp = `<div class="course ${alph(count)}">${component}</div>`;
    let tmp = createParent(component, store, count);
    tmp = create(tmp);
    classContainer.appendChild(tmp);
    editCSS(`.${alph(count)}.course{background-color: ${colors[count]};}`);
    count++;
  }
  makeResponsive(numClasses);
  addListeners();
}

function addListeners() {
  let canChanges = document.querySelectorAll(".cc");
  document.querySelector(".namecc.cc").addEventListener("click", (e) => {
    e.preventDefault();
    e.target.style.width = `40vw`;
  });
  for (let x of canChanges) {
    x.addEventListener("focusout", saveMeBlur);
    x.addEventListener("keyup", saveMeEnter);
  }
  let saves = document.querySelectorAll("[title = 'save']");
  for (let x of saves) {
    x.addEventListener("click", saveCourse);
  }
  let deletes = document.querySelectorAll("[title = 'delete']");
  for (let x of deletes) {
    x.addEventListener("focusout", deleteCourse);
  }

  for (let x of document.querySelectorAll(".naked.addcc")) {
    x.addEventListener("click", togandPopModal);
  }
  for (let x of document.querySelectorAll(".tooltip")) {
    x.addEventListener("click", openTooltip);
  }
}
function makeResponsive(numClasses) {
  if (numClasses === 5) {
    print("numclasses 5");
    editCSS(`
    .nakinput.pcc, .nakinput, .nakinput.compcc, .addcc.naked, .component{font-size: 1.5vw;}`);
    editCSS(`.titlecc, .total{font-size: 2vw;}`);
    editCSS(
      `.course-naked{font-size: .9vw;}
        `
    );
  } else if (numClasses > 5) {
    print("numclasses greater than 5");
    editCSS(`
    .nakinput.pcc, .component, .nakinput, .nakinput.compcc, .addcc.naked{font-size: .9vw;}`);
    editCSS(`.titlecc, .total{font-size: 1vw;}`);
    editCSS(
      `.course-naked{font-size: .8vw;}
        `
    );
  }
}
function createParent(component, store, count) {
  let parentNode = `
  <div class="course ${alph(count)}">
  <div><button title="delete" class="course-naked">&#xf00d;</button></div>
    <input spellcheck="false"
     class = "course-title cc nakinput titlecc"
      name = "course-title"
       placeholder="${store[component].name}" />
    ${createComponents(store[component])}
    ${createTotal(store[component])}
  </div>`;
  return parentNode;
}

function genTooltip(iter, calcGrade) {
  let tooltip = `<span class="tooltip ar"
  >${calcGrade}/${iter.weight}%
  <span class="tooltiptext">
  `;

  for (let grade of Object.keys(iter.grad)) {
    tooltip += `<div class="full-comp">
  
    <input
      spellcheck="false"
      class="cc nakinput weight compcc"
      name="wcomp"
      type="text"
      maxlength="8"
      placeholder="${iter.grad[grade].name}"
    />
    <span class="weight ar">
      <input
        maxlength="5"
        spellcheck="false"
        title="Enter the score you got out of 100 (your raw score)"
        class="cc nakinput weight pcc"
        name="wpercent"
        placeholder="${iter.grad[grade].gradie}"
      />
      /100%</span
    >
  </div>
  `;
  }
  tooltip += `
  </span>
</span>`;
  return tooltip;
}
function createComponents(data) {
  let parentNode = `<div class = "components">`;
  let childNode, iter, calcGrade;
  for (let i of Object.keys(data.weights)) {
    iter = data.weights[i];
    calcGrade = calcGrad(iter.grade, iter.weight);
    if (iter.isList) {
      childNode = `
      <div class = "component">
        <div class = 'left-comp'>
          <i class="fas fa-list-ul"></i>
          <input spellcheck="false"
           class="cc nakinput compcc" 
           name="component" 
           maxlength="10"
           type="text"
           placeholder="${iter.name}" />
        </div>
        ${genTooltip(iter, calcGrade)}
      </div>`;
    } else {
      childNode = `
      <div class = "component">
        <div class = 'full-comp'>
          <i class="fas fa-check-square"></i>
          <input spellcheck="false" 
          class="cc nakinput compcc" 
          name="component" 
          type="text"
          maxlength="10"
          placeholder="${iter.name}" />
          
          <span class="ar">
          <input
            maxlength="5"
            spellcheck="false"
            title="Enter the score you got out of 100 (your raw score)"
            class="cc nakinput pcc"
            name="percentage"
            placeholder="${calcGrade}"
          />
          /${iter.weight}%</span
        >
        </div>
      </div>
      `;
    }
    parentNode += childNode;
  }
  parentNode += createAdder();

  return parentNode + `</div>`;
}

function createAdder() {
  let node = `
    <div class="add-component component">
    <button class="addcc naked">Advanced</button>
  </div>
    `;
  return node;
}

function createTotal(data) {
  let sum = calcSum(data);
  let node = `
    <div class="total-container">
  <hr class="linebreak" />
  <div class="total">Total <span class="tar">${sum}/100%</span></div>
</div>
    `;
  return node;
}
