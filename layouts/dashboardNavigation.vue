<script setup lang="ts">
const config = useRuntimeConfig();
const useMenu = useMenuStore();

// useHead({
// 	link: [
// 		{
// 			rel: "stylesheet",
// 			href: "https://unpkg.com/ag-grid-community/styles/ag-grid.css",
// 		},
// 		{
// 			rel: "stylesheet",
// 			href: "https://unpkg.com/ag-grid-community/styles/ag-theme-alpine.css",
// 		},
// 	],
// });
</script>

<template>
	<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
		<div class="hidden border-r bg-muted/40 md:block">
			<div class="flex h-full max-h-screen flex-col gap-2">
				<div class="flex h-14 items-center border-b lg:h-[60px]">
					<a href="/" class="flex items-center font-semibold pl-6">
						<!-- <Package2 class="h-6 w-6" /> -->
						<span class="dark:text-red">{{ config.public.appName }}</span>
					</a>
				</div>
				<DashboardSidebarMenu />
				<div class="mt-auto p-4">
					<DashboardBottomNavigationCard />
				</div>
			</div>
		</div>
		<div class="flex flex-col">
			<DashboardHeader />
			<!-- <main class="p-4 lg:p-6">
				<slot />
			</main> -->
			<main class="flex flex-1 flex-col">
				<slot />
				<!-- <DashboardEmptyState /> -->
			</main>
		</div>
	</div>
</template>
