
class MovieDetailsCtrl {
    constructor($scope, $routeParams, OMDB) {

        var movieId = $routeParams.movieId;

        OMDB.get({
            movieId: movieId
        }, function (data) {
            $scope.movie = data;
        }, function () {

        })
    }
}
MovieDetailsCtrl.$inject=  ['$scope', '$routeParams', 'OMDB'];
module.exports = MovieDetailsCtrl;