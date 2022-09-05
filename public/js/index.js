const searchInput = document.querySelector(
  "header .header-container .search form input"
);
const searchForm = document.querySelector(
  "header .header-container .search form"
);

searchInput.addEventListener("focus", (e) => {
  searchForm.style.borderColor = "var(--button)";
});
searchInput.addEventListener("focusout", (e) => {
  searchForm.style.borderColor = "var(--line)";
});
