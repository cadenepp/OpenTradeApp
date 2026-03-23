<script setup>

import { ref, watch } from 'vue'

// emit
const emit = defineEmits(['update-pnl', 'update-errors'])

// input variables
const entryPrice = ref('')
const exitPrice = ref('')
const margin = ref('')
const leverage = ref('')
const PnL = ref(0)

// calculations method
const calculateProfit = () => {
  const entryPriceNumber = Number(entryPrice.value)
  const exitPriceNumber = Number(exitPrice.value)
  const marginNumber = Number(margin.value)
  const leverageNumber = Number(leverage.value)

  // step 1: calc position size
  const positionSize = marginNumber * leverageNumber

  // step 2: calc price change percent
  const priceChangePercent = (exitPriceNumber - entryPriceNumber) / entryPriceNumber

  // step 3: calc profit / loss
  PnL.value = positionSize * priceChangePercent

  // TODO: ROI% = (PnL / Margin) * 100

}

// reset fields method
const resetFields = () => {
  entryPrice.value = ''
  exitPrice.value = ''
  margin.value = ''
  leverage.value = ''
  emit('update-pnl', 0)
}

// send emit to parent
watch([PnL], () => {
  if (Number.isNaN(PnL.value)) {
    emit('update-errors', true)
  } else {
    emit('update-errors', false)
    emit('update-pnl', PnL.value)
  }
})

</script>


<template>
  <section id="user-inputs-container" class="w-[45%] min-h-[525px] bg-gray-100 border-4 rounded-2xl shadow-2xl">
    <div id="entry-price-container" class="flex flex-row justify-between mt-[6%]">
      <label
          for="entry-price"
          class="text-2xl ml-[13%] mr-[2%]"

      >
        Entry Price
      </label>
      <input
          id="entry-price"
          class="border-2 rounded w-[45%] mr-[13%] p-[8px]"
          placeholder="ex: 8,500 ETH"
          type="number"
          v-model="entryPrice"
          ref="inputRef"
      />
    </div>
    <div id="exit-price-container" class="flex flex-row justify-between mt-[6%]">
      <label
          for="exit-price"
          class="text-2xl ml-[13%] mr-[2%]"
      >
        Exit Price
      </label>
      <input
          id="exit-price"
          class="ml-[2%] border-2 rounded w-[45%] mr-[13%] p-[8px]"
          placeholder="ex: 9,200 ETH"
          type="number"
          v-model="exitPrice"
      />
    </div>
    <div id="margin-container" class="flex flex-row justify-between mt-[6%]">
      <label
          for="margin-requirement"
          class="text-2xl ml-[13%] mr-[2%]"
      >
        Margin Req
      </label>
      <input
          id="margin-requirement"
          class="ml-[2%] border-2 rounded w-[45%] mr-[13%] p-[8px]"
          placeholder="ex: 1,600 USDT"
          type="number"
          v-model="margin"
      />
    </div>
    <div id="leverage-container" class="flex flex-row justify-between mt-[6%]">
      <label
          for="leverage-ratio"
          class="text-2xl ml-[13%] mr-[2%]"
      >
        Leverage X
      </label>
      <input
          id="leverage-ratio"
          class="ml-[2%] border-2 rounded w-[45%] mr-[13%] p-[8px]"
          placeholder="ex: 20"
          type="number"
          v-model="leverage"
      />
    </div>
    <div id="buttons-container" class="flex flex-row justify-around mt-[6%]">
      <!-- TODO: add button icons -->
      <button
          type="submit"
          class="p-[25px] ml-[11%] font-bold bg-green-500 w-[200px] rounded-2xl text-white shadow-lg hover:bg-green-600 hover:shadow-2xl hover:font-extrabold"
          @click="calculateProfit"
      >
        Calculate
      </button>
      <button
          type="reset"
          class="p-[25px] mr-[11%] font-bold bg-red-500 w-[200px] rounded-2xl text-white shadow-lg hover:bg-red-600 hover:shadow-2xl hover:font-extrabold"
          @click="resetFields"
      >
        Reset
      </button>
    </div>
    <!--<p>{{entryPrice}}, {{exitPrice}}, {{margin}}, {{leverage}}</p>-->
    <!--<p>{{ PnL }}</p>-->
  </section>
</template>