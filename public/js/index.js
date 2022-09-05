const searchInput = document.querySelector(
  "header .header-container .search form input"
);
const searchForm = document.querySelector(
  "header .header-container .search form"
);
const signUpBtn = document.querySelector(" .btns #signupBtn");
const signUpPop = document.querySelector(".signup-popup");
const signUpPopCloseBtn = document.querySelector(".signup-popup .signup-close");

const loginBtn = document.querySelector(" .btns #loginBtn");
const loginPop = document.querySelector(".login-popup");
const loginPopCloseBtn = document.querySelector(".login-popup .login-close");

searchInput.addEventListener("focus", (e) => {
  searchForm.style.borderColor = "var(--button)";
});
searchInput.addEventListener("focusout", (e) => {
  searchForm.style.borderColor = "var(--line)";
});

signUpBtn.addEventListener("click", (e) => {
  signUpPop.classList.add("active");
});
signUpPopCloseBtn.addEventListener("click", (e) => {
  signUpPop.classList.remove("active");
});
loginBtn.addEventListener("click", (e) => {
  loginPop.classList.add("active");
});
loginPopCloseBtn.addEventListener("click", (e) => {
  loginPop.classList.remove("active");
});
