let quizData;
const jsonUrl = "https://raw.githubusercontent.com/1marcomachado/teste/refs/heads/main/jsonformatter.json?v=1";

fetch(jsonUrl)
  .then(res => res.json())
  .then(data => {
    quizData = data;
  })
  .catch(erro => console.error("Erro ao carregar JSON externo:", erro));
function normalizar(txt) {
  return txt.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase().trim();
}

const titulosPorTipo = {
"fashion": {
"família": "Qual o tipo de produto fashion?",
"categoria": "Qual a categoria fashion?",
"marca": "Marca fashion preferida?",
"tamanho": "Escolhe o tamanho fashion",
"orçamento": "Qual o teu orçamento fashion?"
},
"desporto": {
"família": "Que tipo de artigo desportivo?",
"categoria": "Categoria desportiva?",
"marca": "Marca desportiva preferida?",
"tamanho": "Tamanho ideal para desporto?",
"orçamento": "Quanto queres gastar?"
}
};
const steps = ["fam\u00edlia", "categoria", "marca", "tamanho", "or\u00e7amento"];
let tipoMae = "";
let currentStep = 0;
let history = [];

function renderStep() {
  const container = $("#question-container");
  container.empty();
  const step = steps[currentStep];
  const anteriores = history.map(h => h.value);

  const opcoes = [...new Set(quizData[tipoMae]
    .filter(p => anteriores.every((val, i) => p[steps[i]] && normalizar(p[steps[i]]) === normalizar(val)))
    .map(p => p[step])
  )].filter(o => o && o.toLowerCase() !== "nan");

  const titulo = titulosPorTipo[tipoMae]?.[step] || step.toUpperCase();
  container.append(`<h2>${titulo}</h2><div class='options'></div>`);
  const optionsDiv = container.find(".options");
  opcoes.forEach(opt => {
    optionsDiv.append(`<button class="option" onclick="selectOption('${step}', \`${opt}\`)">${opt}</button>`);
  });
  renderHistory();
  $("#custom-back").css("display", "block");
}

function selectOption(step, value) {
  history.push({ step, value });
  currentStep++;
  if (currentStep < steps.length) {
    renderStep();
  } else {
    const resultado = quizData[tipoMae].find(p =>
      steps.every((s, i) => normalizar(p[s]) === normalizar(history[i].value))
    );
    if (resultado && resultado.link) {
      window.location.href = resultado.link;
    } else {
      alert("Link de redirecionamento não encontrado.");
    }
  }
}

function renderHistory() {
  const bar = $("#history-bar");
  bar.empty();
  history.forEach((h, index) => {
    const tag = $(`<div class="history-tag">${h.value} <button onclick="removeHistory(${index})">&times;</button></div>`);
    bar.append(tag);
  });
}

function removeHistory(index) {
  history = history.slice(0, index);
  currentStep = index;
  renderStep();
}

function goBack() {
  if (history.length > 0) {
    history.pop();
    currentStep--;
    renderStep();
  }else{
    location.reload();
  }
}

$(document).ready(function () {
  $(".segmento[data-tipo]").on("click", function () {
    tipoMae = $(this).data("tipo");
    history = [];
    currentStep = 0;
    renderStep();
  });
});
