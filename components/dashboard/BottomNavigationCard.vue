<script setup lang="ts">
import { LogOut, UserRound } from "lucide-vue-next";

// import { Button, Card, CardHeader, CardTitle, CardDescription, CardContent } from "your-ui-library";
</script>

<template>
	<Card>
		<CardHeader>
			<!-- <CardTitle>Upgrade to Pro</CardTitle> -->
			<CardDescription>
				<Button variant="outline" size="sm" class="w-full text-left text-primary flex justify-start">
					<UserRound class="w-4 h-4 mr-4" />
					<span>Мой аккаунт</span>
				</Button>
			</CardDescription>
		</CardHeader>
		<CardContent>
			<Button variant="outline" size="sm" class="w-full text-left text-primary flex justify-start">
				<LogOut class="w-4 h-4 mr-4" />
				<span>Выйти</span>
			</Button>
		</CardContent>
	</Card>
</template>
