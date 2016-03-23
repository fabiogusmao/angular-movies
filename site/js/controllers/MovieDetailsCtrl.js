angular.module('moviesApp').controller('MovieDetailsCtrl', function($scope, $routeParams, OMDB){
   
   var movieId = $routeParams.movieId;
   
   OMDB.get({
       movieId: movieId
   }, function(data){
       $scope.movie = data; 
   }, function(){
       
   }) 
    
});