import * as models from '../models';


export interface ISearchHistorySvc {
    getLastSearch();
    setLastSearch(search: models.ISearchVars);
}


export default class SearchHistorySvc implements ISearchHistorySvc {    

    getLastSearch(){
        var json = sessionStorage.getItem('searchHistory');
        if(!json)
            return null;
        else
            return JSON.parse(json);
    }
    setLastSearch(search: models.ISearchVars){
        sessionStorage.setItem('searchHistory', JSON.stringify(search));
    }
}