<script setup lang="ts">
import { useMenuStore } from "~/stores/menuStore";

const useMenu = useMenuStore();
</script>

<template>
	<nav class="grid items-start text-normal font-medium lg:px-4">
		<DashboardSidebarNavigationItem v-for="(item, index) in useMenu.menuItems" :key="index" :item="item" />
	</nav>
</template>
