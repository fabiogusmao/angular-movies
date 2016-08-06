"use strict";
 require('./less/angular-movies.less');



import angular from 'angular';
import 'angular-route';
import 'angular-resource';
import 'angular-ui-bootstrap';
import movies from './movies/movies.module';

let app = angular.module('moviesApp', [
    'ngRoute',
    'ngResource',
    'ui.bootstrap',
    'movies'
]);

module.exports = app;
