<script setup lang="ts">
import { Menu, Trash2, Plus, MoreVertical, PackagePlus, FilePlus2 } from "lucide-vue-next";

const config = useRuntimeConfig(),
	route = useRoute(),
	useMenu = useMenuStore();

const catalogStore = useCatalogStore(),
	userStore = useUserStore();

const deleteRows = () => {
	switch (route.path) {
		case "/dashboard/catalog":
			catalogStore.deleteSelectedRows();
			break;

		case "/dashboard/users":
			userStore.deleteSelectedRows();
			break;
	}
};
</script>

<template>
	<header class="flex h-14 w-screen md:w-auto items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
		<Sheet>
			<SheetTrigger as-child>
				<Button variant="outline" size="icon" class="shrink-0 md:hidden">
					<Menu class="h-5 w-5" />
					<span class="sr-only">Toggle navigation menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" class="flex flex-col">
				<a href="/" class="font-bold">
					<!-- <Package2 class="h-6 w-6" /> -->
					<span class="">{{ config.public.appName }}</span>
				</a>
				<DashboardSidebarMenu />

				<DashboardBottomNavigationCard class="sm:hidden" />
			</SheetContent>
		</Sheet>
		<div class="w-full flex items-center justify-between">
			<h1 class="text-lg font-semibold md:text-2xl">{{ useMenu.activePageLabel() }}</h1>
			<div v-if="!['/dashboard', '/dashboard/calculator'].includes(route.path)" class="space-x-4">
				<!-- delete selected rows when clicked this button -->
				<Button variant="outline" size="icon" @click="deleteRows()">
					<Trash2 class="w-4 h-4" />
				</Button>
				<Button variant="outline" size="icon">
					<Plus class="w-4 h-4" />
				</Button>
				<!-- Make catalog group editor -->
				<DropdownMenu v-if="['/dashboard/catalog', '/dashboard/templates'].includes(route.path)">
					<DropdownMenuTrigger>
						<Button variant="outline" size="icon">
							<MoreVertical class="size-4" />
							<span class="sr-only">More</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<div class="flex justify-between gap-4 items-center h-6">
								<PackagePlus class="w-4 h-4" />
								<span>Создать группу каталога</span>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<div class="flex justify-between gap-4 items-center h-6">
								<FilePlus2 class="w-4 h-4" />
								<span>Создать группу шаблона</span>
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	</header>
</template>
