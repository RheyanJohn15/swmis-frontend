export const toastconfig = {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    }

export const access_token = () => {
        if (typeof window !== "undefined") {
          // Code is running in the browser, so sessionStorage is available
          return sessionStorage.getItem('accessAuth');
        }
        return null; // Default value when sessionStorage is not available (SSR or build time)
      };