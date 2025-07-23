// IMC DATA
const data = [
  {
    min: 0,
    max: 18.4,
    classification: "Menor que 18,5",
    info: "Magreza",
    obesity: "0",
  },
  {
    min: 18.5,
    max: 24.9,
    classification: "Entre 18,5 e 24,9",
    info: "Normal",
    obesity: "0",
  },
  {
    min: 25,
    max: 29.9,
    classification: "Entre 25,0 e 29,9",
    info: "Sobrepeso",
    obesity: "I",
  },
  {
    min: 30,
    max: 39.9,
    classification: "Entre 30,0 e 39,9",
    info: "Obesidade",
    obesity: "II",
  },
  {
    min: 40,
    max: 99,
    classification: "Maior que 40,0",
    info: "Obesidade grave",
    obesity: "III",
  },
];

// Seleção de elementos
const imcTable = document.querySelector("#imc-table");

const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");

const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");

const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");

const backBtn = document.querySelector("#back-btn");

// Funções
function createTable(data) {
  data.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("table-data");

    const classification = document.createElement("p");
    classification.innerText = item.classification;

    const info = document.createElement("p");
    info.innerText = item.info;

    const obesity = document.createElement("p");
    obesity.innerText = item.obesity;

    div.appendChild(classification);
    div.appendChild(info);
    div.appendChild(obesity);

    imcTable.appendChild(div);
  });
}

function validDigits(text) {
  // Permite apenas números e uma única vírgula, e garante que a vírgula não seja o primeiro caractere
  return text.replace(/[^0-9,.]/g, "").replace(/(\,.*)\,/g, '$1').replace(/\.(?=.*\.)/g, '');
}

function calcImc(height, weight) {
  const imc = (weight / (height * height)).toFixed(1);
  return imc;
}

function cleanInputs() {
  heightInput.value = "";
  weightInput.value = "";
  // Remova todas as classes de cor ao limpar
  imcNumber.className = "";
  imcInfo.className = "";
}

function showOrHideResults() {
  calcContainer.classList.toggle("hide");
  resultContainer.classList.toggle("hide");
}

// Init
createTable(data);

// Eventos
[heightInput, weightInput].forEach((el) => {
  el.addEventListener("input", (e) => {
    const updatedValue = validDigits(e.target.value);
    e.target.value = updatedValue;
  });
});

calcBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Garante que a vírgula seja tratada como ponto decimal para o cálculo
  const weight = +weightInput.value.replace(",", ".");
  const height = +heightInput.value.replace(",", ".");

  // Adiciona uma mensagem de erro simples para o usuário se os campos estiverem vazios
  if (!weight || !height) {
    alert("Por favor, preencha a altura e o peso corretamente.");
    return;
  }

  const imc = calcImc(height, weight);
  let info; // Declarada com let, pois seu valor será reatribuído

  // Limpa classes de cor antigas antes de adicionar novas
  imcNumber.classList.remove("low", "good", "medium", "hght");
  imcInfo.classList.remove("low", "good", "medium", "hght");

  data.forEach((item) => {
    // Usar <= e >= para garantir que os limites sejam incluídos corretamente
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });

  if (!info) return; // Caso não encontre nenhuma classificação (o que não deve acontecer com a data atual)

  imcNumber.innerText = imc;
  imcInfo.innerText = info;

  switch (info) {
    case "Magreza":
      imcNumber.classList.add("low");
      imcInfo.classList.add("low");
      break;
    case "Normal":
      imcNumber.classList.add("good");
      imcInfo.classList.add("good");
      break;
    case "Sobrepeso":
      imcNumber.classList.add("low"); // Mantido 'low' conforme seu CSS e intenção
      imcInfo.classList.add("low");
      break;
    case "Obesidade":
      imcNumber.classList.add("medium");
      imcInfo.classList.add("medium");
      break;
    case "Obesidade grave":
      imcNumber.classList.add("hght"); // CORRIGIDO: de 'high' para 'hght' para corresponder ao CSS
      imcInfo.classList.add("hght"); // CORRIGIDO: de 'high' para 'hght' para corresponder ao CSS
      break;
  }

  showOrHideResults();
});

clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  cleanInputs();
});

backBtn.addEventListener("click", (e) => {
  cleanInputs();
  showOrHideResults();
});