<template>
  <PageWrapper card-back>
    <el-row
      justify="space-between"
      :gutter="24"
      class="w-100 my-extra-large referral-info"
    >
      <el-col :md="16" :lg="17">
        <h3 class="fs-large mb-large title">
          Stack your first rewards by onboarding more users!
        </h3>

        <copy-box
          class="mt-small fs-normal bold mb-extra-large referral-link"
          :text="store.getters['UserModule/refLink']"
        />

        <p class="fs-medium">
          Once a new user signs-up and adds at least one wallet, it will be
          counted towards a bigger reward.
        </p>
      </el-col>

      <el-col :md="8" :lg="7">
        <!--remove-on-prod-->
        <!--        <el-space direction="vertical" fill size="large">-->
        <!--/remove-on-prod-->
        <invitation-count-card />

        <!--remove-on-prod-->
        <!--          <colored-card type="primary">-->
        <!--            <box-wrapper type="primary" class="fs-extra-large">-->
        <!--              *Decorative animation*-->
        <!--            </box-wrapper>-->
        <!--          </colored-card>-->
        <!--        </el-space>-->
        <!--/remove-on-prod-->
      </el-col>
    </el-row>
    <div class="referrals-list p-extra-large">
      <div style="justify-content: space-between" class="mb-medium d-flex">
        <h2 class="m-0">Invitation history</h2>
        <div class="d-flex">
          <SvgInfo class="mr-small icon-small" /> New wallets without any
          activity will not be considered as a new user.
        </div>
      </div>
      <hr class="my-extra-arge">
      <div class="referrals-table">
        <div class="referrals-header">User</div>
        <div class="referrals-header">Completed missions</div>
        <div class="referrals-header">Registration date</div>
        <template v-if="referrals.searchResults.length > 0">
          <template
            v-for="referralsItem in referrals.searchResults"
            :key="referralsItem.username"
          >
            <div class="referrals-element first fs-medium bold">
              <el-avatar
                :src="getAvatar(referralsItem.username)"
                class="mr-small"
              >
              </el-avatar>
              <span style="width: 75%">
                {{ referralsItem.username }}
                <span class="joined-text">has joined archway missions.</span>
              </span>
            </div>
            <div class="referrals-element fs-medium">
              {{ referralsItem.missionCount }}
            </div>
            <div class="referrals-element last fs-medium">
              {{ moment(referralsItem.registrationDate).format("LLL") }}
            </div>
          </template>
        </template>
      </div>
      <template v-if="referrals.searchResults.length > 0">
        <el-row
          justify="space-between"
          align="middle"
          class="px-large my-large"
        >
          <el-col :span="-1" class="bold">
            showing
            <span class="archway-orange">
              {{ page * perPage - perPage + 1 }}-{{
                page * perPage - perPage + referrals.searchResults.length
              }}
            </span>
            of {{ referrals.totalRows }} results
          </el-col>
          <el-col :span="-1">
            <el-pagination
              class="fs-extra-large"
              layout="prev, pager, next"
              :total="referrals.totalRows"
              :page-size="perPage"
              @current-change="currentPageChange"
            />
          </el-col>
          <el-col :span="-1">
            <strong>Results per page: </strong>
            <strong class="archway-orange">{{ perPage }}</strong>
            <el-dropdown
              class="dropdown"
              placement="top-end"
              :hide-on-click="true"
              @command="perPageChange"
            >
              <span class="el-dropdown-link">
                <el-icon class="el-icon--right">
                  <svg-chevron-up />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :command="10">10</el-dropdown-item>
                  <el-dropdown-item :command="25">25</el-dropdown-item>
                  <el-dropdown-item :command="50">50</el-dropdown-item>
                  <el-dropdown-item :command="100">100</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </template>
      <template v-if="referrals.searchResults.length < 1">
        <el-row class="fs-large mt-extra-large pb-large" justify="center">
          No data
        </el-row>
      </template>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from "@/components/PageWrapper.vue";
// import ColoredCard from "@/components/ColoredCard.vue";
import CopyBox from "@/components/CopyBox.vue";
// import BoxWrapper from "@/components/BoxWrapper.vue";
import InvitationCountCard from "@/components/InvitationCountCard.vue";
import { useStore, StoreType } from "@/store";
import { store } from "@/store";
import { onMounted, Ref, ref } from "vue";
import { renderDiscs } from "@whi/identicons";
import ReferralListResponse from "@/common/api/ReferralListResponse";
import ReferralListRequest from "@/common/api/ReferralListRequest";
import moment from "moment/moment";

const store: StoreType = useStore();
moment.locale("en-gb");

let page = ref(1);
let perPage = ref(10);
let referrals: Ref<ReferralListResponse> = ref(new ReferralListResponse());

async function getreferrals() {
  let referralListRequest: ReferralListRequest = new ReferralListRequest(
    page.value,
    perPage.value,
    "registrationDate"
  );

  referrals.value = await store.dispatch(
    "HttpModule/getReferrals",
    referralListRequest
  );
}

function currentPageChange(newVal: number) {
  page.value = newVal;
  getreferrals();
}

function perPageChange(newVal: number) {
  perPage.value = newVal;
  getreferrals();
}

function getAvatar(userWallet: string) {
  return renderDiscs({
    seed: userWallet,
    base: 0.06,
    size: 170,
    maxDiscs: 4,
    colorRange: 1,
  }).dataURL;
}

onMounted(async () => {
  await getreferrals();
});
</script>

<style lang="scss">
.limit-width.referrals {
  max-width: 1000px;
}

.referrals-table {
  display: grid;
  grid-template-columns: 6fr 3fr 3fr;
  row-gap: 1em;

  .el-avatar {
    width: 2em;
    height: 2em;
  }

  > * {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4em 0;

    &.first {
      border-bottom-left-radius: 1em;
      border-top-left-radius: 1em;
    }
    &.last {
      border-bottom-right-radius: 1em;
      border-top-right-radius: 1em;
    }
  }

  .referrals-header {
    font-weight: bold;
  }

  .referrals-element {
    padding-top: 0.6em;
    padding-bottom: 0.6em;
    background: #fff;
    box-shadow: 0px 4px 50px -31px rgba(0, 0, 0, 0.5);
  }
}

.el-dropdown-menu__item:not(.is-disabled) {
  font-size: 1.5em;
  font-weight: 700;
  &:focus,
  &:hover {
    color: red;
  }
}

.el-dropdown-menu__item.is-disabled {
  font-size: 1.5em;
  font-weight: 700;
}

.title {
  color: var(--Obsidian-Shard, #060612);
  font-size: 24px;
  font-style: normal;
  font-weight: 900;
  text-transform: uppercase;
}

.referral-link {
  border-radius: 2px;
  border: 1px solid var(--Obsidian-Shard, #060612);
  background: var(--Obsidian-Shard, #060612);
  box-shadow: 3px 3px 0px 0px #d4e68c, 4px 4px 0px 0px #060612;
}

.referrals-list {
  border-radius: 4px;
  border: 1px solid var(--Obsidian-Shard, #060612);
  background: var(--White, #fff);
  box-shadow: 3px 3px 0px 0px #b3dbd5, 4px 4px 0px 0px #060612;
}

.referral-info {
  padding: 2em 4em 3em 4em;
  align-items: center;
  border-radius: 4px;
  border: 1px solid var(--Obsidian-Shard, #060612);
  background: var(--White, #fff);
  box-shadow: 3px 3px 0px 0px #d4e68c, 4px 4px 0px 0px #060612;
}
</style>
