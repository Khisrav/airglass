<script setup>
import { ref, onMounted } from "vue";
import { Check, ChevronsUpDown } from "lucide-vue-next";
import Command from "~/components/ui/command/Command.vue";
import CommandEmpty from "~/components/ui/command/CommandEmpty.vue";
import CommandGroup from "~/components/ui/command/CommandGroup.vue";
import CommandInput from "~/components/ui/command/CommandInput.vue";
import CommandItem from "~/components/ui/command/CommandItem.vue";
import CommandList from "~/components/ui/command/CommandList.vue";
import { useTemplateStore } from "~/stores/templateStore";
import { useTemplateGroupStore } from "~/stores/templateGroupStore";

const templateStore = useTemplateStore();
const templateGroupStore = useTemplateGroupStore();

const open = ref(false);
const value = ref("");
const loading = ref(true);

const fetchData = async () => {
	loading.value = true;
	try {
		await Promise.all([templateStore.fetchTemplates(), templateGroupStore.fetchTemplateGroups()]);
	} catch (error) {
		console.error("Error fetching data:", error);
	} finally {
		loading.value = false;
	}
};

onMounted(fetchData);

const handleOnSelect = (selectedValue) => {
	value.value = selectedValue;
	open.value = false;
};
</script>

<template>
	<div class="ring-2 rounded-lg ring-solid ring-offset-0 ring-neutral-200/50 dark:ring-slate-900 p-4">
		<h1 class="text-2xl font-medium mb-4">Редактирование шаблона</h1>
		<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
			<div>
				<Popover v-model:open="open">
					<PopoverTrigger as-child>
						<Button variant="outline" role="combobox" :aria-expanded="open" class="justify-between w-full">
							{{ value ? templateStore.rowData.find((template) => template.name === value)?.name : "Выберите шаблон..." }}
							<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
						</Button>
					</PopoverTrigger>
					<PopoverContent class="xs:w-[calc(100vw-32px)] md:w-full p-0 m-4">
						<Command>
							<CommandInput class="h-9" placeholder="Выберите шаблон..." />
							<CommandEmpty>Тут пусто.</CommandEmpty>
							<CommandList>
								<template v-if="loading">
									<CommandItem>Loading...</CommandItem>
								</template>
								<template v-else>
									<CommandGroup v-for="group in templateGroupStore.rowData" :key="group.id" :heading="group.name">
										<CommandItem v-for="template in templateStore.rowData.filter((template) => template.template_group_id === group.id)" :key="template.id" :value="template.name" @select="handleOnSelect(template.name)">
											{{ template.name }}
											<Check
												:class="[
													{
														'opacity-100': value === template.name,
														'opacity-0': value !== template.name,
													},
												]"
												class="ml-auto h-4 w-4"
											/>
										</CommandItem>
									</CommandGroup>
								</template>
							</CommandList>
						</Command>
					</PopoverContent>
				</Popover>
			</div>
			<div>
			    <p>Вы редактируете</p>
			</div>
		</div>
		
	</div>
</template>
