document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const idadeInput = form.querySelector('input[placeholder="Insira sua idade..."]');
  const glicoseInput = form.querySelector('input[placeholder="Insira o nível médio..."]');
  const imcInput = form.querySelector('input[placeholder="Insira o seu IMC..."]');
  const alturaInput = document.createElement('input');
  const pesoInput = document.createElement('input');
  const btnCalcularIMC = document.getElementById('btnCalcularIMC');
  const imcExtras = document.getElementById('imcExtras');

  alturaInput.type = 'number';
  alturaInput.placeholder = 'Altura em metros (ex.: 1.75)';
  alturaInput.step = '0.01';
  alturaInput.required = true;

  pesoInput.type = 'number';
  pesoInput.placeholder = 'Peso em kg';
  pesoInput.step = '0.1';
  pesoInput.required = true;

  const validateNonNegative = (input) => {
      if (input.value < 0) {
          input.value = '';
          alert('Por favor, insira um valor não negativo.');
      }
  };

  idadeInput.addEventListener('blur', () => validateNonNegative(idadeInput));
  glicoseInput.addEventListener('blur', () => validateNonNegative(glicoseInput));
  imcInput.addEventListener('blur', () => validateNonNegative(imcInput));

  btnCalcularIMC.addEventListener('click', (e) => {
      e.preventDefault();
      if (!imcExtras.contains(alturaInput)) {
          imcExtras.appendChild(alturaInput);
      }
      if (!imcExtras.contains(pesoInput)) {
          imcExtras.appendChild(pesoInput);
      }

      const calcularBtn = document.createElement('button');
      calcularBtn.textContent = 'Calcular IMC';
      calcularBtn.type = 'button';
      calcularBtn.style.marginTop = '1rem';
      if (!imcExtras.querySelector('button[type="button"]')) {
          imcExtras.appendChild(calcularBtn);
      }

      calcularBtn.addEventListener('click', () => {
          const altura = parseFloat(alturaInput.value);
          const peso = parseFloat(pesoInput.value);

          if (altura <= 0 || peso <= 0) {
              alert('Por favor, insira valores positivos para peso e altura.');
              return;
          }

          const imc = (peso / (altura * altura)).toFixed(2);
          imcInput.value = imc;
      });
  });
});
