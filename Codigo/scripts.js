class Validator {
  constructor() {
    this.validations = [
      "data-required",
      "data-min-length",
      "data-max-length",
      "data-email-validate",
      "data-only-letters",
      "data-equal",
      "data-password-validate",
    ];
  }
  //início da validação em todos os campos
  validate(form) {
    //resgata todas as validações
    let currentValidations = document.querySelectorAll(
      "form .error-validation"
    );

    if (currentValidations.length > 0) {
      this.cleanValidations(currentValidations);
    }
    //forma de pegar todos os inputs
    let inputs = form.getElementsByTagName("input");

    //tranformação de HTMLCollection em array
    let inputsArray = [...inputs];

    //loop nos inputs e validação ao que for encontrado
    inputsArray.forEach(function (input) {
      //loop em todas as validações existentes
      for (let i = 0; this.validations.length > i; i++) {
        //verifica a validação
        if (input.getAttribute(this.validations[i]) != null) {
          //tranformando string em método
          let method = this.validations[i]
            .replace("data-", "")
            .replace("-", "");

          //valor do input
          let value = input.getAttribute(this.validations[i]);

          //chamar o método
          this[method](input, value);
        }
      }
    }, this);
  }

  //verifica se um input tem número mínimo de caracteres
  minlength(input, minValue) {
    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter no mínimo ${minValue} caracteres`;
    if (inputLength < minValue) {
      this.printMessage(input, errorMessage);
    }
  }

  //verifica o limite de caracteres
  maxlength(input, maxValue) {
    let inputLength = input.value.length;

    let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;
    if (inputLength > maxValue) {
      this.printMessage(input, errorMessage);
    }
  }

  //método que verifica e-mails
  emailvalidate(input) {
    let re = /\S+@\S+\.\S/;
    let email = input.value;
    let errorMessage = `Insira um e-mail válido`;
    if (!re.test(email)) {
      this.printMessage(input, errorMessage);
    }
  }

  //verifica se no campo só existem letras
  onlyletters(input) {
    let re = /^[A-Za-z]+$/;
    let inputValue = input.value;
    let errorMessage = `Este campo deve ser preenchido apenas com letras`;
    if (!re.test(inputValue)) {
      this.printMessage(input, errorMessage);
    }
  }

  //verifica se a senha é igual

  equal(input, inputName) {
    let inputToCompare = document.getElementsByName(inputName)[0];
    let errorMessage = `Este campo precisa ser igual ao ${inputName}`;
    if (input.value != inputToCompare.value) {
      this.printMessage(input, errorMessage);
    }
  }

  //verifica a senha
  passwordvalidate(input) {
    //tranformar a string em um array;
    let charArr = input.value.split("");
    let uppercases = 0;
    let numbers = 0;
    for (let i = 0; i < charArr.length; i++) {
      if (
        charArr[i] === charArr[i].toUpperCase() &&
        isNaN(parseInt(charArr[i]))
      ) {
        uppercases++;
      } else if (!isNaN(parseInt(charArr[i]))) {
        numbers++;
      }
    }
    if (uppercases === 0 || numbers === 0) {
      let errorMessage = `A senha deve conter pelo menos uma letra maiúscula e um número`;
      this.printMessage(input, errorMessage);
    }
  }

  //método para imprimir mensagens de erro
  printMessage(input, msg) {
    //quantidade de erros
    let errosQty = input.parentNode.querySelector(".error-validation");

    if (errosQty === null) {
      let template = document
        .querySelector(".error-validation")
        .cloneNode(true);

      template.textContent = msg;

      let inputParent = input.parentNode;

      template.classList.remove("template");

      inputParent.appendChild(template);
    }
  }

  //verifica se o input é requirido
  required(input) {
    let inputValue = input.value;
    if (inputValue === "") {
      let errorMessage = `Este campo é obrigatório`;
      this.printMessage(input, errorMessage);
    }
  }

  //limpa as validações da tela
  cleanValidations(validations) {
    validations.forEach((el) => el.remove());
  }
}
let form = document.getElementById("register-form");


let validator = new Validator();
form.addEventListener("submit", function (evento) {
  validator.validate(form);
  let inputs = document.querySelectorAll('input')
  for(let i = 0; i < inputs.length - 3; i++){
    localStorage.setItem(inputs[i].name, inputs[i].value)
  } 
});

