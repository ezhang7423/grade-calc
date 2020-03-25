function calcGrad(grade, weight) {
  let num = (grade / 100) * weight;
  return Math.round((num + Number.EPSILON) * 100) / 100;
}
function generate(store, numClasses) {
  colors = getColors(numClasses);
  let count = 0;
  for (let component of Object.keys(store)) {
    // let tmp = `<div class="course ${alph(count)}">${component}</div>`;
    let tmp = createParent(component, store, count);
    tmp = create(tmp);
    classContainer.appendChild(tmp);
    editCSS(`.${alph(count)}.course{background-color: ${colors[count]};}`);
    count++;
  }
}

function createParent(component, store, count) {
  let parentNode = `
  <div class="course ${alph(count)}">
    <div class = "course-title cc" name = "course-title">${component}</div>
    ${createComponents(component, store[component])}
    ${createTotal(store[component])}
    ${createSanD()}
  </div>`;
  return parentNode;
}
function createComponents(component, data) {
  let parentNode = `<div class = "components">`;
  let childNode, iter, calcGrade;
  let listType = `<i class="fas fa-list-ul"></i>`;
  let simpleType = `<i class="fas fa-check-square"></i>`;
  print(data[0]);
  for (let i of Object.keys(data)) {
    iter = data[i];
    calcGrade = calcGrad(iter.grade, iter.weight);
    childNode = `<div class = "component">
        ${iter.isList ? listType : simpleType}
        <span class="cc" name="component">${iter.name}</span>
        <span class="ar">${calcGrade}/${iter.weight}%</span>
    </div>`;
    parentNode += childNode;
  }
  parentNode += createAdder();
  return parentNode + `</div>`;
}

function createAdder() {
  let node = `
    <div class="add-component">
    <select
      title="Select the list type for components that span multiple works, and the checkmark for singular works. For example, homework should be list type, and midterm should be checkmark type."
      id="ac-sel"
    >
      <option class="ac-sel-option" value="list"> &#xf14a;</option>
      <option class="ac-sel-option" value="list"> &#xf03a;</option>
    </select>
    <input spellcheck="false" class="nakinput" placeholder="Add" />
  </div>
    `;
  return node;
}

function createTotal(data) {
  let sum = 0;
  for (let i of Object.keys(data)) {
    sum += calcGrad(data[i].grade, data[i].weight);
  }
  let node = `
    <div class="total-container">
  <hr class="linebreak" />
  <div class="total">Total <span class="ar">${sum}/100%</span></div>
</div>
    `;
  return node;
}

function createSanD() {
  let node = `
    <div class="bor">
  <button title="save" class="course-naked">&#xf0c7;</button>
  &nbsp;
  <button title="delete" class="course-naked">&#xf00d;</button>
</div>

    `;
  return node;
}
