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
            <span>{{ dynamicValidateForm.email }}</span>
          </el-row>
          <el-row class="w-100 mt-medium" justify="center">
            <span>Please verify your email within next 24 hours</span>
          </el-row>
        </el-row>
        <SvgMailConfirmed class="mt-small" style="height: 15em" />
        <el-row class="mt-large" justify="center">
          <el-button type="tertiary" round @click="resetForm()">
            Close
          </el-button>
        </el-row>
      </template>
    </div>
  </el-dialog>
  <div>
    <box-wrapper type="white" class="social-card-container is-shadow">
      <el-row class="social-card">
        <div class="social-card-image">
          <img
            :src="PngSocialCardImage"
            alt="image"
          />
        </div>
        <el-col class="social-card-text" :span="-1">
          <h1 class="m-0" style="font-weight: 900">
            CONNECT WITH BONUSBLOCK AND EARN REWARDS!
          </h1>
          <strong style="line-height: 24px">
            Stay tuned with the latest BonusBlock news and receive a reward for
            each social platform where you contribute to the community.
          </strong>
          <el-row>
            <el-tag
              v-for="tag in linkData"
              :key="tag.text"
              round
              size="large"
              class="mb-small pointer"
              :style="'background-color: ' + tag.color"
              @click="linkSocial(tag.linkAction)"
            >
              <el-row align="middle">
                <component :is="tag.icon" class="icon-small mr-small" />
                <strong class="fs-base">{{ tag.text }}</strong>
              </el-row>
            </el-tag>
          </el-row>
          <strong style="line-height: 24px">
            You are also required to link your email to your BonusBlock account
            in order to receive rewards:
          </strong>
          <el-row>
            <el-tag
              round
              size="large"
              class="pointer"
              style="background-color: #f5bf5b"
              @click="linkEmailDialog = true"
            >
              <el-row align="middle">
                <SvgMail class="icon-small mr-small" />
                <strong class="fs-base">Add email</strong>
              </el-row>
            </el-tag>
          </el-row>
        </el-col>
      </el-row>
    </box-wrapper>
  </div>
</template>

<script setup lang="ts">
import BoxWrapper from "@/components/BoxWrapper.vue";
import SvgTwitter from "@/assets/icons/twitter.svg?component";
import SvgTelegram from "@/assets/icons/telegram.svg?component";
import SvgDiscord from "@/assets/icons/discord.svg?component";
import SvgReddit from "@/assets/icons/reddit.svg?component";
import SvgMail from "@/assets/icons/mail.svg?component";
import SvgMailConfirmed from "@/assets/images/mail-confirmed.svg?component";
import PngSocialCardImage from "@/assets/images/social-card-img.png";
import { reactive, ref, Ref, watch } from "vue";
import type { FormInstance } from "element-plus";

const linkEmailDialog: Ref<boolean> = ref(false);
const emailValid: Ref<boolean> = ref(false);
const emailLoading: Ref<boolean> = ref(false);
const emailConfirmed: Ref<boolean> = ref(false);

const formRef = ref<FormInstance>();
const dynamicValidateForm = reactive<{
  email: string;
}>({
  email: "",
});

function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      emailLoading.value = true;
      //TODO email verify call
      emailLoading.value = false;
      emailConfirmed.value = true;
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

const linkData = [
  {
    text: "Twitter",
    icon: SvgTwitter,
    color: "#D4E68C",
    linkAction: "twitter",
  },
  {
    text: "Telegram",
    icon: SvgTelegram,
    color: "#C3D0FF",
    linkAction: "telegram",
  },
  {
    text: "Discord",
    icon: SvgDiscord,
    color: "#EFBEFF",
    linkAction: "discord",
  },
  {
    text: "Reddit",
    icon: SvgReddit,
    color: "#FFB4B4",
    linkAction: "reddit",
  },
];

function linkSocial(action: string) {
  //TODO social linking, dialogs
}
</script>

<style scoped lang="scss">
.social-card-container {
  padding: 2em;
  .social-card {
    flex-wrap: nowrap;
    overflow: hidden;

    .social-card-image {
      margin-top: auto;
      margin-bottom: auto;

      img {
        border: 1px solid black;
        border-radius: 12px;
        display: block;
        max-width: 30em;
      }
    }
    .social-card-text {
      margin-left: 1em;
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
  }
}

@media only screen and (max-width: 1200px) {
  .social-card-container {
    .social-card {
      flex-wrap: wrap;

      .social-card-image {
        img {
          max-width: 100%;
          width: 100%;
        }
        flex-grow: 1;
      }

      .social-card-text {
        margin-top: 1em;
        margin-left: 0;
        min-width: 100%;
      }
    }
  }
}
</style>
