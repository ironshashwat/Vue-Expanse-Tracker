<template>
  <Header />
  <div class="container">
    <Balance :total="+total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <TransactionList @transactionDeleted="handleTransactionDeleted" :transactions="transactions" />
    <Addtransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
</template>
<script setup>
import Header from './components/Header.vue';
import Balance from './components/Balance.vue';
import IncomeExpenses from './components/IncomeExpenses.vue';
import TransactionList from './components/TransactionList.vue';
import Addtransaction from './components/Addtransaction.vue';
import { useToast } from 'vue-toastification';
const toast = useToast();
// export default{
//   components:{
//     Header,
//     Balance,
//     IncomeExpenses,
//     TransactionList,
//     Addtransaction
//   }
// }

import { ref, computed, onMounted } from 'vue';
const transactions = ref([]);
onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'));
  if (savedTransactions) {
    transactions.value = savedTransactions;
  }
})

const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);
})

//Get Income 
const income = computed(() => {
  return transactions.value.filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0).toFixed(2);
});
//get Expenses
const expenses = computed(() => {
  return transactions.value.filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0).toFixed(2);
})
// Add Transaction 
const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: generateUniqueId(),
    text: transactionData.text,
    amount: transactionData.amount
  });
  saveTransactionsToLocalStorage();
  toast.success("Transaction Added");
}
// Generate Unique Id 
const generateUniqueId = () => {
  return Math.floor(Math.random() * 1000000);
}

// Delete Transaction 
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id);
  saveTransactionsToLocalStorage();
  toast.success("transaction Deleted");
}

// Save to Local Storage 
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value));
}
</script>