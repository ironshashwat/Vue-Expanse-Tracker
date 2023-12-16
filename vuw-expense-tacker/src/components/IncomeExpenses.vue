<template>
    <div class="inc-exp-container">
        <div>
            <h4>Income</h4>
            <div id="money-plus" class="money plus">$+{{income}}</div>
        </div>
        <div>
            <h4>Expenses</h4>
            <div id="money-minus" class="money minus">
                ${{expenses}}
            </div>
        </div>
    </div>
</template>
<script setup>
    import { defineProps } from 'vue';
    const props = defineProps({
        income:{
            type:Number,
            required:true
        },
        expenses:{
            type:Number,
            required:true
        }
    })
</script>