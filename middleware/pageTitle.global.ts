export default defineNuxtRouteMiddleware((to, from) => {
    const useMenu = useMenuStore();
    useMenu.updateActivePageByRoute(to.path);
})
