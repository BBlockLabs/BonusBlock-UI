<template>
  <el-dialog
    v-model="linkEmailDialog"
    :show-close="false"
    style="max-width: 30vw; min-width: 30em"
    class="is-shadow is-black-border yellow-bg"
  >
    <div class="d-flex flex-column align-items-center px-extra-large">
      <template v-if="!emailConfirmed">
        <el-row justify="center">
          <h1 class="m-0" style="font-weight: 900">CONNECT YOUR EMAIL</h1>
        </el-row>
        <el-row class="mt-medium" justify="center">
          <span>Connect your email to receive rewards.</span>
        </el-row>
        <div class="w-100 mt-small">
          <el-form ref="formRef" :model="dynamicValidateForm">
            <el-form-item
              prop="email"
              :rules="[
                {
                  required: true,
                  message: 'Please input email address',
                  trigger: 'blur',
                },
                {
                  type: 'email',
                  message: 'This email seems to be invalid',
                  trigger: ['blur', 'change'],
                },
              ]"
            >
              <el-input
                v-model="dynamicValidateForm.email"
                :disabled="emailLoading"
                class="transparent-bg"
                placeholder="Email"
              >
                <template #prefix>
                  <SvgMail
                    :class="emailValid ? '' : 'text-muted-more'"
                    class="icon-extra-small"
                  />
                </template>
              </el-input>
            </el-form-item>
          </el-form>
          <el-row class="mt-large" justify="center">
            <el-button type="tertiary" round @click="resetForm()">
              Close
            </el-button>
            <el-button
              :loading="emailLoading"
              type="secondary"
              :disabled="!emailValid"
              round
              @click="submitForm(formRef)"
            >
              Continue
            </el-button>
          </el-row>
        </div>
      </template>
      <template v-else>
        <el-row justify="center">
          <h1 class="m-0" style="font-weight: 900">CHECK YOUR INBOX</h1>
          <el-row class="w-100 mt-medium" justify="center">
            <span>We sent a confirmation email to</span>
          </el-row>
          <el-row class="w-100 mt-small" justify="center">
            <b>{{ dynamicValidateForm.email }}</b>
          </el-row>
          <el-row class="w-100 mt-medium mb-medium" justify="center">
            <span>Please verify your email within next 24 hours</span>
          </el-row>
        </el-row>
        <SvgMailConfirmed class="mt-small" style="height: 10em" />
        <el-row class="mt-large" justify="center">
          <el-button type="tertiary" round @click="resetForm()">
            Close
          </el-button>
        </el-row>
      </template>
    </div>
  </el-dialog>

  <id-card>
    <el-row justify="center">
      <el-col :span="-1">
        <el-avatar :src="url" shape="square" :size="170" />
      </el-col>
    </el-row>

    <el-row justify="center">
      <el-col :span="-1">
        <h2 class="fs-large">
          {{ blocktopianId }}
        </h2>
      </el-col>
    </el-row>

    <el-row v-for="social in socialData" :key="social.text">
      <el-row
        justify="space-between"
        align="middle"
        class="p-small mb-small w-100"
        :class="social.linkedName ? '' : 'pointer'"
        style="border-radius: 0.5em"
        :style="'background-color: ' + social.color"
        @click="social.linkedName ? {} : linkSocial(social.linkAction)"
      >
        <slot v-if="social.linkedName">
          <el-col :span="-1">
            <el-tooltip content="Unlink" placement="top">
              <SvgUnlink
                style="opacity: 0.7"
                class="pointer mr-small"
                @click="unlinkSocial(social.linkAction)"
              />
            </el-tooltip>
            <strong>{{ social.namePrefix }}{{ social.linkedName }}</strong>
          </el-col>
          <component :is="social.icon" class="icon"></component>
        </slot>
        <slot v-else>
          <strong>{{ social.text }}</strong>
          <component :is="social.icon" class="icon"></component>
        </slot>
      </el-row>
    </el-row>

    <!--    <el-row v-for="[key, value] in data" :key="key" class="my-small">
      <el-col>
        <el-tooltip
          :content="String(value)"
          :disabled="String(value).length < 15"
        >
          <box class="fs-small px-base py-small">
            <el-row justify="space-between" class="flex-row" :gutter="5">
              <el-col :span="-1" class="fs-extra-small flex-noshrink">
                {{ key }}:
              </el-col>

              <el-col :span="-1" class="of-hidden">
                <b>{{ value }}</b>
              </el-col>
            </el-row>
          </box>
        </el-tooltip>
      </el-col>
    </el-row>-->
  </id-card>
</template>

