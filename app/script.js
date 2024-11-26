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

// form.addEventListener('submit', (e) => {
//     e.preventDefault(); // Previne o comportamento padrão de recarregar a página

//     // Coleta os valores do formulário
//     const healthData = {
//         idade: parseInt(idadeInput.value, 10),
//         possui_hipertensao: form.querySelector('input[name="possui_hipertensao"]:checked').value === 'true',
//         possui_doenca_cardiaca: form.querySelector('input[name="possui_doenca_cardiaca"]:checked').value === 'true',
//         nivel_glicose: parseFloat(glicoseInput.value),
//         imc: parseFloat(imcInput.value),
//         altura: parseFloat(alturaInput.value),
//         peso: parseFloat(pesoInput.value),
//         fuma: form.querySelector('input[name="fuma"]:checked').value === 'true',
//         teve_avc: form.querySelector('input[name="teve_avc"]:checked').value === 'true'
//     };

//     // Faz a requisição para o backend
//     fetch('http://127.0.0.1:8000/api/health-data', { // Use a URL correta do backend
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(healthData)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Erro ao enviar os dados');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Dados enviados com sucesso:', data);
//         alert('Dados enviados com sucesso!');
//         form.reset(); // Reseta o formulário após o envio
//     })
//     .catch(error => {
//         console.error('Erro ao enviar os dados:', error);
//         alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
//     });
// });
