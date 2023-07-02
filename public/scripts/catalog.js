const buttonCards = document.querySelector(".catalog__buttons");
const prev = document.querySelector(".btn__prev");
const next = document.querySelector(".btn__next");
const query = window.location.search.substring(1);
let page = query.split("&")[0].split("=")[1];

prev.addEventListener("click", () => {
	if (page === "1") return;
	page--;
	prev.setAttribute("href", `?page=${page}&limit=20`);
});
next.addEventListener("click", (e) => {
	page++;
	next.setAttribute("href", `?page=${page}&limit=20`);
});
