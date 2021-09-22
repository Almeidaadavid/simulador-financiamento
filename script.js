let valorFinan = document.getElementById("valorFinanciamento");
let prazoAnos = document.getElementById("anosFinanciamento");
let jurosAnual = document.getElementById("jurosAnual");
let botao = document.getElementById("botao");
let mes = document.getElementById("prazoMeses");
let jurosMensal = document.getElementById("jurosMensal");
let jurosAcumulado = document.getElementById("jurosAcumulado");
let rows = document.getElementById("rows");

botao.onclick = () => {
  jurosMensal.value = calcularJurosMensal(jurosAnual.valueAsNumber);
  mes.value = calcularMes(prazoAnos.valueAsNumber);

  const amortizacao = calcularAmortizacao(valorFinan.valueAsNumber, mes.valueAsNumber);
  jurosAcumulado.value = calcularJurosAcumulado(amortizacao, valorFinan.valueAsNumber, mes.valueAsNumber,jurosMensal.valueAsNumber)
  addData(amortizacao, valorFinan.valueAsNumber);
};

function calcularJurosMensal(jurosAnual) {
  return ((1 + jurosAnual) ** (1 / 12) - 1).toFixed(15);
}

function calcularMes(prazoAno) {
  return prazoAno * 12;
}

function calcularAmortizacao(valorFinan,mes) {
    return (valorFinan / mes).toFixed(2);
}

function calcularJurosAcumulado(amortizacao, valorFinan, mes, jurosMensal) {
    let jurosTotal = 0;
  for (i = 0; i < mes; i++) {
    jurosTotal += (valorFinan - i * amortizacao) * jurosMensal;
  }
  return jurosTotal.toFixed(2);
}
// Tabela;

function addData(amortizacao, valorFinan) {
  rows.innerHTML = "";
  for (i = 0; i < 5; i++) {
    var newRow = document.createElement("tr");
    addRow(newRow, i + 1);
    addRow(newRow, amortizacao);
    const juros = (
      (valorFinan - i * amortizacao) *
      jurosMensal.valueAsNumber
    ).toFixed(2);
    addRow(newRow, juros);
    const total = parseFloat(amortizacao) + parseFloat(juros);
    addRow(newRow, total);
    rows.appendChild(newRow);
  }
}

function addRow(newRow, valor) {
  var newCell = document.createElement("td");
  newCell.innerHTML = valor;
  newRow.append(newCell);
}
