angular.module('moviesApp', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap'
    ])
    .config(function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'templates/search.html',
            controller: 'SearchCtrl'
        }).when('/movie/:movieId', {
            templateUrl: 'templates/movie.html',
            controller: 'MovieDetailsCtrl'
        });
    })
    ;