<script setup>

import { ref } from "vue";

import UserInputsBox from "@/Components/UserInputsBox.vue";
import ProfitBox from "@/Components/ProfitBox.vue";

// #1 - Components
// #2 - Props
// #3 - Slots
// #4 - Event Listeners
// #5 - Form Bindings
// #6 - Conditional Rendering
// #7 - Template Refs
// #8 - Declarative Rendering
// #9 - Emits
// #10 - Watchers

// TODO's
// TODO: Add more validation for invalid user input
// TODO: HistoryBox w/ tokens or cookies
// TODO: Mobile Responsiveness
// TODO: All Other TODO's

// I'm going to extend on this for a personal project

const PnL = ref(0)
const errors = ref(false)

</script>


<template>
  <h1 class="text-center text-5xl font-bold font-mono mt-[5%]">Leverage Profit Calculator</h1>
  <section class="w-full flex flex-col items-center mt-[1%] font-mono">
    <user-inputs-box @update-pnl="PnL =$event" @update-errors="errors =$event" />
    <profit-box :pnl="PnL" :errors="errors" >Profit: </profit-box>
  </section>
</template>
