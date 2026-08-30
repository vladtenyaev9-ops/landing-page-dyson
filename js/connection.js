const checkbox = document.getElementById("connection__checkbox");
const buttonCheckBox = document.getElementById("connection__new-button");

checkbox.addEventListener("change", () => {
  if (checkbox.checked === true) {
    buttonCheckBox.disabled = false;
  } else {
    buttonCheckBox.disabled = true;
  }
});

const nameInput = document.querySelector("#connection-name");
const phoneInput = document.querySelector("#connection-phone");
const emailInput = document.querySelector(".connection__news-input");
const connectionSendBtn = document.querySelector(".connection__contact-button");

const saveDataUser = () => {
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !phone) {
    alert("Заполните оба поля");
    return;
  }

  const data = {
    name: name,
    phone: phone,
    date: new Date().toLocaleString(),
  };
  localStorage.setItem("userData", JSON.stringify(data));

  nameInput.value = "";
  phoneInput.value = "";
};

connectionSendBtn.addEventListener("click", e => {
  e.preventDefault();
  saveDataUser();
});



const saveEmailOfUser = () => {
  const emailOfUser = emailInput.value.trim();
  if (!emailOfUser) {
    alert("заполните поле");
    return;
  }
  const email = {
    email: emailOfUser,
  };
  localStorage.setItem("user.email", JSON.stringify(email));
  emailInput.value = "";
};

buttonCheckBox.addEventListener("click", e => {
  e.preventDefault();
  saveEmailOfUser();
});
