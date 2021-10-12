const BILL = document.querySelector("#inputbill");
const PERSON = document.querySelector("#inputperson");
const TIP_RATES = document.querySelectorAll(".p-button");
const TIP_CUSTOM = document.querySelector("#p-custom");
const PERSON_ERR_MSG = document.querySelector("#people-err-msg");
const D_AMOUNT = document.querySelector("#result-amount");
const D_TOTAL = document.querySelector("#result-total");
const RESET = document.querySelector("#reset");

let bill = 0;
let tipRate = 0;
let person = 0;
let tipAmount = 0;
let total = 0;

BILL.addEventListener("input", (e) => {
  bill = parseFloat(e.target.value) || 0;
  calculate();
});

TIP_RATES.forEach((percentTip) => {
  percentTip.addEventListener("click", (e) => {
    deselectTipRate();
    tipRate = parseFloat(e.target.dataset.value) || 0;
    percentTip.classList.remove("p-button-normal");
    percentTip.classList.add("p-button-selected");
    TIP_CUSTOM.value = "";
    calculate();
  });
});

TIP_CUSTOM.addEventListener("input", (e) => {
  deselectTipRate();
  tipRate = parseFloat(e.target.value) || 0;
  calculate();
});

PERSON.addEventListener("input", (e) => {
  person = parseFloat(e.target.value) || 0;
  calculate();
});

RESET.addEventListener("click", (e) => {
  BILL.value = "";
  deselectTipRate();
  TIP_CUSTOM.value = "";
  PERSON.value = "";
  resetButtonDisabler();
});

const checkNumberOfPeople = () => {
  if (!person) {
    PERSON_ERR_MSG.style.display = "block";
    PERSON.classList.add("invalid-input");
    return false;
  } else {
    PERSON_ERR_MSG.style.display = "none";
    PERSON.classList.remove("invalid-input");
    return true;
  }
};

const deselectTipRate = () => {
  TIP_RATES.forEach((percentTip) => {
    if (percentTip.classList.contains("p-button-selected")) {
      percentTip.classList.remove("p-button-selected");
      percentTip.classList.add("p-button-normal");
    }
  });
};

const resetButtonEnabler = () => {
  if (!RESET.classList.contains("reset-button-normal"))
    RESET.classList.toggle("reset-button-normal");
};
const resetButtonDisabler = () => {
  if (RESET.classList.contains("reset-button-normal"))
    RESET.classList.toggle("reset-button-normal");
};

const calculate = () => {
  if (!(bill && tipRate && checkNumberOfPeople())) return;
  tipAmount = (bill * (tipRate / 100)) / person;
  D_AMOUNT.innerHTML = tipAmount.toFixed(2);
  total = tipAmount + bill / person;
  D_TOTAL.innerHTML = total.toFixed(2);
  resetButtonEnabler();
};
