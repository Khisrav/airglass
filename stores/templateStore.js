const config = useRuntimeConfig();

export const useTemplateStore = defineStore("template", {
    state: () => ({
        selectedRows: [],
        rowData: [],
    }),
    actions: {
        async fetchTemplates() {
            if (this.rowData.length > 0) return;
            try {
                const response = await this.apiRequest(`${config.public.API_BASE_URL}/templates`, {
                    method: "GET",
                });
                const products = await response.json();
                this.rowData = products.map((group) => ({
                    ...group,
                }));
            } catch (error) {
                console.error("Error fetching:", error);
                Swal.fire("Ошибка!", "Не удалось загрузить данные.", "error");
            }
        },
        setSelectedRows(rows) {
            this.selectedRows = rows;
        },
        async deleteSelectedRows() {
            if (this.selectedRows.length === 0) return;

            Swal.fire({
                title: "Вы уверены?",
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
                            await this.apiRequest(`${config.public.API_BASE_URL}/template-groups/${row.id}`, {
                                method: "DELETE",
                            });
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
        async updateTemplateGroup(updatedData) {
            const originalRow = this.rowData.find((user) => user.id === updatedData.id);
            const hasChanged = Object.keys(updatedData).some(
                (key) => updatedData[key] !== originalRow[key]
            );

            if (hasChanged) {
                updatedData.discount = updatedData.discount.replace("%", "");

                try {
                    await this.apiRequest(`${config.public.API_BASE_URL}/template-groups/${updatedData.id}`, {
                        method: "PUT",
                        body: JSON.stringify(updatedData),
                    });

                    console.log("Successfully updated user:", updatedData);
                } catch (error) {
                    console.error("Error updating user:", error);
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
});
