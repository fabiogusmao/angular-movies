export interface ISearchHistorySvc {
    getLastSearch();
    setLastSearch(v: string);
}


export default class SearchHistorySvc implements ISearchHistorySvc {    

    getLastSearch(){
        return sessionStorage.getItem('searchHistory');
    }
    setLastSearch(v:string){
        sessionStorage.setItem('searchHistory', v);
    }
}