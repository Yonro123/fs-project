import {
  closeAuthModal,
  closeRegisterModal,
  openAuthModal,
  openRegisterModal,
  user,
} from "./modals.js";

const headerBtn = document.querySelector(".profile__btn");
const btnRegister = document.querySelector(".btnForReg");
const btnLogin = document.querySelector(".btnForLog");
const closeRegModal = document.querySelector(".register__container");
const closeLogModal = document.querySelector(".login__container");
const profileImage = document.querySelector(".header__profile");

if (!user) {
  headerBtn.addEventListener("click", () => {
    if (headerBtn.classList.contains("login__auth")) {
      headerBtn.textContent = "LogIn";
      headerBtn.classList.remove("login__auth");
      return;
    }
    openAuthModal();
  });
  btnRegister.addEventListener("click", () => {
    openRegisterModal();
  });
  btnLogin.addEventListener("click", () => {
    openAuthModal();
  });
  closeLogModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("login__container")) {
      closeAuthModal();
    }
  });
  closeRegModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("register__container")) {
      closeRegisterModal();
    }
  });
}

if (user) {
  const bookmarksBox = document.querySelector(".bookmarks");
  profileImage.addEventListener("click", () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const boxSwipe = document.querySelector(".menu__swipe");
    const username = boxSwipe.querySelector(".list__1 h6");
    const userImage = boxSwipe.querySelector(".list__1 img");
    userImage.src = `${userData.avatar}`;
    username.textContent = `${userData.username}`;
    boxSwipe.classList.toggle("active__swipe");
  });

  // Удаление переключателя темы с хедера
  const switchBox = document.querySelector(".header__switchTheme");
  switchBox.innerHTML = "";
  switchBox.remove();

  // Добавление Уведомления
  const notifyBox = document.createElement("li");
  notifyBox.innerHTML = `
	<svg fill="white" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path></svg>
	`;
  bookmarksBox.after(notifyBox);
}
