
class SearchCtrl {
    constructor($scope, $timeout, OMDB, SearchHistorySvc) {
        $scope.search = { query: "" };

        $scope.pagination = {currentPage: 1};

        var history = SearchHistorySvc.getLastSearch();

        if (history) {
            $scope.search.query = history;
            $timeout(function () {
                $scope.searchMovies();
            }, 1);
        }


        $scope.searchMovies =  () => {
            if ($scope.frmSearch.$invalid) {
                $scope.frmSearch.query.$setDirty(true);
                return;
            }
            $scope.error = null;

            SearchHistorySvc.setLastSearch($scope.search.query);
            $scope.search.page = 1;
           OMDB.search($scope.search, function (data) {
                $scope.results = data;
            }, function () {
                $scope.error = "Nada encontrado para sua busca.";
            })
        };
        

        $scope.pageChanged = () => {
            var history = (SearchHistorySvc.getLastSearch());
            var search = { query: history, page: $scope.pagination.currentPage};
            OMDB.search(search, function (data) {
                $scope.results = data;
            }, function () {
                $scope.error = "Nada encontrado para sua busca.";
            })
        }
    }
}

SearchCtrl.$inject = ['$scope', '$timeout', 'OMDB', 'SearchHistorySvc'];
module.exports = SearchCtrl;