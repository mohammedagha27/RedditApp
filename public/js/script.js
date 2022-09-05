const loginForm = document.querySelector("form#login");
const signupForm = document.querySelector("form#signup");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("/signup", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getFormInputs(e.target)),
  })
    .then((data) => data.json())
    .then((res) => {
      if (res.success) {
        window.location.href = "/";
      } else {
        handleErrors(res, "signup");
      }
    });
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getFormInputs(e.target)),
  })
    .then((data) => data.json())
    .then((res) => {
      if (res.success) {
        window.location.href = "/";
      } else {
        handleErrors(res, "login");
      }
    });
});

//? receive a form and return an object contain all the form inputs and its value
const getFormInputs = (form) => {
  let inputs = form.querySelectorAll("input");
  let data = {};
  inputs.forEach((input) => {
    data[input.name] = input.value;
  });
  return data;
};

const handleErrors = (errors, type) => {
  let spans = document.querySelectorAll(`form#${type} .input-box span`);
  let inputs = document.querySelectorAll(`form#${type} .input-box input`);

  //* delete the old errors
  spans.forEach((s) => {
    s.textContent = "";
  });
  inputs.forEach((input) => {
    input.classList.remove("danger");
  });

  //* add new errors to the dom
  errors.forEach((err) => {
    let input = document.querySelector(
      `form#${type} .input-box input[name='${err.path[0]}']`
    );
    let span = input.parentElement.querySelector("span");
    input.classList.add("danger");
    span.textContent = err.message;
  });
};
