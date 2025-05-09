const inputsDiv = document.getElementById('inputs');
const shapeSelect = document.getElementById('shape');
const shapeImage = document.getElementById('shape-image');

const shapeInputs = {
  cube: ['Side Length'],
  sphere: ['Radius'],
  cylinder: ['Radius', 'Height'],
  cone: ['Radius', 'Slant Height'],
  rectangularPrism: ['Length', 'Width', 'Height'],
  pyramid: ['Base Length', 'Slant Height']
};

const shapeImages = {
  cube: 'images/cube.png',
  sphere: 'images/sphere.png',
  cylinder: 'images/cylinder.png',
  cone: 'images/cone.png',
  rectangularPrism: 'images/rectangular_prism.png',
  pyramid: 'images/pyramid.png'
};

shapeSelect.addEventListener('change', updateInputs);
updateInputs();

function updateInputs() {
  const shape = shapeSelect.value;
  inputsDiv.innerHTML = '';
  shapeImage.style.display = 'none';

  shapeInputs[shape].forEach(label => {
    const input = document.createElement('input');
    input.type = 'number';
    input.placeholder = label;
    input.id = label.replace(/ /g, '').toLowerCase();
    inputsDiv.appendChild(input);
  });

  shapeImage.src = shapeImages[shape];
  shapeImage.style.display = 'block';
}

function calculateArea() {
  const shape = shapeSelect.value;
  const getValue = id => parseFloat(document.getElementById(id).value);
  let area = 0;

  switch (shape) {
    case 'cube':
      let s = getValue('sidelength');
      area = 6 * s * s;
      break;
    case 'sphere':
      let r = getValue('radius');
      area = 4 * Math.PI * r * r;
      break;
    case 'cylinder':
      let rC = getValue('radius');
      let hC = getValue('height');
      area = 2 * Math.PI * rC * (rC + hC);
      break;
    case 'cone':
      let rCo = getValue('radius');
      let lCo = getValue('slantheight');
      area = Math.PI * rCo * (rCo + lCo);
      break;
    case 'rectangularPrism':
      let l = getValue('length');
      let w = getValue('width');
      let h = getValue('height');
      area = 2 * (l*w + w*h + h*l);
      break;
    case 'pyramid':
      let base = getValue('baselength');
      let slant = getValue('slantheight');
      area = base * base + 2 * base * slant;
      break;
  }

  document.getElementById('result').textContent = `Surface Area of ${shape.charAt(0).toUpperCase() + shape.slice(1)}: ${area.toFixed(2)}`;
}
