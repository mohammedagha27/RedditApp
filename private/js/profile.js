const postForm = document.querySelector(".create-post-body form");
const input = document.querySelector('input[type="file"]');
const loading = document.querySelector(".loading");
const prevPosts = document.querySelector(".prev-posts");

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
var uploadField = document.getElementById("file");

input.onchange = function () {
  if (this.files[0].size > 2097152) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Images size is to large! max-size: 2mb",
    });
    this.value = "";
  }
};
const uploadMedia = (post_id) => {
  const data = new FormData();
  data.append("media", input.files[0]);
  data.append("post_id", post_id);
  loading.classList.add("active");
  fetch("/addNewPostMedia", {
    method: "POST",
    body: data,
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.success) {
        loading.classList.remove("active");
        Toast.fire({
          icon: "success",
          title: "Post added successfully",
        });
        fetch("/getUserPosts")
          .then((data) => data.json())
          .then(generatePosts);
      } else if (data.msg) {
        loading.classList.remove("active");
        Toast.fire({
          icon: "error",
          title: data.msg,
        });
      }
    });
};

postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("/post", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: document.querySelector("form input#title").value,
      content: document.querySelector("form textarea").value,
    }),
  })
    .then((data) => data.json())
    .then((data) => {
      if (data.msg) {
        Toast.fire({
          icon: "error",
          title: data.msg,
        });
      } else {
        const post_id = data[0].id;
        if (input.value) {
          uploadMedia(post_id);
        } else {
          Toast.fire({
            icon: "success",
            title: "Post added successfully",
          });
          fetch("/getUserPosts")
            .then((data) => data.json())
            .then(generatePosts);
        }
      }
    });
});

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
          if (data.success) {
            post.remove();
            Swal.fire("Deleted!", data.success, "success");
          } else {
            Toast.fire({
              icon: "error",
              title: data.msg,
            });
          }
        });
    }
  });
};

const generatePosts = (posts) => {
  if (posts.msg) {
    Toast.fire({
      icon: "error",
      title: posts.msg,
    });
  } else {
    if (posts.length > 0) {
      prevPosts.textContent = "";
      posts.forEach((post) => {
        prevPosts.innerHTML += `
          <div class="p-post">
          <div class="join">
            <a href="/post/${post.id}"onclick="event.preventDefault()">
              <i class="fa-solid fa-trash" onclick="deletePost(event,${
                post.id
              })"></i>
            </a>
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
              ${post.media ? `<img src="${post.media}"></img>` : ""}
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
    }
  }
};

fetch("/getUserPosts")
  .then((data) => data.json())
  .then(generatePosts);
