import { closeAuthModal, user } from "/scripts/modals.js";
const headerBtn = document.querySelector(".header__profile");
const loginBtn = document.querySelector(".login__send");
const inpUserName = document.querySelector("#login__username");
const inpPassword = document.querySelector("#login__password");
const exitBtn = document.querySelector(".swipe__goout");
const endpoint = "http://localhost:8080/api";

const getUsers = async () => {
  const response = await fetch(`${endpoint}/users`);
  const data = await response.json();
  return data;
};

const authUser = async () => {
  const users = await getUsers();
  for (const user of users) {
    if (
      user.password === inpPassword.value &&
      user.username === inpUserName.value
    ) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          avatar: user.avatar,
          username: user.username,
          id: user._id,
        })
      );
      headerBtn.innerHTML = "";
      headerBtn.style.background = `url(${user.avatar}) no-repeat center/contain`;
      headerBtn.classList.add("profileImage");
      closeAuthModal();
    }
  }
  inpPassword.value = "";
  inpUserName.value = "";
  window.location.reload();
  return;
};
if (user) {
  const userData = JSON.parse(localStorage.getItem("user"));

  headerBtn.innerHTML = "";
  headerBtn.style.background = `url(${userData.avatar}) no-repeat center/contain`;
  headerBtn.classList.add("profileImage");
  exitBtn.addEventListener("click", () => {
    localStorage.removeItem("user");
  });
}
if (!user) {
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();
    authUser();
  });
}
