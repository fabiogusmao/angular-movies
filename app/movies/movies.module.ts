import OMDB from './resources/omdb';
import SearchHistorySvc from './services/SearchHistorySvc';
import SearchCtrl from './controllers/SearchCtrl';
import MovieDetailsCtrl from './controllers/MovieDetailsCtrl';

import 'angular';



function configRoutes($routeProvider) {
    $routeProvider.when('/', {
        template: require('./templates/search.html'),
        controller: 'SearchCtrl',
        controllerAs: 'ctrl'
    }).when('/movie/:movieId', {
        template: require('./templates/movie.html'),
        controller: 'MovieDetailsCtrl',
        controllerAs: 'ctrl'
    });
}

configRoutes.$inject = ['$routeProvider'];


var movies = angular.module('movies', []);
movies.config(configRoutes)
    .controller('SearchCtrl', SearchCtrl)
    .controller('MovieDetailsCtrl', MovieDetailsCtrl)
    .service('OMDB', OMDB)
    .service('SearchHistorySvc', SearchHistorySvc);



export = movies;
