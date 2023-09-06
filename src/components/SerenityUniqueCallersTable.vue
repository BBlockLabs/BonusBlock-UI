<template>
  <el-table :data="tableData">
    <el-table-column :min-width="10" prop="id" label="#"/>
    <el-table-column prop="senderAddress" label="Sender address">
      <template #default="scope">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Open address details in BSCScan"
          raw-content
          placement="bottom-start"
        >
          <el-link :href="'https://testnet.bscscan.com/address/'+ scope.row.senderAddress" target="_blank" :underline="false">
            {{ scope.row.senderAddress }}
          </el-link>
        </el-tooltip>
      </template>
    </el-table-column>
    <el-table-column prop="count" label="Times called"/>

  </el-table>
</template>

<script lang="ts" setup>
defineProps(["tableData"]);
</script>
