import * as X from "../services/SearchHistorySvc";



interface ISearchVars {
    query: string;
    page: number;
}

interface ISearchCtrlScope {
    search: ISearchVars;
    error: string;
    results: Object;

    searchMovies(): void;
    pageChanged(): void;
}

export default class SearchCtrl implements ISearchCtrlScope {


    public search: ISearchVars;
    public error:string;
    public results: Object;

    constructor(public $timeout, public OMDB, public SearchHistorySvc: X.ISearchHistorySvc) {


        this.search = { query: "", page: 1 };
        
        var history = SearchHistorySvc.getLastSearch();

        if (history) {
            this.search.query = history;
            this.searchMovies();
        }
    }
    searchMovies() {

        this.error = null;
        this.SearchHistorySvc.setLastSearch(this.search.query);
        this.search.page = 1;
        this.OMDB.search(this.search, (data) => {
            this.results = data;
        }, function () {
            this.error = "Nothing was found.";
        })
    }
    pageChanged() {
        
        var history = (this.SearchHistorySvc.getLastSearch());
        this.search.query = history;
        this.OMDB.search(this.search, (data) => {
            this.results = data;
        }, function () {
            this.error = "Nothing was found.";
        })
    }
}

SearchCtrl.$inject = ['$timeout', 'OMDB', 'SearchHistorySvc'];
