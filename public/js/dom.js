const loginForm = document.querySelector("form#login");
const signupForm = document.querySelector("form#signup");
const headerMenu = document.querySelector("header .menu-options");
const pPostsContainer = document.querySelector(".p-posts");

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

//? receive errors and show it below its input
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

//? shift popups from signup pop => login pop or the opposite
const shiftAuthPopup = (e) => {
  e.preventDefault();
  loginPop.classList.toggle("active");
  signUpPop.classList.toggle("active");
};

//? check if the user logged in to show the suitable header
fetch("/getLoggedUserData")
  .then((data) => data.json())
  .then((data) => {
    if (!data.msg) {
      shiftHederMenu(data);
    }
  })
  .then((data) => {
    let arrow = document.querySelector(".menu-items");
    let logoutMenu = document.querySelector(".logout-menu");
    arrow.addEventListener("click", (e) => {
      logoutMenu.classList.toggle("active");
    });
  });

//? take user data and show its name and img in the header
const shiftHederMenu = (data) => {
  headerMenu.textContent = "";
  headerMenu.innerHTML = `
      <div class="menu" id="loggedUser">
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
          <img src="${
            data.img_url ||
            "https://styles.redditmedia.com/t5_6zhglp/styles/profileIcon_snoo373b8fef-17fa-474c-882d-15f53e5ae3bd-headshot.png?width=256&height=256&crop=256:256,smart&s=8abaf96ecfbe41bdedf9b5a641c4bc79824cfa9c"
          }"
                  alt="">
          </div>
          <div class="user-data">
              <span class="user_name">${data.username}</span>
              <span class="karma"><i class="fa-solid fa-dharmachakra"></i> 1 karma</span>
              </div>
          <i class="fa-solid fa-angle-down" id="show-menu"></i>
          <div class="logout-menu">
              <a href="/logout">Logout</a>
          </div>
          </div>
          </div>`;
};

const createNode = (tagName, classN) => {
  let node = document.createElement(tagName);
  node.className = classN;
  return node;
};

const generatePosts = (posts) => {
  console.log(posts);
  pPostsContainer.textContent = "";
  posts.forEach((post) => {
    pPostsContainer.innerHTML += `<div class="p-post">
    <div class="join">Join</div>
    <div class="score">
        <!-- <i class="fa-solid fa-circle-up"></i> -->
        <i class="fa-regular fa-circle-up"></i>
        ${post.votes_sum > 0 ? post.votes_sum : 0}
        <!-- <i class="fa-solid fa-circle-down"></i> -->
        <i class="fa-regular fa-circle-down"></i>
    </div>
    <div class="post-content">
        <div class="p-post-header">
            <span class="post-owner"><img
                    src="${post.user_img}"
                    alt=""> ${post.user_name}</span>
            <span class="post-date">posted ${moment(post.posted_at).fromNow()}</span>
        </div>
        <div class="p-post-content">
            <p>${post.content}</p>
        </div>
        <div class="p-post-footer">
            <div class="p-comments"><i class="fa-regular fa-comment"></i>
                <span>0 </span>comments
            </div>
            <div class="p-share"><i class="fa-solid fa-share"></i> Share</div>
            <div class="p-save"><i class="fa-regular fa-bookmark"></i> Save</div>
        </div>
    </div>
</div>`;
  });
};

fetch("/posts")
  .then((data) => data.json())
  .then((data) => generatePosts(data));