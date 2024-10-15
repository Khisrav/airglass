<template>
	<div class="flex items-stretch justify-stretch h-full">
		<AgGridVue
			class="w-full h-full"
			:pagination="true"
			:theme="colorMode.value === 'light' ? lightTableTheme : darkTableTheme"
			:rowData="useUser.rowData"
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

<script setup>
import { AgGridVue } from "ag-grid-vue3";

const useUser = useUserStore();

await useUser.fetchUsers();

useHead({
	title: "Пользователи",
});

const colorMode = useColorMode();

const originalData = ref({});
const selectedRows = ref([]);

const onCellEditingStarted = (event) => {
	originalData.value[event.data.id] = { ...event.data };
};

const onCellEditingStopped = async (event) => {
	const updatedData = event.data; // The edited row data
	await useUser.updateUser(updatedData);
};

const onSelectionChanged = (event) => {
	selectedRows.value = event.api.getSelectedRows();
	useUser.setSelectedRows(selectedRows.value);
};

const columnDefs = ref([
	{ field: "id", headerName: "ID", editable: false, checkboxSelection: true },
	{
		headerName: "Ф.И.О.",
		field: "name",
		editable: true,
		cellRenderer: (params) => {
			const avatar = params.data.avatar || `https://avatar.iran.liara.run/username?username=${params.data.name}`;
			const name = params.data.name;
			return `<div class="flex items-center">
		  <img src="${avatar}" alt="Avatar" class="rounded-full w-6 h-6 mr-4" />
		  <span>${name}</span>
		</div>`;
		},
	},
	{ field: "email", headerName: "Почта", editable: true },
	{
		field: "phone",
		headerName: "Телефон",
		editable: true,
		valueFormatter: (params) => useUser.formatPhoneNumber(params.value), // Format phone number on display
	},
	{ field: "company", headerName: "Компания", editable: true },
	{
		field: "discount",
		headerName: "Скидка",
		editable: true,
		valueFormatter: (params) => `${params.value.replace("%", "")}%`, // Ensure '%' is shown
	},
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
