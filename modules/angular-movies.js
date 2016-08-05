
// require('../less/dependencies.less');
// require('font-awesome/css/font-awesome.css');


import 'angular';
import 'angular-route';
import 'angular-resource';
import 'angular-ui-bootstrap';

import OMDB from './resources/omdb';
import SearchHistorySvc from './services/SearchHistorySvc';
import SearchCtrl from './controllers/SearchCtrl';
import MovieDetailsCtrl from './controllers/MovieDetailsCtrl';

import searchTpl from './templates/search.html';
import movieTpl from './templates/movie.html';

let app = angular.module('moviesApp', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap'
])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            template: searchTpl,
            controller: SearchCtrl
        }).when('/movie/:movieId', {
            template: movieTpl,
            controller: MovieDetailsCtrl
        });
    });

app.service('OMDB', OMDB);
app.service('SearchHistorySvc', SearchHistorySvc);

module.exports = app;