<script setup lang="ts">
import IdCard from "@/components/IdCard.vue";
import type { ComputedRef, FunctionalComponent, Ref, SVGAttributes } from "vue";
import { computed, reactive, ref, watch } from "vue";
import { StoreType, useStore } from "@/store";
import { renderDiscs } from "@whi/identicons";
import SvgTwitter from "@/assets/icons/twitter.svg?component";
import SvgTelegram from "@/assets/icons/telegram.svg?component";
import SvgDiscord from "@/assets/icons/discord.svg?component";
import SvgReddit from "@/assets/icons/reddit.svg?component";
import SvgGithub from "@/assets/icons/github.svg?component";
import SvgMail from "@/assets/icons/mail.svg?component";
import SvgUnlink from "@/assets/icons/unlink.svg?component";
import SvgMailConfirmed from "@/assets/images/mail-confirmed.svg?component";
import HttpResponse from "@/common/api/HttpResponse";
import Toast from "@/common/Toast";
import { ElMessageBox, FormInstance } from "element-plus";

const linkEmailDialog: Ref<boolean> = ref(false);
const emailValid: Ref<boolean> = ref(false);
const emailLoading: Ref<boolean> = ref(false);
const emailConfirmed: Ref<boolean> = ref(false);
const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<{ email: string }>({ email: "" });
const store: StoreType = useStore();

const blocktopianId: ComputedRef<string> = computed(
  () => store.state.UserModule?.user?.userId || "Blocktopian ID"
);

const url = computed(() => {
  const result = renderDiscs({
    seed: store.state.UserModule?.user?.userId || "-",
    base: 0.11,
    size: 170,
    maxDiscs: 4,
    colorRange: 1,
  });

  return result.dataURL;
});

const socialTypeToMetadata: Map<String, String> = new Map([
  ["twitter", "TWITTER_NAME"],
  ["discord", "DISCORD_USERNAME"],
  ["telegram", "TELEGRAM_NAME"],
]);

const removedSocials: Ref<Map<String, boolean>> = ref(new Map<String, boolean>());

watch(
  () => dynamicValidateForm.email,
  (newValue, oldValue): void => {
    if (formRef.value && newValue != oldValue) {
      formRef.value.validate((valid) => {
        emailValid.value = valid;
      });
    }
  }
);

async function checkEmailVerificationCode() {
  let params = new URLSearchParams(window.location.search);
  if (params.has("code")) {
    const response: Response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/mail/verify`,
      {
        body: JSON.stringify({ code: params.get("code") }),
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": store.state.UserModule?.token || "",
        },
        method: "POST",
      }
    );
    try {
      await HttpResponse.fromResponse<string>(response);
      Toast.make(
        "Email verified",
        "You have successfully linked your email address",
        "success",
        true,
        3000
      );
      await store.dispatch("UserModule/getStatus");
    } catch (e: any) {
      Toast.make(
        "Cannot verify email",
        "Email verification error: " + e.message,
        "error",
        true,
        3000
      );
    }
  }
}

async function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  await formEl.validate((valid) => {
    if (valid) {
      emailLoading.value = true;
      fetch(`${import.meta.env.VITE_BACKEND_URL}/mail/register`, {
        body: JSON.stringify({ email: dynamicValidateForm.email }),
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": store.state.UserModule?.token || "",
        },
        method: "POST",
      })
        .then((res) => {
          HttpResponse.fromResponse<Object>(res)
            .then(() => {
              emailConfirmed.value = true;
            })
            .catch((e) => {
              Toast.make(
                "Failed to send email",
                "Something went wrong with email confirmation: " + e.message,
                "error",
                true,
                3000
              );
            });
        })
        .catch(() => {
          Toast.make(
            "Failed to send email",
            "Something went wrong with email confirmation, try again later",
            "error",
            true,
            3000
          );
        })
        .finally(() => {
          emailLoading.value = false;
        });
    }
  });
}

function resetForm() {
  if (formRef.value) {
    formRef.value.resetFields();
  }
  linkEmailDialog.value = false;
  emailValid.value = false;
  emailConfirmed.value = false;
}

function getSocialNameIfLinked(
  socialType: "twitter" | "discord" | "reddit" | "telegram" | "github" | "email"
): String | null {
  const socialRemoved = removedSocials.value.get(socialType);
  if (socialRemoved) {
    return null;
  }

  const socialId = store.state.UserModule?.user?.[socialType];
  if (socialId === undefined) {
    return null;
  }
  let name;
  const metadataId = socialTypeToMetadata.get(socialType);
  if (metadataId) {
    name = store.state.UserModule?.user?.metadata.get(metadataId);
  }
  if (name === undefined) {
    return socialId;
  }
  return name;
}

async function linkSocial(linkAction: string) {
  if (linkAction == "telegram") {
    window.Telegram.Login.auth(
      { bot_id: "6652280982", request_access: false },
      (data: any) => {
        if (!data) {
          // authorization failed
          alert("failed to connect Telegram");
          return;
        }
        verifyAndUpdateTelegramData(data);
      }
    );

    return;
  }

  if (linkAction == "email") {
    linkEmailDialog.value = true;
    return;
  }

  const response: Response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/auth/social-link`,
    {
      body: JSON.stringify({
        social: linkAction.toLowerCase(),
        returnTo: window.location.href,
      }),
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": store.state.UserModule?.token || "",
      },
      method: "POST",
    }
  );
  const responseData = await HttpResponse.fromResponse<string>(response);
  if (responseData.success) {
    window.location.href = responseData.payload;
  }
}

