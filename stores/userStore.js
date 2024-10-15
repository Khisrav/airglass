import { defineStore } from 'pinia';
import Swal from 'sweetalert2';

export const useUserStore = defineStore('user', {
  state: () => ({
    selectedRows: [],
    rowData: [],
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/users");
        const users = await response.json();
        this.rowData = users.map((user) => ({
          ...user,
          phone: this.formatPhoneNumber(user.phone), // Format phone number on fetch
          discount: this.formatDiscount(user.discount), // Format discount on fetch
        }));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    setSelectedRows(rows) {
      this.selectedRows = rows;
    },
    async updateUser(updatedData) {
      const originalRow = this.rowData.find(user => user.id === updatedData.id);
      const hasChanged = Object.keys(updatedData).some((key) => updatedData[key] !== originalRow[key]);

      if (hasChanged) {
        updatedData.discount = updatedData.discount.replace("%", "");

        try {
          const response = await fetch(`http://127.0.0.1:8000/api/users/${updatedData.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData),
          });

          if (!response.ok) {
            throw new Error("Failed to update user.");
          }
          console.log("Successfully updated user:", updatedData);
        } catch (error) {
          console.error("Error updating user:", error);
        }
      } else {
        console.log("No changes detected, no update needed.");
      }
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
              const response = await fetch(`http://127.0.0.1:8000/api/users/${row.id}`, {
                method: "DELETE",
              });

              if (!response.ok) throw new Error(`Failed to delete user with ID: ${row.id}`);
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
    formatPhoneNumber: (state) => (phone) => {
      if (!phone) return phone;
      return phone.replace(/^(\+7|7|8)?(\d{3})(\d{3})(\d{2})(\d{2})$/, "+7 ($2) $3-$4-$5");
    },
    formatDiscount: (state) => (discount) => {
      return discount ? `${discount}%` : "0%";
    },
  }
});
