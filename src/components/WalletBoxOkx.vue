<template>
  <wallet-box
    name="OKX"
    :chains="[]"
    :available="true"
    :svg="SvgOkx"
    add-link="https://www.okx.com/"
    :count="1"
    @connect-click="{}"
  />


</template>

<script setup lang="ts">
import SvgOkx from "@/assets/icons/okx.svg?component";
import WalletBox from "@/components/WalletBox.vue";
</script>

<style scoped lang="scss">

</style>
