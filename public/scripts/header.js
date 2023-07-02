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
	profileImage.addEventListener("click", () => {
		const userData = JSON.parse(localStorage.getItem("user"));
		const boxSwipe = document.querySelector(".menu__swipe");
		const username = boxSwipe.querySelector(".list__1 h6");
		const userImage = boxSwipe.querySelector(".list__1 img");
		userImage.src = `${userData.avatar}`;
		username.textContent = `${userData.username}`;
		boxSwipe.classList.toggle("active__swipe");
	});
}
