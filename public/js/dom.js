const headerMenu = document.querySelector("header .menu-options");

const showElement = (ele) => {
  ele.classList.add("active");
};
const hideElement = (ele) => {
  ele.classList.remove("active");
};

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
          <img style="width:35px; hight:35px;border-radius:50%;" src="${
            data.img_url ||
            `https://ui-avatars.com/api/?name=${data.username}&background=random`
          }"
          alt="">
          </div>
          <div class="user-data">
          <span class="user_name">${data.username}</span>
          <span class="karma"><i class="fa-solid fa-dharmachakra"></i> 1 karma</span>
          </div>
          <i class="fa-solid fa-angle-down" id="show-menu"></i>
          <div class="logout-menu">
          <a href="/profile">Profile</a>
          <a href="/logout">Logout</a>
          </div>
          </div>
          </div>`;
};

//? check if the user logged in to show the suitable header
fetch("/getLoggedUserData")
  .then((data) => data.json())
  .then((data) => {
    if (!data.msg) {
      shiftHederMenu(data);
      if (!window.location.pathname.includes("/profile")) {
        hideElement(trendingPosts);
        showElement(addPostHeader);
      }
    } else {
      showElement(trendingPosts);
    }
  })
  .then((data) => {
    let arrow = document.querySelector(".menu-items");
    let logoutMenu = document.querySelector(".logout-menu");
    arrow.addEventListener("click", (e) => {
      logoutMenu.classList.toggle("active");
    });
  });
