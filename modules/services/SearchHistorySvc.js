export default class SearchHistorySvc {
    constructor() {
        var lastSearch = "";

        return {
            getLastSearch: function () {
                return sessionStorage.getItem('searchHistory');
            }, setLastSearch: function (v) {
                sessionStorage.setItem('searchHistory', v);
            }
        }
    }
}

