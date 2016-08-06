class SearchHistorySvc {    

    getLastSearch(){
        return sessionStorage.getItem('searchHistory');
    }
    setLastSearch(v){
        sessionStorage.setItem('searchHistory', v);
    }
}


module.exports = SearchHistorySvc;