async function unlinkSocial(
  name: "twitter" | "discord" | "reddit" | "telegram" | "github" | "email"
): Promise<void> {
  try {
    await ElMessageBox.confirm(
      "Are you sure you want unlink " + name + " account?",
      name + " Account",
      {
        confirmButtonText: "Unlink",
        cancelButtonText: "Cancel",
      }
    );
  } catch (e: any) {
    return;
  }
  const response: Response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/auth/social-unlink`,
    {
      body: JSON.stringify({ social: name.toLowerCase() }),
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": store.state.UserModule?.token || "",
      },
      method: "POST",
    }
  );
  const responseData = await HttpResponse.fromResponse<void>(response);
  if (responseData.success) {
    Toast.make(
      name + " unlinked",
      "Your " + name + " account successfully unlinked",
      "success",
      true,
      3000
    );

    removedSocials.value.set(name, true);

    try {
      await store.dispatch("UserModule/removeSocial", { social: name });
    } catch (e) {
      await store.dispatch("UserModule/getStatus");
    }
  }
}

async function verifyAndUpdateTelegramData(data: Object) {
  const response: Response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/telegram/verify`,
    {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": store.state.UserModule?.token || "",
      },
      method: "POST",
    }
  );
  const responseData = await HttpResponse.fromResponse<string>(response);
  if (responseData.success) {
    removedSocials.value.set("telegram", false);
    await store.dispatch("UserModule/getStatus");
  } else {
    Toast.make(
      "Failed to link Telegram",
      "Something went wrong: " + responseData.errors[0],
      "error",
      true,
      3000
    );
  }
}

const socialData: ComputedRef<
  Array<{
    text: string;
    icon: FunctionalComponent<SVGAttributes>;
    color: string;
    linkAction: string;
    linkedName: String | null;
    namePrefix: string;
  }>
> = computed(() => {
  return [
    {
      text: "Connect Twitter",
      icon: SvgTwitter,
      color: "#D4E68C",
      linkAction: "twitter",
      linkedName: getSocialNameIfLinked("twitter"),
      namePrefix: "@",
    },
    {
      text: "Connect Telegram",
      icon: SvgTelegram,
      color: "#C3D0FF",
      linkAction: "telegram",
      linkedName: getSocialNameIfLinked("telegram"),
      namePrefix: "@",
    },
    {
      text: "Connect Discord",
      icon: SvgDiscord,
      color: "#EFBEFF",
      linkAction: "discord",
      linkedName: getSocialNameIfLinked("discord"),
      namePrefix: "@",
    },
    {
      text: "Connect Reddit",
      icon: SvgReddit,
      color: "#FFB4B4",
      linkAction: "reddit",
      linkedName: getSocialNameIfLinked("reddit"),
      namePrefix: "/u/",
    },
    {
      text: "Connect Github",
      icon: SvgGithub,
      color: "#F8C8DC",
      linkAction: "github",
      linkedName: getSocialNameIfLinked("github"),
      namePrefix: "",
    },
    {
      text: "Connect Email",
      icon: SvgMail,
      color: "#F5BF5B",
      linkAction: "email",
      linkedName: getSocialNameIfLinked("email"),
      namePrefix: "",
    },
  ];
});

/*const data: ComputedRef<Map<string, string | number>> = computed(
  () =>
    new Map<string, string | number>([
      ["Wallet Address", store.state.UserModule?.activeWallet?.address || "-"],
      ["Number of Networks", store.state.UserModule?.wallets.length || "-"],
      [
        "Successful Invitations",
        store.state.UserModule?.user?.invitedCount || "0",
      ],
      [
        "Issue date",
        store.state.UserModule?.user?.createdOn.format("MMMM DD, YYYY") || "-",
      ],
    ])
);*/
checkEmailVerificationCode();
</script>
