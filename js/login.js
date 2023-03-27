const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "myusername" && password === "mypassword") {
    localStorage.setItem("loginToken", "mysecrettoken");

    console.log("Logged in!");
    window.location.href = "index.html";
  } else {
    console.log("Invalid login!");
  }
});
function addTransaction(e) {
  e.preventDefault();

  const text = document.getElementById("text");
  const amount = document.getElementById("amount");

  if (!isLoggedIn()) {
    console.log("You must be logged in to add a transaction!");
    return;
  }

  if (text.value.trim() === "" || amount.value.trim() === "") {
    document.getElementById("error_msg").innerText =
      "Error: Transaction amount and text are required";
    setTimeout(
      () => (document.getElementById("error_msg").innerHTML = ""),
      5000
    );
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value,
    };
  }

  function isLoggedIn() {
    return localStorage.getItem("loginToken") === "mysecrettoken";
  }
}
