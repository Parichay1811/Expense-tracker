const button = document.querySelector("#bbs");
const fname = document.querySelector(".fname");
const lname = document.querySelector(".lname");
const score = document.querySelector(".score");
const country = document.querySelector(".country");
const container = document.querySelector(".container");
const totalAmount = document.querySelector(".total-amount");
const taxForm = document.querySelector("#taxForm");

const incomeForm = document.getElementById("incomeForm");
const incomeInput = document.getElementById("incomeInput");
const totalIncomeDisplay = document.getElementById("totalIncomeDisplay");
const totalExpensesDisplay = document.getElementById("totalExpensesDisplay");
const remainingBudgetDisplay = document.getElementById("remainingBudgetDisplay");
const taxMessage = document.getElementById("taxMessage");

let playerList = JSON.parse(localStorage.getItem("playerList")) || [];
let totalIncome = 0;
let totalExpenses = 0;

const ctx = document.getElementById("expenseChart").getContext("2d");
const expenseData = {
    labels: ["Utilities", "Entertainment", "Food", "Study", "Medical"],
    datasets: [
        {
            label: "Expense Distribution",
            data: [0, 0, 0, 0, 0],
            backgroundColor: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A1FF33"],
            borderWidth: 1,
        },
    ],
};

const expenseChart = new Chart(ctx, {
    type: "polarArea",
    data: expenseData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    color: '#ffffff',
                },
            },
        },
        scales: {
            r: {
                ticks: {
                    color: '#000000',
                },
            },
        },
    },
});

// Load existing expenses from local storage
loadExpenses();

button.addEventListener("click", function (e) {
    e.preventDefault();

    if (fname.value == "" || lname.value == "" || score.value == "" || country.value == "") {
        alert("Please fill in all fields.");
    } else {
        let Mdate = new Date();
        let a = Mdate.getDate();
        let b = Mdate.getDay();
        let c = Mdate.getFullYear();
        let player = {
            name: `${fname.value} ${lname.value}`,
            country: country.value,
            date: `${a}-${b}-${c}`,
            score: score.value,
        };

        playerList.push(player);
        saveExpenses();
        updatedata();

        fname.value = "";
        lname.value = "";
        score.value = "";
        country.value = "";
    }
});

function loadExpenses() {
    playerList.forEach(player => {
        addPlayerToDOM(player);
    });
    updateChart();
}

function addPlayerToDOM(player) {
    let div = document.createElement("div");
    div.classList.add("player-item");
    div.innerHTML = `
        <p><strong>Description:</strong> ${player.name}</p>
        <p><strong>Amount:</strong> ₹${player.score}</p>
        <p><strong>Category:</strong> ${player.country}</p>
        <p><strong>Date:</strong> ${player.date}</p>
        <button class="delete-button" onclick="deletePlayer('${player.name}')">Delete</button>
    `;
    container.appendChild(div);
}

function updatedata() {
    container.innerHTML = "";
    let total = 0;

    // Show the container once expenses are added
    container.style.display = "block";

    playerList.forEach((player) => {
        addPlayerToDOM(player);
        total += parseFloat(player.score);
    });

    totalAmount.innerText = `Total: ₹${total}`;
    totalExpenses = total; // Update total expenses
    totalExpensesDisplay.innerText = totalExpenses.toFixed(2); // Update displayed total expenses
    updateRemainingBudget(); // Update remaining budget
}

function saveExpenses() {
    localStorage.setItem("playerList", JSON.stringify(playerList));
}

function deletePlayer(name) {
    playerList = playerList.filter(player => player.name !== name);
    saveExpenses();
    updatedata();
}

function updateChart() {
    const categoryCounts = {
        Utilities: 0,
        Entertainment: 0,
        Food: 0,
        Study: 0,
        Medical: 0,
    };

    playerList.forEach((player) => {
        categoryCounts[player.country] += parseFloat(player.score);
    });

    expenseChart.data.datasets[0].data = Object.values(categoryCounts);
    expenseChart.update();
}

incomeForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const income = parseFloat(incomeInput.value);
    if (isNaN(income) || income <= 0) {
        alert("Please enter a valid income amount.");
        return;
    }

    // Calculate tax based on the income
    let taxRate = 0;
    let taxPayable = 0;

    if (income > 1000000) {
        taxRate = 20;
        taxPayable = income * 0.20;
    } else if (income > 700000) {
        taxRate = 15;
        taxPayable = income * 0.15;
    } else if (income > 500000) {
        taxRate = 10;
        taxPayable = income * 0.10;
    } else if (income > 300000) {
        taxRate = 5;
        taxPayable = income * 0.05;
    }

    // Update total income and expenses
    totalIncome += income;
    totalExpenses += taxPayable; // Add tax to total expenses
    totalIncomeDisplay.innerText = totalIncome.toFixed(2);
    totalExpensesDisplay.innerText = totalExpenses.toFixed(2);

    // Calculate remaining budget after tax
    updateRemainingBudget();

    // Show tax message if applicable
    if (taxPayable > 0) {
        taxMessage.innerText = `An amount of ₹${taxPayable.toFixed(2)} is deducted as TAX.`;
        taxMessage.style.display = "block"; // Show the message
    } else {
        taxMessage.style.display = "none"; // Hide the message if no tax is deducted
    }

    incomeInput.value = ""; // Clear the input field
});

function updateRemainingBudget() {
    const remainingBudget = totalIncome - totalExpenses;
    remainingBudgetDisplay .innerText = remainingBudget.toFixed(2);
}

taxForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const income = parseFloat(document.getElementById("income").value);
    let taxRate = 0;
    let taxPayable = 0;
    let amountLeft = income;

    if (income > 1000000) {
        taxRate = 20;
        taxPayable = income * 0.20;
    } else if (income > 700000) {
        taxRate = 15;
        taxPayable = income * 0.15;
    } else if (income > 500000) {
        taxRate = 10;
        taxPayable = income * 0.10;
    } else if (income > 300000) {
        taxRate = 5;
        taxPayable = income * 0.05;
    }

    amountLeft -= taxPayable;

    document.getElementById("totalIncome").innerText = income;
    document.getElementById("taxRate").innerText = taxRate;
    document.getElementById("taxPayable").innerText = taxPayable.toFixed(2);
    document.getElementById("amountLeft").innerText = amountLeft.toFixed(2);
});

function toggleMenu() {
    const menu = document.querySelector('.menu');
    menu.classList.toggle('active');
}