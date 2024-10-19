const config = useRuntimeConfig();

export const useTemplateGroupStore = defineStore("templateGroup", {
    state: () => ({
        selectedRows: [],
        rowData: [],
    }),
    actions: {
        async fetchTemplateGroups() {
            try {
                const response = await fetch(config.public.API_BASE_URL + "/template-groups", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${useCookie("authToken").value}`,
                        "Content-Type": "application/json",
                    },
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
                            const response = await fetch(
                                `${config.public.API_BASE_URL}/template-groups/${row.id}`,
                                {
                                    method: "DELETE",
                                    headers: {
                                        Authorization: `Bearer ${useCookie("authToken").value}`,
                                        "Content-Type": "application/json",
                                    },
                                }
                            );

                            if (!response.ok)
                                throw new Error(`Failed to delete product with ID: ${row.id}`);
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
                    const response = await fetch(
                        `${config.public.API_BASE_URL}/template-groups/${updatedData.id}`,
                        {
                            method: "PUT",
                            headers: {
                                "Authorization": `Bearer ${useCookie("authToken").value}`,
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(updatedData),
                        }
                    );

                    if (!response.ok) {
                        throw new Error("Failed to update group.");
                    }
                    console.log("Successfully updated user:", updatedData);
                } catch (error) {
                    console.error("Error updating user:", error);
                }
            } else {
                console.log("No changes detected, no update needed.");
            }
        },
    },
});
