import { defineStore } from "pinia";
import Swal from "sweetalert2";

const config = useRuntimeConfig();

export const useCatalogStore = defineStore("catalog", {
    state: () => ({
        selectedRows: [],
        rowData: [],
        groupNames: {}, // To store group names by ID
    }),
    actions: {
        async fetchProducts() {
            try {
                const response = await this.apiRequest(`${config.public.API_BASE_URL}/catalog`, {
                    method: "GET",
                });
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
                const response = await this.apiRequest(`${config.public.API_BASE_URL}/catalog-groups`, {
                    method: "GET",
                });
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
                            await this.apiRequest(`${config.public.API_BASE_URL}/catalog/${row.id}`, {
                                method: "DELETE",
                            });
                        }

                        this.rowData = this.rowData.filter(
                            (row) => !rowsToDelete.includes(row)
                        );
                        this.selectedRows = [];

                        Swal.fire(
                            "Deleted!",
                            "The selected rows have been deleted.",
                            "success"
                        );
                    } catch (error) {
                        Swal.fire(
                            "Error!",
                            "There was an issue deleting the rows.",
                            "error"
                        );
                    }
                }
            });
        },
        async updateCatalog(updatedData) {
            const originalRow = this.rowData.find((product) => product.id === updatedData.id);
            const hasChanged = Object.keys(updatedData).some(
                (key) => updatedData[key] !== originalRow[key]
            );

            if (hasChanged) {
                updatedData.purchase_price = this.cleanPrice(updatedData.purchase_price);
                updatedData.retail_price = this.cleanPrice(updatedData.retail_price);

                try {
                    await this.apiRequest(`${config.public.API_BASE_URL}/catalog/${updatedData.id}`, {
                        method: "PUT",
                        body: JSON.stringify(updatedData),
                    });

                    console.log("Successfully updated product:", updatedData);
                } catch (error) {
                    console.error("Error updating product:", error);
                }
            } else {
                console.log("No changes detected, no update needed.");
            }
        },
        async apiRequest(url, options = {}) {
            const defaultOptions = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${useCookie("authToken").value}`,
                    "Content-Type": "application/json",
                },
            };

            const mergedOptions = { ...defaultOptions, ...options };

            const response = await fetch(url, mergedOptions);

            if (response.status === 401) {
                this.handleUnauthorized();
            } else if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            return response;
        },
        handleUnauthorized() {
            useCookie("authToken").value = null;
            navigateTo("/auth");
            Swal.fire("Unauthorized!", "Please log in again.", "error");
        },
    },
    getters: {
        formatPrice: (state) => (price) =>
            price ? price.toLocaleString() + " ₽" : "0 ₽",
        cleanPrice: (state) => (price) =>
            parseFloat(price.replace(/[₽,\s]/g, "")) || 0,
        groupName: (state) => (groupID) =>
            state.groupNames[groupID] || "Неизвестная группа",
    },
});
