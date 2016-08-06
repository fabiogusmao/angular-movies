import OMDB from '../resources/omdb';


export default class MovieDetailsCtrl {
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
