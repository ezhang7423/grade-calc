`
<div class="course fake">
<div class="course-title cc" name="course-title">Archaeology 172</div>
<div class="components">
  <div class="component">
    <i class="fas fa-list-ul"></i>
    <span class="cc" name="component">HW</span
    ><span class="ar">20/30%</span>
  </div>

  <div class="component">
    <i class="fas fa-list-ul"></i>
    <span class="cc" name="component">Labs</span
    ><span class="ar">20/30%</span>
  </div>

  <div class="component ">
    <i class="fas fa-check-square"></i>
    <span class="cc" name="component">Midterm</span
    ><span class="ar">40/50%</span>
  </div>

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
</div>
<div class="total-container">
  <hr class="linebreak" />
  <div class="total">Total <span class="ar">79/100%</span></div>
</div>

<div class="bor">
  <button title="save" class="course-naked">&#xf0c7;</button>
  &nbsp;
  <button title="delete" class="course-naked">&#xf00d;</button>
</div>
</div>
`;
function generate(store, numClasses) {
  colors = getColors(numClasses);
  let count = 0;
  print(store);
  for (let component of Object.keys(store)) {
    print(component);
    let tmp = `<div class="course ${alph(count)}">${component}</div>`;
    tmp = create(tmp);
    classContainer.appendChild(tmp);
    editCSS(`.${alph(count)}.course{background-color: ${colors[count]};}`);
    count++;
  }
}

function createParent() {}

function createComponents() {}

function createAdder() {}

function createTota() {}

function createSanD() {}
