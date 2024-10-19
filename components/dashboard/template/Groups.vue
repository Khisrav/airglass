<script setup>
import { AgGridVue } from "ag-grid-vue3";

const useTemplateGroup = useTemplateGroupStore();

if (useTemplateGroup.rowData.length === 0) {
	await useTemplateGroup.fetchTemplateGroups();
}

const colorMode = useColorMode(),
	originalData = ref({}),
	selectedRows = ref([]);

const onCellEditingStarted = (event) => {
	originalData.value[event.data.id] = { ...event.data };
};

const onSelectionChanged = (event) => {
	selectedRows.value = event.api.getSelectedRows();
	useTemplateGroup.selectedRows(selectedRows.value);
};

const onCellEditingStopped = async (event) => {
	const updatedData = event.data;
	useTemplateGroup.updateTemplateGroup(updatedData);
};

const columnDefs = ref([
	{ field: "id", headerName: "ID", editable: false, checkboxSelection: true },
	{ field: "name", headerName: "Название", editable: true },
]);

const defaultColDef = ref({
	sortable: true,
	filter: true,
	resizable: true,
});

const onGridReady = (params) => {
	params.api.sizeColumnsToFit();
};
</script>

<template>
	<div class="flex flex-1 h-full">
		<AgGridVue
			class="flex-1 w-full h-full"
			:pagination="true"
			:theme="colorMode.value === 'light' ? lightTableTheme : darkTableTheme"
			:rowData="useTemplateGroup.rowData"
			:columnDefs="columnDefs"
			:localeText="localeRU"
			:defaultColDef="defaultColDef"
			:rowSelection="'multiple'"
			:paginationPageSize="20"
			@grid-ready="onGridReady"
			@selection-changed="onSelectionChanged"
			@cell-editing-started="onCellEditingStarted"
			@cell-editing-stopped="onCellEditingStopped"
		/>
	</div>
</template>
