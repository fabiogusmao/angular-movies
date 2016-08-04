
export default class SearchCtrl {
    constructor($scope, $timeout, OMDB, SearchHistorySvc) {
        $scope.search = { query: "" };

        

        var history = SearchHistorySvc.getLastSearch();

        if (history) {
            $scope.search.query = history;
            $timeout(function () {
                $scope.searchMovies();
            }, 1);
        }


        $scope.searchMovies = function () {

            if ($scope.frmSearch.$invalid) {
                //$scope.frmSearch.$setDirty(true);
                $scope.frmSearch.query.$setDirty(true);
                return;
            }
            $scope.error = null;

            SearchHistorySvc.setLastSearch($scope.search.query);

            OMDB.search($scope.search, function (data) {
                $scope.results = data;
            }, function () {
                $scope.error = "Nada encontrado para sua busca.";
            })
        };
    }
}
