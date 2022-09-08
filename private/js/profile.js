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
        window.location.href = "/";
      } else if (data.error) {
        console.log(data.error);
      }
    });
});
