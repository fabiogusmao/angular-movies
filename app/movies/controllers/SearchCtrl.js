
class SearchCtrl {

    constructor($scope, $timeout, OMDB, SearchHistorySvc) {

        this.omdb = OMDB;
        this.searchHistory = SearchHistorySvc;
        this.$scope = $scope;

        $scope.search = { query: "", page: 1 };
        $scope.searchMovies = () => { this.searchMovies; };
        $scope.changePage = () => { this.changePage; };

                

        var history = SearchHistorySvc.getLastSearch();

        if (history) {
            $scope.search.query = history;
            $timeout(() => {
                this.searchMovies();
            }, 1);
        }
    }
    searchMovies() {

        let $scope = this.$scope;

        $scope.error = null;

        this.searchHistory.setLastSearch($scope.search.query);
        $scope.search.page = 1;
        this.omdb.search($scope.search,  (data) => {
            $scope.results = data;
        }, function () {
            $scope.error = "Nothing was found.";
        })
    }
    pageChanged() {
        let $scope = this.$scope;
        var history = (this.searchHistory.getLastSearch());
        $scope.search.query = history;
        OMDB.search($scope.search, (data) => {
            $scope.results = data;
        }, function () {
            $scope.error = "Nothing was found.";
        })
    }
}

SearchCtrl.$inject = ['$scope', '$timeout', 'OMDB', 'SearchHistorySvc'];
module.exports = SearchCtrl;



