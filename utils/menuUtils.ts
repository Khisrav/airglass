import { Home, Users, Boxes, FileBox } from "lucide-vue-next";
type IconComponent = typeof Home | typeof Users | typeof Boxes | typeof FileBox;

export default interface MenuItem {
	icon: IconComponent;
	label: string;
	to: string;
	badge?: number;
	isActive?: boolean;
}

export default interface menuProps {
	menuItems: MenuItem[];
}