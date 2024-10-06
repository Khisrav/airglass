import { Home, Users, Boxes, FileBox } from "lucide-vue-next";

export default function () {
    return useState("menuItems", () => [
        { icon: Home, label: "Главная", to: "/" },
        { icon: Users, label: "Пользователи", to: "/users", badge: 6 },
        { icon: Boxes, label: "Каталог", to: "/catalog", isActive: true },
        { icon: FileBox, label: "Шаблоны", to: "/templates" },
    ]);
}