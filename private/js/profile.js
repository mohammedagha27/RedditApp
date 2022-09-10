const postForm = document.querySelector(".create-post-body form");
const input = document.querySelector('input[type="file"]');
const loading = document.querySelector(".loading");

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
        }
      }
    });
});
