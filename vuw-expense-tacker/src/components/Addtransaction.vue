<template>
    <h3>Add Transaction</h3>
    <form @submit.prevent="onSubmit" id="form">
        <div class="form-control">
            <label for="text">Text</label>
            <input type="text" v-model="text" id="text" placeholder="Enter Text..." />
        </div>
        <div class="form-control">
            <label for="amount">Amount <br /> (negative - expense, positive -income)</label>
            <input type="number" v-model="amount" id="amount" placeholder="Enter Amount.....">
        </div>
        <button class="btn">Add Transaction</button>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
const text = ref('');
const amount = ref('');
const toast = useToast();
const emit = defineEmits(['transactionSubmitted'])
const onSubmit = () => {
    if (!text.value || !amount.value) {
        toast.error('Both Fields must be filled');
        return;
    }
    const trnsactionData = {
        text: text.value,
        amount: parseFloat(amount.value)
    }

    emit('transactionSubmitted', trnsactionData);
    text.value = '';
    amount.value = '';
}
</script>