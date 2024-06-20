const toast = document.querySelector(".toast");
const formElement = document.querySelector("form");
const formGroups = document.querySelectorAll(".form_control");
const radioDivs = document.querySelectorAll(".query_type");
let formValid = true;

formElement.setAttribute("novalidate", "");

const changeRadioBg = () => {
  radioDivs.forEach((radioDiv) => {
    const radio = radioDiv.querySelector("input");
    if (radio.checked) {
      radioDiv.classList.add("radio-selected");
    } else {
      radioDiv.classList.remove("radio-selected");
    }
  });
};

const displayError = (formGroup, error) => {
  const errorMessage = formGroup.querySelector(error);
  errorMessage.classList.remove("hidden");
};

const removeError = (formGroup) => {
  const errorMessage = formGroup.querySelectorAll(".error");
  errorMessage.forEach((error) => {
    error.classList.add("hidden");
  });
};

const validateGroup = (formGroup) => {
  const inputType = formGroup.querySelector("input, textarea").type || text;

  switch (inputType) {
    case "radio":
      let checked = false;
      const radioInputs = formGroup.querySelectorAll("input");

      radioInputs.forEach((input) => {
        if (input.checked) {
          checked = true;
        }
      });
      if (!checked) {
        displayError(formGroup, ".error");
        formValid = false;
      }
      break;
    case "checkbox":
      const checkboxInput = formGroup.querySelector("input");
      if (!checkboxInput.checked) {
        displayError(formGroup, ".error");
        formValid = false;
      }
      break;
    case "text":
      const textInput = formGroup.querySelector("input");
      if (textInput.value.trim() === "") {
        displayError(formGroup, ".error");
        formValid = false;
      }
      break;
    case "textarea":
      const textareaInput = formGroup.querySelector("textarea");
      if (textareaInput.value.trim() === "") {
        displayError(formGroup, ".error");
        formValid = false;
      }
      break;
    case "email":
      const emailInput = formGroup.querySelector("input");
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (emailInput.value.trim() === "") {
        displayError(formGroup, ".error");
        formValid = false;
      } else if (!emailPattern.test(emailInput.value)) {
        displayError(formGroup, ".error");
        formValid = false;
      }
      break;
    default:
      break;
  }
};

const displayToast = () => {
  setTimeout(() => {
    toast.classList.remove("hidden");
  }, 10);

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 4000);
};

// Event listeners

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("showToast") === "true") {
    displayToast();
    localStorage.removeItem("showToast");
  }
});

radioDivs.forEach((radioDiv) => {
  radioDiv.addEventListener("click", () => {
    const radioInputs = radioDiv.querySelector("input");
    radioInputs.checked = true;
    changeRadioBg();
    removeError(radioDiv.parentElement.parentElement);
  });
});

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  formGroups.forEach((formGroup) => {
    validateGroup(formGroup);
  });
  if (formValid) {
    localStorage.setItem("showToast", "true");
    formElement.submit();
  }
});

formGroups.forEach((formGroup) => {
  const inputs = formGroup.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("click", () => {
      removeError(formGroup);
    });
    input.addEventListener("blur", () => {
      removeError(formGroup);
    });
  });
});

toast.addEventListener("click", () => {
  toast.classList.add("hidden");
});
