<template>
	<section>
		<div class="container">
			<div class="grid items-center gap-8 lg:grid-cols-2">
				<div class="flex flex-col items-center py-32 text-center lg:mx-auto lg:items-start lg:px-0 lg:text-left">
					<p>New Release</p>
					<h1 class="my-6 text-pretty text-4xl font-bold lg:text-6xl">Welcome to Our Website</h1>
					<p class="mb-8 max-w-xl text-muted-foreground lg:text-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.</p>
					<div class="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
						<Button class="w-full sm:w-auto">
							<ArrowRight class="mr-2 size-4" />
							Primary
						</Button>
						<Button variant="outline" class="w-full sm:w-auto"> Secondary </Button>
					</div>
				</div>
				<div class="relative aspect-[3/4]">
					<div class="absolute inset-0 flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 800 800" class="size-full text-muted-foreground opacity-20">
							<circle
								v-for="(dot, index) in Array.from(Array(720).keys())"
								:key="index"
								:r="(3 * index) / 720"
								:cx="400 + Math.round(Math.cos(0.2 * index) * (40 + index * (360 / 720)))"
								:cy="400 + Math.round(Math.sin(0.2 * index) * (40 + index * (360 / 720)))"
								:opacity="1 - Math.sin(0.2 * index)"
							/>
						</svg>
					</div>
					<div class="absolute left-[8%] top-[10%] flex aspect-[5/6] w-[38%] justify-center rounded-lg border border-border bg-accent"></div>
					<div class="absolute right-[12%] top-[20%] flex aspect-square w-1/5 justify-center rounded-lg border border-border bg-accent"></div>
					<div class="absolute bottom-[24%] right-[24%] flex aspect-[5/6] w-[38%] justify-center rounded-lg border border-border bg-accent"></div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import { ArrowRight } from "lucide-vue-next";
// import Button from "@/components/ui/button.vue";
</script>
