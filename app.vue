<script setup lang="ts">
const route = useRoute();
const isDashboardRoute = computed(() => route.path.includes("/dashboard"));
</script>

<template>
	<NuxtLayout :name="isDashboardRoute ? 'dashboard-navigation' : 'default'">
		<NuxtPage />
	</NuxtLayout>
</template>
