export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('authToken');
  
    if (to.path.startsWith('/dashboard') && !token.value) {
        console.log(to.path);
        return navigateTo('/auth');
    }
});
  