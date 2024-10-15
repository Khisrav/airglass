// stores/useMenuStore.ts
import { defineStore } from 'pinia'
import type MenuItem from '~/utils/menuUtils';

export const useMenuStore = defineStore('menu', {
    state: () => ({
        menuItems: [
            { icon: 'Home', label: "Главная", to: "/dashboard", isActive: false },
            { icon: 'Calculator', label: "Калькулятор", to: "/dashboard/calculator", isActive: false },
            { icon: 'Users', label: "Пользователи", to: "/dashboard/users", isActive: false },
            { icon: 'Boxes', label: "Каталог", to: "/dashboard/catalog", isActive: false },
            { icon: 'FileBox', label: "Шаблоны", to: "/dashboard/templates", isActive: false },
        ] as MenuItem[]
    }),
    actions: {
        setActivePage(to: string) {
            this.menuItems.forEach(item => item.isActive = item.to === to);
        },
        updateActivePageByRoute(routePath: string) {
            const activeMenu = this.menuItems.find(item => item.to === routePath);
            if (activeMenu) {
                this.setActivePage(routePath);
            }
        },
        activePageLabel() {
            const activeMenu = this.menuItems.find(item => item.isActive);
            return activeMenu?.label ?? "Главная";
        }
    }
})
