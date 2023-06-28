const image = document.querySelector(".containerWrapper");
const btn = document.querySelector(".btnWrapper");
const imagesLength = btn.getAttribute("data-image");
console.log(imagesLength);
let query = window.location.search.substring(1);
let chapter = query.split("&")[0].split("=")[1];
let page = query.split("&")[1].split("=")[1];
console.log(page);
console.log(chapter);

image.addEventListener("click", (e) => {
	if (e.offsetX > 450) {
		if (page == imagesLength) {
			console.log(1);
			page = 1;
			chapter++;
			btn.setAttribute("href", `?c=${chapter}&page=${page}`);
			return;
		}
		page++;
		btn.setAttribute("href", `?c=${chapter}&page=${page}`);
	} else {
		if (chapter == 1 && page == 1) {
			btn.removeAttribute("href");
			return;
		}
		if (page == 1) {
			console.log(2);
			page = 1;
			chapter--;
			btn.setAttribute("href", `?c=${chapter}&page=${page}`);
			return;
		}
		page--;
		btn.setAttribute("href", `?c=${chapter}&page=${page}`);
	}
});
