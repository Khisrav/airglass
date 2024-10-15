import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    selectedRows: [],
    rowData: [],
    groupNames: {}, // To store group names by ID
  }),
  actions: {
    async fetchProducts() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/catalog");
        const products = await response.json();
        this.rowData = products.map((product) => ({
          ...product,
          purchase_price: product.purchase_price,
          retail_price: product.retail_price,
        }));
      } catch (error) {
        console.error("Error fetching products:", error);
        Swal.fire("Error!", "Failed to fetch products.", "error");
      }
    },
    async fetchGroupNames() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/catalog-groups");
        const groups = await response.json();
        this.groupNames = groups.reduce((acc, group) => {
          acc[group.id] = group.name;
          return acc;
        }, {});
      } catch (error) {
        console.error("Error fetching group names:", error);
        Swal.fire("Error!", "Failed to fetch group names.", "error");
      }
    },
    setSelectedRows(rows) {
      this.selectedRows = rows;
    },
    async deleteSelectedRows() {
      if (this.selectedRows.length === 0) return;

      Swal.fire({
        title: "Are you sure?",
        text: "You are about to delete the selected rows. This action cannot be undone!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const rowsToDelete = [...this.selectedRows];

          try {
            for (const row of rowsToDelete) {
              const response = await fetch(`http://127.0.0.1:8000/api/catalog/${row.id}`, {
                method: "DELETE",
              });

              if (!response.ok) throw new Error(`Failed to delete product with ID: ${row.id}`);
            }

            this.rowData = this.rowData.filter((row) => !rowsToDelete.includes(row));
            this.selectedRows = [];

            Swal.fire("Deleted!", "The selected rows have been deleted.", "success");
          } catch (error) {
            Swal.fire("Error!", "There was an issue deleting the rows.", "error");
          }
        }
      });
    },
  },
  getters: {
    formatPrice: (state) => (price) => price ? price.toLocaleString() + " ₽" : "0 ₽",
    cleanPrice: (state) => (price) => parseFloat(price.replace(/[₽,\s]/g, "")) || 0,
    groupName: (state) => (groupID) => state.groupNames[groupID] || 'Неизвестная группа',
  }
});
