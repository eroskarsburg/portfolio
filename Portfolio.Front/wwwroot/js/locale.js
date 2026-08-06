window.portfolioLocale = {
    get: function () {
        return localStorage.getItem('portfolio-locale');
    },
    set: function (culture) {
        localStorage.setItem('portfolio-locale', culture);
    }
};
