export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('app:created', () => {
      const token = useRoute().query.token as string;
      if (token) {
        
        // localStorage.setItem('authToken', token);
        const tokenCookie = useCookie('authToken')
        tokenCookie.value = token;
        
        // window.history.replaceState({}, document.title, '/dashboard');
        navigateTo('/dashboard');
      }
    });
  });