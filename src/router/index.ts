import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AuthNavigationGuard from "@/router/AuthNavigationGuard";
import Toast from "@/common/Toast";
import { store } from "@/store";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        noAuth: true,
      },
    },
    {
      path: "/wallets",
      name: "wallets",
      component: () => import("@/views/WalletsView.vue"),
    },
    {
      path: "/referral",
      name: "Referral",
      component: () => import("@/views/ReferralView.vue"),
    },
    {
      path: "/campaign/:id",
      name: "Campaign",
      component: () => import("@/views/CampaignDetails.vue"),
    },
    {
      path: "/collect-rewards",
      name: "Collect Rewards",
      component: () => import("@/views/CollectRewardsView.vue"),
    },
    {
      path: "/validate-email",
      name: "Validate E-Mail",
      beforeEnter: async (to, from, next) => {
        const code = to.query.code;
        if (code) {
          if (!store.getters["UserModule/loggedIn"]) {
            console.log("notloggedin");
            next({ path: '/', query: { noauth_email_verify_code: code } });
            return;
          }

          try {
            await store.dispatch("UserModule/verifyEmail", code);
          } catch (e: any) {
            Toast.make("E-Mail verification failed", e.message, "error", false);
            await router.push("/wallets");
            return;
          }
          Toast.make("E-Mail verification successful", "", "success", true, 3000);
          await store.dispatch("UserModule/getStatus");
          await router.push("/wallets");
        } else {
          delete to.query.code;
          next({ path: to.path, query: to.query });
        }
      },
      component: HomeView,
      meta: {
        noAuth: true,
      },
    },
  ],
});

router.beforeEach(AuthNavigationGuard);

router.beforeEach((to, from, next) => {
  if (to.query.why == "already_linked") {
    Toast.make(
      "Already linked!",
      "Requested social profile is already linked to another account",
      "error",
      false
    );
    delete to.query.why;
    next({ path: to.path, query: to.query });
    return;
  }
  if (to.query.noauth_email_verify_code) {
    if (!store.getters["UserModule/loggedIn"]) {
      next();
      return;
    } else {
      next({
        path: "/validate-email",
        query: { code: to.query.noauth_email_verify_code.toString() },
      });
      return;
    }
  }
  next();
});

export default router;
