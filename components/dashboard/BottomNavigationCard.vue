<script setup lang="ts">
import { LogOut, UserRound } from "lucide-vue-next";

// import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "your-ui-library";
</script>

<template>
	<NuxtLink to="/dashboard/account">
		<Button variant="outline" size="sm" class="w-full text-left text-primary flex justify-start">
			<UserRound class="w-4 h-4 mr-4" />
			<span>Мой аккаунт</span>
		</Button>
	</NuxtLink>
	<div class="flex gap-4 md:mt-4">
		<Button variant="outline" size="sm" class="w-full text-left text-primary flex justify-start">
			<LogOut class="w-4 h-4 mr-4" />
			<span>Выйти</span>
		</Button>
		<ColorModeSelector />
	</div>
</template>
