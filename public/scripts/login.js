import { closeAuthModal, user } from "/scripts/modals.js";
const headerBtn = document.querySelector(".profile__btn");
const loginBtn = document.querySelector(".login__btn");
const inpEmail = document.querySelector("#login__email input");
const inpPassword = document.querySelector("#login__password input");
const endpoint = "http://localhost:8080/api";

const getUsers = async () => {
	const response = await fetch(`${endpoint}/users`);
	const data = await response.json();
	return data;
};

const authUser = async () => {
	const users = await getUsers();
	for (const user of users) {
		if (user.password === inpPassword.value && user.email === inpEmail.value) {
			localStorage.setItem("user", JSON.stringify(user));
			headerBtn.textContent = "LogOut";
			headerBtn.classList.add("login__auth");
			closeAuthModal();
		}
	}
	inpPassword.value = "";
	inpEmail.value = "";
	return;
};
if (user) {
	headerBtn.textContent = "LogOut";
}
if (!user) {
	loginBtn.addEventListener("click", (e) => {
		e.preventDefault();
		authUser();
	});
}
