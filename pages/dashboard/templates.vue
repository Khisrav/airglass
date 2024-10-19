<script setup>
import Tabs from "~/components/ui/tabs/Tabs.vue";
import TabsContent from "~/components/ui/tabs/TabsContent.vue";
import TabsList from "~/components/ui/tabs/TabsList.vue";
import TabsTrigger from "~/components/ui/tabs/TabsTrigger.vue";

useHead({
	title: "Шаблоны",
});
</script>

<template>
	<Tabs default-value="template_groups" class="h-[calc(100%-48px)] p-4">
		<TabsList>
			<TabsTrigger value="template_groups"> Группы </TabsTrigger>
			<TabsTrigger value="templates"> Шаблоны </TabsTrigger>
		</TabsList>
		<TabsContent value="template_groups" class="h-full">
			<DashboardTemplateGroups class="flex flex-1 h-full" />
		</TabsContent>
		<TabsContent value="templates">
			<DashboardTemplate />
		</TabsContent>
	</Tabs>
</template>
