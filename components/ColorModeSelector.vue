<script setup lang="ts">
import { Moon, Sun } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const colorMode = useColorMode();
console.log(colorMode.preference);
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="outline" size="sm">
				<Moon class="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<Sun class="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				<span class="sr-only">Toggle theme</span>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuItem @click="colorMode.preference = 'light'"> Светлая </DropdownMenuItem>
			<DropdownMenuItem @click="colorMode.preference = 'dark'"> Темная </DropdownMenuItem>
			<DropdownMenuItem @click="colorMode.preference = 'system'"> Системная </DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>
