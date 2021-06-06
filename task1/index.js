async function getCurrentExchangeRates() {
  const currentExchangeRatesDaily = await fetch(
    "https://www.nbrb.by/api/exrates/rates?periodicity=0"
  ).then((response) => response.json());

  const currentExchangeRatesMonthly = await fetch(
    "https://www.nbrb.by/api/exrates/rates?periodicity=1"
  ).then((response) => response.json());

  const tableHeader =
    "<thead><tr><th>Иностранная валюта (кол-во)</th><th>Иностранная валюта</th><th>Белорусский рубль (кол-во)</th></tr></thead>";

  let tableBody1 = currentExchangeRatesDaily.map((rate) => {
    return (
      "<tr><td>" +
      rate.Cur_Scale +
      "</td><td>" +
      rate.Cur_Name +
      "</td><td>" +
      rate.Cur_OfficialRate +
      "</td></tr>"
    );
  });

  let tableBody2 = currentExchangeRatesMonthly.map((rate) => {
    return (
      "<tr><td>" +
      rate.Cur_Scale +
      "</td><td>" +
      rate.Cur_Name +
      "</td><td>" +
      rate.Cur_OfficialRate +
      "</td></tr>"
    );
  });
  tableBody =
    "<tbody>" +
    tableBody1.join("") +
    tableBody2.join("") +
    "</tbody>";

  const target = document.querySelector("#target");
  target.insertAdjacentHTML("afterBegin", tableHeader);
  target.insertAdjacentHTML("beforeEnd", tableBody);
}

getCurrentExchangeRates();
