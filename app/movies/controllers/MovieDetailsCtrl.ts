import '../resources/OMDB';
import 'angular';

export default class MovieDetailsCtrl {

    public movie:Object;

    constructor($routeParams, OMDB) {

        var movieId = $routeParams.movieId;

        OMDB.get({
            movieId: movieId
        },  (data)=> {
            this.movie = data;
        }, function () {

        })
    }
}
MovieDetailsCtrl.$inject=  [ '$routeParams', 'OMDB'];
