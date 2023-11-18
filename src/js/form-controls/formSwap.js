const btnToRegister = document.querySelector("#buttonSwapToRegister");
const btnToLogin = document.querySelector("#buttonSwapToLogin");
const registerContainer = document.querySelector("#registerContainer");
const loginContainer = document.querySelector("#loginContainer");
const logoText = document.querySelector("#logoTextAuthPage");

btnToRegister.addEventListener("click", () => {
  if (!loginContainer.classList.contains("slide-out-to-left")) {
    loginContainer.classList.add("slide-out-to-left");

    setTimeout(() => {
      loginContainer.classList.add("d-none");
      loginContainer.classList.remove("slide-out-to-left");

      registerContainer.classList.remove("d-none");
      if (!registerContainer.classList.contains("slide-to-center")) {
        registerContainer.classList.add("slide-to-center");
      }
    }, 500);
    logoText.textContent = "Register an account";
  }
});

btnToLogin.addEventListener("click", () => {
  if (!registerContainer.classList.contains("slide-out-to-right")) {
    registerContainer.classList.remove("slide-to-center");
    registerContainer.classList.add("slide-out-to-right");

    setTimeout(() => {
      registerContainer.classList.add("d-none");
      registerContainer.classList.remove("slide-out-to-right");

      loginContainer.classList.remove("d-none");
      if (!loginContainer.classList.contains("slide-to-center")) {
        loginContainer.classList.add("slide-to-center");
      }
    }, 500);
    logoText.textContent = "The prefered auction site";
  }
});
