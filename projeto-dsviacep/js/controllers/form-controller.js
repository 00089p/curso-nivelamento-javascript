import Address from "../models/address.js";
import * as addressService from "../services/address-service.js";
import * as listController from "./list-controller.js";

function State() {
  this.address = new Address();

  this.btnSave = null;
  this.btnClear = null;
  this.inputCep = null;
  this.inputStreet = null;
  this.inputNumber = null;
  this.inputCity = null;
}

const state = new State();

export function init() {
  state.inputCep = document.forms.newAddress.cep; 
  state.inputStreet = document.forms.newAddress.street; 
  state.inputNumber = document.forms.newAddress.number; 
  state.inputCity = document.forms.newAddress.city; 

  state.btnSave = document.querySelector('[data-elem="btnSave"]');
  state.btnClear = document.querySelector('[data-elem="btnClear"]');

  state.btnSave.addEventListener("click", handleBtnSaveClick);
  state.btnClear.addEventListener("click", handleBtnClearClick);
  state.inputCep.addEventListener("change", handleInputCepChange);
  state.inputNumber.addEventListener("keyup", handleInputNumberKeyup);

  console.log(document.forms.newAddress.elements);
  console.log(state.btnSave.dataset);
  console.log(state);
}

function handleBtnSaveClick(event) {
  event.preventDefault();
  try {
    addressService.validate(state.address);
    listController.addCard(state.address);
    clearForm();
  } catch (e) {
    window.alert(e);
  }
}

function handleInputNumberKeyup(event) {
    state.address.number = event.target.value;
}

async function handleInputCepChange(event) {
  const cep = event.target.value;

  try {
    const address = await addressService.findByCep(cep);
    setFormState(address);
    state.address = address;
    state.inputNumber.focus();
  } catch (e) {
    clearForm();
    window.alert("Favor digitar um CEP válido");
  }
}

function handleBtnClearClick(event) {
  event.preventDefault();
  clearForm();
}

function clearForm() {
  state.inputCep.value = "";
  state.inputStreet.value = "";
  state.inputNumber.value = "";
  state.inputCity.value = "";
  state.address = new Address();
  state.inputCep.focus();
}

function setFormState(address) {
  state.inputCep.value = address.cep;
  state.inputStreet.value = address.street;
  state.inputCity.value = address.city;
}
