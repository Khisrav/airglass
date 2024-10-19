<script setup lang="ts">
useSeoMeta({
	title: "Вход",
	ogTitle: "Вход",
	description: "Вход",
	ogDescription: "Вход",
	ogUrl: "https://airglass.dev/auth",
	ogType: "website",
	ogImage: "https://airglass.dev/logo.png",
});
// const config = useRuntimeConfig();
</script>
<template>
	<div class="grid sm:grid-cols-2 grid-cols-1 content-stretch sm:h-screen">
		<div class="bg-black text-background p-4 flex items-center justify-center">
			<div>
				<h1 class="text-4xl font-bold mb-4">AirGlass</h1>
				<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
			</div>
		</div>
		<div class="p-4 flex items-center justify-center sm:mt-0 mt-16">
			<Card class="max-w-96">
				<CardHeader>
					<CardTitle>Варианты входа</CardTitle>
					<CardDescription>Выберите сервис для авторизации на сайт</CardDescription>
				</CardHeader>
				<CardContent>
					<NuxtLink :to="'http://127.0.0.1:8000/login/google'">
						<!-- <NuxtLink :to="'http://192.168.164.70:8000/login/google'"> -->
						<Button class="w-full" :variant="'outline'">
							<NuxtImg src="icons/google.svg" class="w-5 mr-4" />
							<span>Войти через Google</span>
						</Button>
					</NuxtLink>
					<Button class="w-full my-4" :variant="'outline'">
						<NuxtImg src="icons/vk.svg" class="w-5 mr-4" />
						<span>Войти через VK</span>
					</Button>
					<Button class="w-full" :variant="'outline'">
						<NuxtImg src="icons/yandex.svg" class="w-5 mr-4" />
						<span>Войти через Yandex</span>
					</Button>
				</CardContent>
				<CardFooter> <NuxtLink to="/" class="text-primary underline">← Вернутся на главную</NuxtLink> </CardFooter>
			</Card>
		</div>
	</div>
</template>
