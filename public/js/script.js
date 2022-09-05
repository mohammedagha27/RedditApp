const loginForm = document.querySelector("form#login");
const signupForm = document.querySelector("form#signup");
const headerMenu = document.querySelector("header .menu-options");
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
const shiftAuthPopup = (e) => {
  e.preventDefault();
  loginPop.classList.toggle("active");
  signUpPop.classList.toggle("active");
};

fetch("/getLoggedUserData")
  .then((data) => data.json())
  .then((data) => {
    if (!data.msg) {
      headerMenu.textContent = "";
      headerMenu.innerHTML = `<div class="menu" id="loggedUser">
      <div class="loggedUser-actions">
          <i class="fa-regular fa-share-from-square"></i>
          <i class="fa-regular fa-comment"></i>
          <i class="fa-regular fa-bell"></i>
          <i class="fa-solid fa-plus"></i>
      </div>
      <div class="btns">
          <button id="advertise"><i class="fa-solid fa-rectangle-ad"></i> Advertise</button>
          <button id="shop-avatars">Shop Avatars</button>
      </div>
      <div class="menu-items">
          <div class="user-img">
              <img src="https://styles.redditmedia.com/t5_6zhglp/styles/profileIcon_snoo373b8fef-17fa-474c-882d-15f53e5ae3bd-headshot.png?width=256&height=256&crop=256:256,smart&s=8abaf96ecfbe41bdedf9b5a641c4bc79824cfa9c"
                  alt="">
          </div>
          <div class="user-data">
              <span class="user_name">mohammed_agha27</span>
              <span class="karma"><i class="fa-solid fa-dharmachakra"></i> 1 karma</span>
          </div>
          <i class="fa-solid fa-angle-down"></i>
      </div>
  </div>`;
    }
  });
