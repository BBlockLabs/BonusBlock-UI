<template>
  <PageWrapper card-back>
    <el-row justify="space-between" :gutter="24" class="w-100 my-extra-large referral-info">
      <el-col :md="16" :lg="17">
        <h3 class="fs-large mb-large title">
          Stack your first rewards by onboarding more users!
        </h3>

        <copy-box class="mt-small fs-normal bold mb-extra-large referral-link" :text="store.getters['UserModule/refLink']" />

        <p class="fs-medium">
          Once a new user signs-up and adds at least one wallet, it will be counted towards a bigger reward.
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
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from "@/components/PageWrapper.vue";
// import ColoredCard from "@/components/ColoredCard.vue";
import CopyBox from "@/components/CopyBox.vue";
// import BoxWrapper from "@/components/BoxWrapper.vue";
import InvitationCountCard from "@/components/InvitationCountCard.vue";
import { useStore, StoreType } from "@/store";

const store: StoreType = useStore();
</script>

<style lang="scss">

.title{
  color: var(--Obsidian-Shard, #060612);
  font-size: 24px;
  font-style: normal;
  font-weight: 900;
  text-transform: uppercase;
}

.referral-link{
  border-radius: 2px;
  border: 1px solid var(--Obsidian-Shard, #060612);
  background: var(--Obsidian-Shard, #060612);
  box-shadow: 3px 3px 0px 0px #D4E68C, 4px 4px 0px 0px #060612;
}

.referral-info{
  padding: 2em 4em 3em 4em;
  align-items: center;
  border-radius: 4px;
  border: 1px solid var(--Obsidian-Shard, #060612);
  background: var(--White, #FFF);
  box-shadow: 3px 3px 0px 0px #D4E68C, 4px 4px 0px 0px #060612;
}
</style>
