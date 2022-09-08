const postForm = document.querySelector(".create-post-body form");

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

        Toast.fire({
          icon: "success",
          title: "Post added successfully",
        });
      } else if (data.error) {
        console.log(data.error);
      }
    });
});
