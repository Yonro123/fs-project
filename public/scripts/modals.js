const login = document.querySelector(".login");
const register = document.querySelector(".register");

let user = false;
if (localStorage.getItem("user")) {
	user = true;
}

const openAuthModal = () => {
	login.classList.add("modal-open");
	register.classList.remove("modal-open");
};
const closeAuthModal = () => {
	login.classList.remove("modal-open");
};
const openRegisterModal = () => {
	register.classList.add("modal-open");
	login.classList.remove("modal-open");
};
const closeRegisterModal = () => {
	register.classList.remove("modal-open");
};

export {
	closeAuthModal,
	closeRegisterModal,
	openAuthModal,
	openRegisterModal,
	user,
};
