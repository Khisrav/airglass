<script setup lang="ts">
import type menuProps from "~/utils/menuUtils";

const props = defineProps<menuProps>();
console.log(props);
</script>

<template>
	<nav class="grid items-start text-sm font-medium lg:px-4">
		<DashboardSidebarNavigationItem v-for="(item, index) in props.menuItems" :key="index" :item="item" />
	</nav>
</template>
