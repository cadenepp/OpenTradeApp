<script setup>

const props = defineProps({
  pnl: Number,
  errors: Boolean
})

</script>


<template>
  <section id="profits-container" class="w-[45%] min-h-[200px] h-[200px] bg-gray-100 border-4 rounded-2xl shadow-2xl mt-[3%]">
    <div class="w-full h-full flex items-center">
      <h2
          class="text-3xl ml-[30%]"
          v-if="errors"
      >
        Invalid Inputs: Numbers ONLY
      </h2>
      <h2
          class="text-3xl ml-[30%]"
          v-else
      >
        <slot></slot> ${{ pnl.toFixed(2) }}
      </h2>
    </div>
  </section>
</template>
