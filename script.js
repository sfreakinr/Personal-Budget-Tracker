// Income
const incomeForm = document.getElementById("income-form")
const incomeAmount = document.getElementById("income-amount")

// Expense
const expenseForm = document.getElementById("expense-form")
const expenseAmount = document.getElementById("expense-amount")
const expenseDesc = document.getElementById("expenseDesc")
const expenseCategory = document.getElementById("expenseCategory")
const expenseTableBody = document.getElementById("expenseTableBody");

// Display
const displayIncome = document.getElementById("displayIncome")
const displayBalance = document.getElementById("displayBalance")

let income = 0
let expenses = []

// Income - eventlistener

incomeForm.addEventListener("submit", (e) => {
    e.preventDefault();
    income = parseFloat(incomeAmount.value)
    incomeAmount.value = ""
    displayIncome.textContent = `Income is ₹${income}`
    updateBalance();
})

// Expense - eventlistener

expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const expense = {
        description: expenseDesc.value,
        amount: parseInt(expenseAmount.value),
        category: expenseCategory.options[expenseCategory.selectedIndex].text
    }
    expenses.push(expense)
    expenseDesc.value = ""
    expenseAmount.value = ""
    expenseCategory.selectedIndex = 0;
    updateBalance()
    updateExpenseTable();


})

// Budget Summary

const updateBalance = () => {
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
    const balanceAmt = income - totalExpenses
    const debtAmt = parseInt(balanceAmt)*-1
    if (balanceAmt < 0) {
        displayBalance.textContent = `Your Expense has exceeded income no money left to spend You are in debt by ₹${Math.abs(balanceAmt)} `
    }
    else {
        displayBalance.textContent = `Your Balance is ₹${balanceAmt}`
    }
};

//  Update expense table
const updateExpenseTable = () => {
    expenseTableBody.innerHTML = "";

    expenses.forEach((expense) => {
        const row = document.createElement("tr");

        const descriptionCell = document.createElement("td");
        descriptionCell.textContent = expense.description;
        
        const amountCell = document.createElement("td");
        amountCell.textContent = `₹${expense.amount.toFixed(2)}`; 

        const categoryCell = document.createElement("td");
        categoryCell.textContent = expense.category;

        row.appendChild(descriptionCell);
        row.appendChild(amountCell);
        row.appendChild(categoryCell);

        expenseTableBody.appendChild(row);
    });
};