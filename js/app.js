const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = [];

//Get transactions from local storage
const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

if (localStorageTransactions !== null) {
  transactions = localStorageTransactions;
}

// Add transaction function
function addTransaction(e) {
  e.preventDefault();
  // Condition to check if the fields are empty
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

    transactions.push(transaction);

    // Add transaction to document object model (DOM) - for local storage
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = "";
    amount.value = "";

    console.log("Transaction added:", transaction);
    console.log("Updated transactions:", transactions);
  }
}

// Generate random id - for delete button
function generateID() {
  return Math.floor(Math.random() * 10000000000);
}

// Add transaction to history
function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  // Add list element based on the sign
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  // Render the list element with the delete button on the page using innerHTML property
  item.innerHTML = `${transaction.text} ${sign} ${Math.abs(transaction.amount)}
    <button class="delete-btn" onclick="removeTransaction(${
      transaction.id
    })">X</button>`;

  list.appendChild(item);
}

// Update balance, income and expense
function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const income = amounts
    .filter((value) => value > 0)
    .reduce((bal, value) => (bal += value), 0);

  const expense =
    amounts
      .filter((value) => value < 0)
      .reduce((bal, value) => (bal += value), 0) * -1;

  const total = income - expense;

  if (balance) {
    balance.innerText = `$${total}`;
  }
  income.innerText = `$${income}`;
  expense.innerText = `$${expense}`;
}

// Remove transaction by id
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  // Update the storage after removing
  updateLocalStorage();

  // Restart the whole app
  Start();
}

// Update local storage function
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Starting the application
function Start() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);
  updateValues();
}

function loadTransactions() {
  const localStorageTransactions = JSON.parse(
    localStorage.getItem("transactions")
  );
  if (localStorageTransactions !== null) {
    transactions = localStorageTransactions;
    Start();
  }
}
