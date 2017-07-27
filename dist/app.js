angular.module('services', []).
service('dataService', ['$http', function($http) {

  var endpoints = {
    students : 'http://apitest.sertifi.net/api/Students'
  };

  that = this;

  function yearsComparator(a,b) {

    return a.year - b.year;
  }

  function addStudentToYearsObject(yearsObject, student) {

    // Since we should only traverse students once, even within a given year,
    // combine in one loop: adding a student to a year and converting array of
    // GPAs into a hash table.
    student.GPARecord = student.GPARecord.reduce(function(gpaHash, gpa, i) {

      var year = i + student.StartYear;

      if (!yearsObject[year]) {

        yearsObject[year] = {
          year: year,
          students: [],
          GPA: 0
        };
      }

      yearsObject[year].students.push(student);
      yearsObject[year].GPA += gpa;

      gpaHash[year] = gpa;
      return gpaHash;

    }, {});

    return yearsObject;
  }

  // this is public only for testing purposes
  that.studentsToYears = function(students) {

    // There can be a lot of students, so traverse them only once.
    // A hash table (object) of years is faster to build because of constant
    // lookup time, so build a hash table first and then convert to array.
    var yearsObject = students.reduce(addStudentToYearsObject, {});

    // Convert to array and sort - hash tables are not sortable.
    // Years are cheap to traverse and sort, even for University of Bologna
    var years = Object.keys(yearsObject).map(function (year) { return yearsObject[year]; });
    years.sort(yearsComparator);

    // Now we know how many students / year, calculate average GPA
    years.forEach(function(year) {

      year.averageGPA = year.GPA / year.students.length;
    });

    return years;
  };

  that.getYears = function() {

    return $http.get(endpoints.students).then(function(response) {

        return that.studentsToYears(response.data);

    }, JSON.stringify);
  };
}]);
;var app = angular.module('myApp', ['services']);

app.controller('mainController', ['$scope', 'dataService', function($scope, dataService) {

  dataService.getYears().then(function(data) {

    $scope.years = data;

  }, function (error) {

		$scope.error = error;
	});
}]);
