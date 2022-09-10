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
const loginForm = document.querySelector("form#login");
const signupForm = document.querySelector("form#signup");
const pPostsContainer = document.querySelector(".p-posts");
const trendingPosts = document.querySelector(".main-container .trending");
const addPostHeader = document.querySelector(" div.p-header.add-post");
const addPostInput = document.querySelector(".p-header.add-post input");
const topUsersList = document.querySelector(".side-redditors ol");

//? receive a form and return an object contain all the form inputs and its value
const getFormInputs = (form) => {
  let inputs = form.querySelectorAll("input");
  let data = {};
  inputs.forEach((input) => {
    data[input.name] = input.value;
  });
  return data;
};

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

addPostInput.addEventListener("click", (e) => {
  window.location.href = "/profile";
});

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

const deletePost = (event, post_id) => {
  event.preventDefault();
  const post = event.target.parentElement.parentElement.parentElement;
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/post/${post_id}`, {
        method: "delete",
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.msg) {
            post.remove();
            Swal.fire("Deleted!", data.msg, "success");
          }
        });
    }
  });
};

const setArrowAction = (event, user) => {
  const arr = event.target;
  if (!user) {
    showElement(loginPop);
  } else {
    const arrType = arr.parentElement.classList[0];
    if (arrType === "up") {
      const score = arr.parentElement.parentElement.querySelector("span");
      const otherArr = arr.parentElement.parentElement.querySelector(".down i");
      const post_id = arr.parentElement.dataset.postid;
      if (otherArr.classList.contains("active")) {
        clearArrow(otherArr);
        riseScore(score);
      }
      if (arr.classList.contains("active")) {
        clearArrow(arr);
        fetch(`/vote/${post_id}`, {
          method: "delete",
        })
          .then((data) => data.json())
          .then(console.log);
        downScore(score);
      } else {
        riseScore(score);
        AddVote(1, post_id);
        setArrow(arr);
      }
    } else {
      const score = arr.parentElement.parentElement.querySelector("span");
      const otherArr = arr.parentElement.parentElement.querySelector(".up i");
      const post_id = arr.parentElement.dataset.postid;
      if (otherArr.classList.contains("active")) {
        clearArrow(otherArr);
        downScore(score);
      }
      if (arr.classList.contains("active")) {
        clearArrow(arr);
        fetch(`/vote/${post_id}`, {
          method: "delete",
        })
          .then((data) => data.json())
          .then(console.log);
        riseScore(score);
      } else {
        if (Number(score.innerText) > 0) {
          downScore(score);
          AddVote(-1, post_id);
          setArrow(arr);
        }
      }
    }
  }
};

//? handle the posts received from db
const generatePosts = (posts, user) => {
  pPostsContainer.textContent = "";
  posts.forEach((post) => {
    pPostsContainer.innerHTML += `
        <div class="p-post">
        <div class="join"> ${
          post.user_id === user?.id
            ? `<a href="/post/${post.id}" onclick="event.preventDefault()"><i class="fa-solid fa-trash" onclick="deletePost(event,${post.id})"></i></a>`
            : "<span>Join</span>"
        }</div>
        <div class="score" data-postId="${post.id}">
        <!-- <i class="fa-solid fa-circle-up"></i> -->
        <div class="up" onclick="setArrowAction(event,${
          user?.id
        })" data-postId="${
      post.id
    }"><i class="fa-regular fa-circle-up"></i></div>
            <span>${post.votes_sum > 0 ? post.votes_sum : 0}</span>
            <!-- <i class="fa-solid fa-circle-down"></i> -->
            <div class="down" onclick="setArrowAction(event,${
              user?.id
            })" data-postId="${
      post.id
    }"><i class="fa-regular fa-circle-down"></i></div>
        </div>
        <div class="post-content">
            <div class="p-post-header">
            <span class="post-owner"><img
                        src="${
                          post.user_img ||
                          `https://ui-avatars.com/api/?name=${post.user_name}&background=random`
                        }"
                        alt=""> ${post.user_name}</span>
                <span class="post-date">posted ${moment(
                  post.posted_at
                ).fromNow()}</span>
            </div>
            <div class="p-post-content">
            <p>${post.content}</p>
            ${
              post.media
                ? `<img src="${post.media}"></img>`
                : ""
            }
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
  return posts;
};

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

const downScore = (score) => {
  let oldScore = score.innerText;
  let newScore = Number(oldScore) - 1;
  score.textContent = newScore > 0 ? newScore : 0;
};
const riseScore = (score) => {
  let oldScore = score.innerText;
  let newScore = Number(oldScore) + 1;
  score.textContent = newScore;
};

const clearArrow = (arrow) => {
  arrow.classList.add("fa-regular");
  arrow.classList.remove("fa-solid");
  arrow.classList.remove("active");
};
const setArrow = (arrow) => {
  arrow.classList.remove("fa-regular");
  arrow.classList.add("fa-solid");
  arrow.classList.add("active");
};
const AddVote = (vote, post_id) => {
  fetch("/vote", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      post_id: post_id,
      vote: vote,
    }),
  });
};

const setUserLastVote = () => {
  const scores = document.querySelectorAll(".score");
  console.log(scores);
  scores.forEach((s) => {
    fetch(`/vote/${s.dataset.postid}`)
      .then((data) => data.json())
      .then((data) => {
        if (data.length > 0) {
          if (data[0].vote === 1) {
            setArrow(s.querySelector(".up i"));
          } else {
            setArrow(s.querySelector(".down i"));
          }
        }
      });
  });
};

const generateTopUsersList = (data) => {
  topUsersList.textContent = "";
  data.forEach((user) => {
    topUsersList.innerHTML += `
    <li>
      <img src="${
        user.img_url ||
        `https://ui-avatars.com/api/?name=${user.username}&background=random`
      }" alt="">
      <span class="red-name"> ${user.username}</span>
      <span class="red-score">${user.count}</span>
    </li>
    `;
  });
};

const setDeleteBtn = (data) => {
  let btns = document.querySelectorAll(".join");
  btns.forEach((btn) => {
    fetch("/getLoggedUserData")
      .then((res) => res.json())
      .then((data) => {
        if (!data.msg) {
          btn.textContent = "delete";
          btn.style.backgroundColor = "red";
        }
      });
  });
};

//? get top users according to the posts count.
fetch("/TopUsers")
  .then((data) => data.json())
  .then((data) => generateTopUsersList(data));

// fetch("/posts")
//   .then((data) => data.json())
//   .then((data) => generatePosts(data))
//   .then((data) => setDeleteBtn(data))
//   .then((data) => setArrowsActions())
//   .then((data) => setUserLastVote());

//? get all posts and their votes
fetch("/getLoggedUserData")
  .then((res) => res.json())
  .then((user) => {
    return user.msg ? null : user;
  })
  .then((user) => {
    fetch("/posts")
      .then((data) => data.json())
      .then((data) => generatePosts(data, user))
      .then((user) => setUserLastVote());
  });
