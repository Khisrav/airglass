<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
	params: {
		data: {
			src?: string;
			name?: string;
		};
	};
}>();

const src = !props.params.data.src ? "https://avatar.iran.liara.run/username?username=" + props.params.data.name : props.params.data.src;
</script>

<template>
	<img :src="src" class="rounded-full w-5 h-5" />
</template>
