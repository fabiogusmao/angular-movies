//import angular from 'angular';
import OMDB from './resources/omdb';
import SearchHistorySvc from './services/SearchHistorySvc';
import SearchCtrl from './controllers/SearchCtrl';
import MovieDetailsCtrl from './controllers/MovieDetailsCtrl';

import angular from 'angular';



module.exports = angular.module('movies', [])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            template: require('./templates/search.html'),
            controller: SearchCtrl
        }).when('/movie/:movieId', {
            template: require('./templates/movie.html'),
            controller: MovieDetailsCtrl
        });
    }).service('OMDB', OMDB)
    .service('SearchHistorySvc', SearchHistorySvc);

