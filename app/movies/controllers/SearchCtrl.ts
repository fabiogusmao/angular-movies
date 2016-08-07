import 'angular';

import * as X from "../services/SearchHistorySvc";

import * as models from '../models';


export default class SearchCtrl {


    public search: models.ISearchVars
    public error:string;
    public results: Object;

    constructor(public $timeout, public OMDB, public SearchHistorySvc: X.ISearchHistorySvc) {


        this.search = { query: "", page: 1, year: null };
        
        var history = SearchHistorySvc.getLastSearch();

        if (history) {
            this.search = history;
            this.searchMovies();
        }
    }
    searchMovies() {

        this.error = null;
        this.search.page = 1;
        this.SearchHistorySvc.setLastSearch(this.search);
        
        this.OMDB.search(this.search, (data) => {
            this.results = data;
        }, function () {
            this.error = "Nothing was found.";
        })
    }
    pageChanged() {
        
        var history = (this.SearchHistorySvc.getLastSearch());
        var page = this.search.page;
        this.search = history;
        this.search.page= page;
        this.OMDB.search(this.search, (data) => {
            this.results = data;
        }, function () {
            this.error = "Nothing was found.";
        })
    }
}

SearchCtrl.$inject = ['$timeout', 'OMDB', 'SearchHistorySvc'];
