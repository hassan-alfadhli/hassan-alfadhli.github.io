const theme = {
    Light: "light",
    Dark: "dark",
    get preferred() { return window.matchMedia("(prefers-color-scheme: dark)").matches ? this.Dark : this.Light; },
    get current() { return localStorage.getItem("theme") || this.preferred; },
    set current(theme) {
        if (theme !== this.Light && theme !== this.Dark) {
            theme = this.preferred;
        }
        localStorage.setItem("theme", theme);
        document.documentElement.setAttribute("data-bs-theme", theme);
    },
};
theme.current = theme.current;
export default theme;
