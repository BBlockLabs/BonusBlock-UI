<template>
  <el-table :data="tableData">
    <el-table-column :min-width="10" prop="id" label="#"/>
    <el-table-column :min-width="35" prop="blockTime" label="Block time"/>
    <el-table-column prop="trxId" label="Transaction Hash/ID">
      <template #default="scope">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Open transaction details in BSCScan"
          raw-content
          placement="bottom-start"
        >
          <el-link :href="'https://testnet.bscscan.com/tx/' + scope.row.trxId" target="_blank" :underline="false">
            {{ scope.row.trxId.substring(0, 35) }}...
          </el-link>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="sender" label="Sender address"/>
    <el-table-column prop="functionName" label="Function Name"/>
  </el-table>
</template>

<script lang="ts" setup>
defineProps(["tableData"]);
</script>
