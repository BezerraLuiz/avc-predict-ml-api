document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#avcForm');
    const idadeInput = document.querySelector('#idade');
    const hipertensaoSelect = document.querySelector('#hipertensao');
    const doencaCardiacaSelect = document.querySelector('#doenca-cardiaca');
    const glicoseInput = document.querySelector('#glicose');
    const imcInput = document.querySelector('#imc');
    const fumoSelect = document.querySelector('#fumo');
    const avcSelect = document.querySelector('#avc');
  
    if (!form) {
      console.error('Formulário não encontrado.');
      return;
    }
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      try {
        const healthData = {
          idade: parseInt(idadeInput.value),
          possui_hipertensao: hipertensaoSelect.value,
          possui_doenca_cardiaca: doencaCardiacaSelect.value,
          nivel_glicose: parseFloat(glicoseInput.value),
          imc: parseFloat(imcInput.value),
          fumo: fumoSelect.value,
          teve_avc: avcSelect.value,
        };

        console.log(healthData);
  
        fetch('http://127.0.0.1:8000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(healthData),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Erro ao enviar os dados');
            }
            return response.json();
          })
          .then((data) => {
            console.log('Dados enviados com sucesso:', data);
            alert('Dados enviados com sucesso!');
            form.reset();
          })
          .catch((error) => {
            console.error('Erro ao enviar os dados:', error);
            alert('Ocorreu um erro ao enviar os dados. Tente novamente.');
          });
      } catch (error) {
        console.error('Erro ao processar os dados do formulário:', error);
        alert('Verifique os campos do formulário e tente novamente.');
      }
    });
  });
  