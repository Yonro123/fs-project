const inpUserName = document.querySelector("#username");
const inpPassword = document.querySelector("#password");
const inpRepeatPassword = document.querySelector("#passwordRepeat");
const btnRegister = document.querySelector(".register__send");
const endpoint = "http://localhost:8080/api";

const postUser = async (data) => {
	const response = await fetch(`${endpoint}/users/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	alert("Вы успешно зарегистрировались");
	window.location.reload();
	return response;
};

btnRegister.addEventListener("click", (e) => {
	e.preventDefault();
	if (inpPassword.value === inpRepeatPassword.value) {
		const data = {
			username: inpUserName.value,
			password: inpPassword.value,
		};
		postUser(data);
	}
});
