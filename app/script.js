document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#avcForm");
  const idadeInput = document.querySelector("#idade");
  const hipertensaoSelect = document.querySelector("#hipertensao");
  const doencaCardiacaSelect = document.querySelector("#doenca-cardiaca");
  const glicoseInput = document.getElementById("nivelGlicose");
  const imcInput = document.querySelector("#imc");
  const fumoSelect = document.querySelector("#fumo");
  const avcSelect = document.querySelector("#avc");
  const resultadoGlicose = document.getElementById("resultadoGlicose");
  const alturaInput = document.getElementById("altura");
  const pesoInput = document.getElementById("peso");
  const btnCalcularIMC = document.getElementById("btnCalcularIMC");
  const resultadoIMC = document.getElementById("resultadoIMC");
  const resultadoFumo = document.getElementById("resultadoFumo");

  let bmiCat;
  let nivelGlicose;
  let nivelFumo;

  if (!form) {
    console.error("Formulário não encontrado.");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    try {
      const healthData = {
        idade: parseInt(idadeInput.value),
        possui_hipertensao: hipertensaoSelect.value,
        possui_doenca_cardiaca: doencaCardiacaSelect.value,
        nivel_glicose: nivelGlicose,
        imc: bmiCat,
        fumo: nivelFumo,
        teve_avc: avcSelect.value,
      };

      console.log(healthData);

      fetch("http://127.0.0.1:8000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(healthData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao enviar os dados");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Dados enviados com sucesso:", data);
          alert("Dados enviados com sucesso!");
          form.reset();
        })
        .catch((error) => {
          console.error("Erro ao enviar os dados:", error);
          alert("Ocorreu um erro ao enviar os dados. Tente novamente.");
        });
    } catch (error) {
      console.error("Erro ao processar os dados do formulário:", error);
      alert("Verifique os campos do formulário e tente novamente.");
    }
  });

  glicoseInput.addEventListener("input", () => {
    const glicose = parseFloat(glicoseInput.value);
    if (isNaN(glicose)) {
      resultadoGlicose.textContent = "";
      return;
    }
    if (glicose < 100) {
      resultadoGlicose.textContent = "Normal";
      resultadoGlicose.style.color = "green";
      nivelGlicose = 1;
    } else if (glicose >= 100 && glicose < 126) {
      resultadoGlicose.textContent = "Pré-diabetes";
      resultadoGlicose.style.color = "orange";
      nivelGlicose = 2;
    } else {
      resultadoGlicose.textContent = "Diabetes";
      resultadoGlicose.style.color = "red";
      nivelGlicose = 3;
    }
  });

  btnCalcularIMC.addEventListener("click", () => {
    const altura = parseFloat(alturaInput.value);
    const peso = parseFloat(pesoInput.value);

    if (altura <= 0 || peso <= 0 || isNaN(altura) || isNaN(peso)) {
      resultadoIMC.textContent = "Insira valores válidos para peso e altura.";
      resultadoIMC.style.color = "red";
      return;
    }

    const imc = (peso / (altura * altura)).toFixed(2);
    let faixaIMC = "";

    if (imc < 18.5) {
      faixaIMC = "Abaixo do peso";
      bmiCat = 1;
      resultadoIMC.style.color = "blue";
    } else if (imc >= 18.5 && imc < 25) {
      faixaIMC = "Peso normal";
      bmiCat = 2;
      resultadoIMC.style.color = "green";
    } else if (imc >= 25 && imc < 30) {
      faixaIMC = "Sobrepeso";
      bmiCat = 3;
      resultadoIMC.style.color = "orange";
    } else {
      faixaIMC = "Obesidade";
      bmiCat = 4;
      resultadoIMC.style.color = "red";
    }

    resultadoIMC.textContent = `${imc} (${faixaIMC})`;
  });

  fumoSelect.addEventListener("change", () => {
    const fumoValue = fumoSelect.value;

    switch (fumoValue) {
      case "fumava-anteriormente":
        nivelFumo = 1;
        break;
      case "nunca-fumou":
        nivelFumo = 2;
        break;
      case "fuma-atualmente":
        nivelFumo = 3;
        break;
      default:
        break;
    }
  });
});
