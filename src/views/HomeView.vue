<template>
  <el-main class="d-flex flex-column">
    <el-row justify="end">
      <el-col :span="-1">
        <svg-logo class="title-logo" />
      </el-col>
    </el-row>

    <el-row justify="center" class="my-auto">
      <el-col :md="-1">
        <el-space fill :size="40">
          <el-row justify="center">
            <el-col :span="-1" class="tc">
              <span class="title-text"> Join </span>
              <span class="title-number">
                {{ store.state.userCount }}
              </span>
            </el-col>
          </el-row>

          <el-row justify="center">
            <el-col :span="-1" class="fs-extra-large tc">
              <h1 class="fs-extra-large m-0">blocktopians to earn rewards</h1>
            </el-col>
          </el-row>

          <el-row justify="center" :gutter="20">
            <el-col :md="6" :xl="5" class="my-small">
              <el-button size="large" class="w-100" @click="onMetamaskLogin">
                <svg-metamask-fox class="mr-medium icon-medium" />
                <b>Continue with Metamask</b>
              </el-button>
            </el-col>

            <el-col :md="6" :xl="5" class="my-small">
              <el-button size="large" class="w-100" @click="keplrDialog = true">
                <svg-keplr class="mr-medium icon-medium" />
                <b>Continue with Keplr</b>
              </el-button>
            </el-col>

            <el-col :md="6" :xl="5" class="my-small">
              <el-button size="large" class="w-100" @click="onPhantomLogin">
                <svg-phantom class="mr-medium icon-medium" style="color: #aa9ecb" />
                <b>Continue with Phantom</b>
              </el-button>
            </el-col>
          </el-row>

          <el-row justify="center" :gutter="20">
            <el-col :md="6" :xl="5" class="my-small">
              <el-button size="large" class="w-100" @click="onOkxLogin">
                <svg-okx class="mr-medium icon-medium" style="color: #aa9ecb;width: 100px"/>
                <b>Continue with OKX</b>
              </el-button>
            </el-col>
          </el-row>

          <el-row justify="center">
            <el-col :span="-1">
              <disclaimer-dialog />
            </el-col>
          </el-row>
        </el-space>
      </el-col>
    </el-row>
    <dialog-keplr v-model:open="keplrDialog" @connect="onKeplrLogin" />
  </el-main>

  <footer-component />
  <div id="cookie-consent"></div>
</template>

<script setup lang="ts">
import DialogKeplr from "@/components/KeplrDialog.vue";
import DisclaimerDialog from "@/components/DisclaimerDialog.vue";
import FooterComponent from "@/components/PageFooter.vue";
import SvgKeplr from "@/assets/icons/keplr.svg?component";
import SvgLogo from "@/assets/logo/logo-yellow.svg?component";
import SvgMetamaskFox from "@/assets/icons/metamask-fox.svg?component";
import SvgPhantom from "@/assets/icons/phantom.svg?component";
import SvgOkx from "@/assets/icons/okx.svg?component";
import type { Ref } from "vue";
import { onMounted, ref } from "vue";
import { Router, useRoute, useRouter } from "vue-router";
import { StoreType, useStore } from "@/store";
import MetamaskClient from "@/common/MetamaskClient";
import cookieConsentTools from "cookie-consent-tools";

const store: StoreType = useStore();
const router: Router = useRouter();
const route = useRoute();

const keplrDialog: Ref<boolean> = ref(false);

setTimeout(() => {
  cookieConsentTools.initialize({
    consentBox: {
      container: "cookie-consent",
      messages: {
        message:
          "We use Cookie3 Analytics for analytical and marketing purposes. " +
          "Cookie3 Analytics is a tool used to collect information about user behaviour " +
          "on the website. It is used to create a user profile. To learn more about the " +
          "processing of data by Cookie3 Analytics, please read the",
        seeMoreLabel: "Cookie3 Analytics Privacy Policy",
        okButton: "Got it",
      },
      seeMoreLink: {
        href: "https://app.cookie3.co/privacy",
        target: "_blank",
      },
    },
  });
}, 1000);

setTimeout(() => {
  if (window.location.href.indexOf("okxlogin") != -1) {
    onOkxLogin();
  }
}, 200);

async function onMetamaskLogin(): Promise<void> {
  try {
    await MetamaskClient.metamaskLogin(
      store,
      false,
      route.query.ref
        ? String(route.query.ref)
        : route.query.r
        ? String(route.query.r)
        : null
    );
  } catch (e: any) {
    // All errors should be handled in metamaskLogin already
    return;
  }

  await proceedToWallets();
}

async function onPhantomLogin(): Promise<void> {
  await store.dispatch("UserModule/phantomLogin");
  await proceedToWallets();
}

async function onOkxLogin(): Promise<void> {
  await store.dispatch("UserModule/okxLogin");
  await proceedToWallets();
}

async function onKeplrLogin(): Promise<void> {
  keplrDialog.value = false;
  await proceedToWallets();
}

async function proceedToWallets() {
  await router.push({
    path: "/wallets",
    query: router.currentRoute.value.query,
  });
}

onMounted(() => {
  if ("metamask-login" in route.query) {
    onMetamaskLogin();
  }
});
</script>

<style scoped lang="scss">
@use "@/design/theme.scss" as theme;
@use "element-plus/theme-chalk/src/mixins/function" as EPFunctions;
@use "element-plus/theme-chalk/src/mixins/mixins" as EPMixins;
@use "element-plus/theme-chalk/src/common/var" as EPVar;

.title-logo {
  height: 4.286em; // 60px
}

.title-text {
  font-size: 10.571em; // 148px
  font-family: "Nimbus Sans L", sans-serif;
  font-weight: 700;
  line-height: 120%;

  @media only screen and (max-width: 400px) {
    font-size: 8em;
  }
}

.title-number {
  @extend .title-text;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 4px;
  -webkit-text-stroke-color: black;
}

.fs-extra-large {
  @include EPMixins.res(xs, EPVar.$breakpoints) {
    font-size: 1.95em;
  }
}
</style>
