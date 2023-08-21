document.addEventListener("DOMContentLoaded", function () {
  const endpoint = "http://localhost:8080/api";
  const getManga = async () => {
    const response = await fetch(`${endpoint}/manga/all`);
    const data = response.json();
    return data;
  };
  const drawMangaCardSwiper = (box, data, className) => {
    box.innerHTML = data
      .map((elem) => {
        return `
			<div class="${className} swiper-slide">
				<div class="card__img">
					<img src="${elem.image}">
				</div>
				<span class="card__type">${elem.typeManga}</span>
				<h3 class="card__title">${elem.title.russianName}</h3>
				<a href="/manga/${elem._id}" class="card__link"></a>
			</div>
			`;
      })
      .join("");
  };
  const drawMangaCard = (box, data, className) => {
    box.innerHTML = data
      .map((elem) => {
        return `
			<div class="${className}">
				<div class="card__img">
					<img src="${elem.image}">
				</div>
				<h3 class="card__title">${elem.title.russianName}</h3>
				<p class="card__chapter">${elem.typeManga}</p>
				<span class="card__type"></span>
				<a href="/manga/${elem._id}" class="card__link"></a>
			</div>
			`;
      })
      .join("");
  };

  // Recommended section
  const recommendedCards = document.querySelector(".recommen__cards");
  getManga().then((manga) => {
    drawMangaCardSwiper(recommendedCards, manga, "recommen__card card");
    const swiper = new Swiper(".mySwiper", {
      slidesPerView: 9.59,
      freeMode: true,
    });
  });

  // hot news cards
  const hotNewsCards = document.querySelector(".hotnews__cards");
  getManga().then((manga) => {
    drawMangaCardSwiper(hotNewsCards, manga, "hotnews__card card");
    const swiper = new Swiper(".mySwiper2", {
      slidesPerView: 8,
      freeMode: true,
    });
  });

  // latestUpdates cards
  const latestUpdatesCards = document.querySelector(".latestupdates__cards");
  getManga().then((manga) =>
    drawMangaCard(latestUpdatesCards, manga, "latestupdates__card")
  );
});
