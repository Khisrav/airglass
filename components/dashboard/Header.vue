<script setup lang="ts">
import { Search, CircleUser, Menu } from "lucide-vue-next";

const config = useRuntimeConfig();
</script>

<template>
	<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
		<Sheet>
			<SheetTrigger as-child>
				<Button variant="outline" size="icon" class="shrink-0 md:hidden">
					<Menu class="h-5 w-5" />
					<span class="sr-only">Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" class="flex flex-col">
				<a href="/" class="font-bold">
					<Package2 class="h-6 w-6" />
					<span class="">{{ config.public.appName }}</span>
				</a>
				<DashboardSidebarMenu />

				<DashboardBottomNavigationCard class="sm:hidden" />
			</SheetContent>
		</Sheet>
		<div class="w-full flex-1"></div>
		<DropdownMenu>
			<DropdownMenuTrigger as-child>
				<!-- <Button variant="secondary" size="icon" class="rounded-full">
					<CircleUser class="h-5 w-5" />
					<span class="sr-only">Toggle user menu</span>
				</Button> -->
				<!-- some actions must be here -->
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Settings</DropdownMenuItem>
				<DropdownMenuItem>Support</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Logout</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</header>
</template>
