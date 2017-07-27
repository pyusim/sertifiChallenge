var app = angular.module('myApp', ['services']);

app.controller('mainController', ['$scope', 'dataService', function($scope, dataService) {

  dataService.getYears().then(function(data) {

    $scope.years = data;

  }, function (error) {

		$scope.error = error;
	});
}]);
