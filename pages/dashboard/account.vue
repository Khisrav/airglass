<script setup></script>
<template>
	<div class="m-4 ring-2 rounded-lg ring-solid ring-offset-0 ring-neutral-200/50 dark:ring-slate-900 p-4">
		<h1 class="text-lg font-semibold md:text-2xl mb-4">Мой аккаунт</h1>
		<form class="">
			<div class="grid md:grid-cols-3 gap-4">
				<div class="">
					<div class="flex items-center gap-4 mb-4">
						<NuxtImg src="https://avatar.iran.liara.run/username?username=John%20Doe" class="size-20" />
						<div>
							<span class="text-lg font-medium block">Иванов Иван Иванович</span>
							<!-- <Button variant="link" size="sm" class="m-0 p-0 underline font-normal">Изменить</Button> -->
						</div>
					</div>
					<FormField>
						<FormItem>
							<FormLabel>Изменить аватар</FormLabel>
							<FormControl>
								<Input class="mt-2" type="file" placeholder="Иванов Иван Иванович" />
							</FormControl>
						</FormItem>
					</FormField>
				</div>
				<div>
					<FormField>
						<FormItem>
							<FormLabel>Как вас зовут?</FormLabel>
							<FormControl>
								<Input class="mt-2" type="text" placeholder="Иванов Иван Иванович" />
							</FormControl>
						</FormItem>
					</FormField>
					<FormField>
						<FormItem>
							<FormLabel>Ваш номер телефона</FormLabel>
							<FormControl>
								<Input class="mt-2" type="text" placeholder="Иванов Иван Иванович" />
							</FormControl>
						</FormItem>
					</FormField>
					<FormField>
						<FormItem>
							<FormLabel>Ваша почтовый адрес</FormLabel>
							<FormControl>
								<Input class="mt-2" type="text" placeholder="Иванов Иван Иванович" />
							</FormControl>
						</FormItem>
					</FormField>
				</div>
				<div>
					<FormField>
						<FormItem>
							<FormLabel>Название компании\организации</FormLabel>
							<FormControl>
								<Input class="mt-2" type="text" placeholder="Иванов Иван Иванович" />
							</FormControl>
						</FormItem>
					</FormField>
					<div>привязанные акки</div>
				</div>
			</div>
			<Button type="submit" class="mt-4">Сохранить</Button>
		</form>
	</div>
</template>

<style scoped>
input {
	margin-bottom: 16px;
}
</style>
