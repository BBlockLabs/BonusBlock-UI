<template>
  <wallet-box
    name="Phantom"
    :chains="[]"
    :available="true"
    :svg="SvgPhantom"
    add-link="https://phantom.app/"
    :count="1"
    @connect-click="{}"
  />


</template>

<script setup lang="ts">
import SvgPhantom from "@/assets/icons/phantom.svg?component";
import WalletBox from "@/components/WalletBox.vue";
</script>



<style scoped lang="scss">

</style>
