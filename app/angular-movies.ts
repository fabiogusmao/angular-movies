"use strict";
require('./less/angular-movies.less');



require("angular");

require('./movies/movies.module');

let app = angular.module('moviesApp', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'movies'
]);

export = app;
