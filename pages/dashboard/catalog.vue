<template>
	<div class="flex flex-col h-full">
		<div class="flex items-stretch justify-stretch h-full">
			<AgGridVue
				class="w-full h-full"
				:pagination="true"
				:theme="colorMode.value === 'light' ? lightTableTheme : darkTableTheme"
				:rowData="useCatalog.rowData"
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
	</div>
</template>

<script setup>
import { AgGridVue } from "ag-grid-vue3";

const useCatalog = useCatalogStore();

await useCatalog.fetchProducts();
await useCatalog.fetchGroupNames();

useHead({
	title: "Каталог",
});

const colorMode = useColorMode();

const originalData = ref({});
const selectedRows = ref([]);

const onCellEditingStarted = (event) => {
	originalData.value[event.data.id] = { ...event.data };
};

const onCellEditingStopped = async (event) => {
	const updatedData = event.data;
	const originalRow = originalData.value[updatedData.id];
	const hasChanged = Object.keys(updatedData).some((key) => updatedData[key] !== originalRow[key]);

	if (hasChanged) {
		updatedData.purchase_price = useCatalog.cleanPrice(updatedData.purchase_price);
		updatedData.retail_price = useCatalog.cleanPrice(updatedData.retail_price);

		try {
			const response = await fetch(`http://127.0.0.1:8000/api/catalog/${updatedData.id}`, {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedData),
			});

			if (!response.ok) throw new Error("Failed to update product.");
			console.log("Successfully updated product:", updatedData);
		} catch (error) {
			console.error("Error updating product:", error);
		}
	} else {
		console.log("No changes detected, no update needed.");
	}
};

const onSelectionChanged = (event) => {
	selectedRows.value = event.api.getSelectedRows();
	useCatalog.setSelectedRows(selectedRows.value);
};

const onGridReady = (params) => {
	params.api.sizeColumnsToFit();
};

// Column definitions
const columnDefs = ref([
	{ field: "id", headerName: "ID", editable: false, checkboxSelection: true },
	{
		field: "img",
		headerName: "Фото",
		editable: true,
		cellRenderer: (params) => `<img src="${params.value}" alt="Product Image" class="w-auto h-full" />`,
	},
	{ field: "name", headerName: "Название", editable: true },
	{
		field: "purchase_price",
		headerName: "Закупочная цена",
		editable: true,
		valueFormatter: (params) => useCatalog.formatPrice(params.value),
	},
	{
		field: "retail_price",
		headerName: "Розничная цена",
		editable: true,
		valueFormatter: (params) => useCatalog.formatPrice(params.value),
	},
	{ field: "unit", headerName: "Ед. изм.", editable: true },
	{ field: "vendor_code", headerName: "Артикул", editable: true },
	{
		field: "catalog_group_id",
		headerName: "Группа",
		editable: true,
		cellEditor: "agSelectCellEditor",
		cellEditorParams: {
			values: Object.keys(useCatalog.groupNames),
			formatValue: (id) => useCatalog.groupNames[id],
		},
		valueFormatter: (params) => useCatalog.groupNames[params.value],
		onCellValueChanged: (event) => {
			event.node.setDataValue("catalog_group_id", event.newValue);
		},
	},
]);

const defaultColDef = ref({
	sortable: true,
	filter: true,
	resizable: true,
});
</script>
