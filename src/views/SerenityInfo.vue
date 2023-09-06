<template>
  <PageWrapper :full-width="true" class="fs-slightly-larger">
    <div class="my-small">Total successful TX count: {{ totalCount }}</div>
    <h1>Successful transactions from {{uniqueCalls ? uniqueCalls.length : ""}} unique  addresses:</h1>
    <SerenityUniqueCallersTable
      v-loading="!uniqueCalls"
      style="height: 33.5em; overflow: auto"
      :table-data="uniqueCalls"
    />
    <h1>100 latest successful transactions:</h1>
    <SerenityLatestCallsTable
      v-loading="!latestTransactions"
      style="height: 33.5em; overflow: auto"
      :table-data="latestTransactions"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import SerenityLatestCallsTable from "@/components/SerenityLatestCallsTable.vue";
import SerenityUniqueCallersTable from "@/components/SerenityUniqueCallersTable.vue";
import PageWrapper from "@/components/PageWrapper.vue";
import HttpResponse from "@/common/api/HttpResponse";
import { StoreType, useStore } from "@/store";
import { ref } from "vue";

const store: StoreType = useStore();

let latestTransactions = ref();
let uniqueCalls = ref();
let totalCount = ref();

async function loadData() {
  const response: Response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/serenity/getLastInteractions`,
    {
      body: null,
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": store.state.UserModule?.token || "",
      },
      method: "POST",
    }
  );
  const responseData = await HttpResponse.fromResponse<null>(response);

  const latestContractCallsResponse = responseData.payload.latestContractCalls;
  const uniqueCallsResponse = responseData.payload.uniqueCallers;
  totalCount.value = responseData.payload.totalCount;

  let latestContractCallsRet = [];
  for (let i = 0; i < latestContractCallsResponse.length; i++) {
    let el = latestContractCallsResponse[i];
    el.id = i + 1;
    latestContractCallsRet.push(el);
  }
  latestTransactions.value = latestContractCallsRet;

  let uniqueCallsRet = [];
  for (let i = 0; i < uniqueCallsResponse.length; i++) {
    let el = uniqueCallsResponse[i];
    el.id = i + 1;
    uniqueCallsRet.push(el);
  }
  uniqueCalls.value = uniqueCallsRet;
}

loadData();
</script>
