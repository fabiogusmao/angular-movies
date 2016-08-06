"use strict";
 require('./less/angular-movies.less');



import './vendor.js';
import movies from './movies/movies.module';

let app = angular.module('moviesApp', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'movies'
]);

module.exports = app;
