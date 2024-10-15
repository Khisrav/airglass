<script setup lang="ts">
import { Home, Users, Boxes, FileBox, Calculator } from "lucide-vue-next";
const props = defineProps({
	item: {
		type: Object,
		required: true,
	},
});

const useMenu = useMenuStore();

const iconMap: Record<string, IconComponent> = {
	Home,
	Calculator,
	Users,
	Boxes,
	FileBox,
};

const resolveIcon = (iconName: string): IconComponent => {
	return iconMap[iconName] || Home; // Fallback to Home if icon not found
};
</script>

<template>
	<NuxtLink :to="item.to" class="flex items-center gap-3 rounded-lg px-3 py-2 transition-all" :class="[item.isActive ? 'bg-muted text-primary' : 'text-muted-foreground hover:text-primary']">
		<!-- <item.icon class="h-4 w-4" /> -->
		<component :is="resolveIcon(item.icon)" class="h-4 w-4" />
		{{ item.label }}
		<Badge v-if="item.badge" class="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">{{ item.badge }}</Badge>
	</NuxtLink>
</template>
