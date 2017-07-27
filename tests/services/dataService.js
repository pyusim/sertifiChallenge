describe('Unit: Testing Services', function() {
  describe('Data Service:', function() {

    var dataService;
		var http;

    beforeEach(function() {

      var injector = angular.injector(['services', 'ng']);
      dataService = injector.get('dataService');
    });

    it('should contain a dataService', function() {

      expect(dataService).not.toEqual(null);
    });

    it('studentsToYears', function() {

			var input = [
				{"Id":1,"Name":"Jack","StartYear":2013,"EndYear":2016,"GPARecord":[3.4,2.1,1.2,3.6]},
				{"Id":2,"Name":"Jill","StartYear":2010,"EndYear":2013,"GPARecord":[3.3,2.3,1.1,3.7]},
				{"Id":3,"Name":"Bob","StartYear":2010,"EndYear":2012,"GPARecord":[2.3,2.5,2.8]},
				{"Id":4,"Name":"Alice","StartYear":2013,"EndYear":2016,"GPARecord":[3.6,2.9,3.4,3.7]},
				{"Id":5,"Name":"Eve","StartYear":2012,"EndYear":2015,"GPARecord":[3.3,2.5,1.1,3.7]},
				{"Id":6,"Name":"Malcom","StartYear":2011,"EndYear":2014,"GPARecord":[3.8,2.7,1.1,3.7]},
				{"Id":7,"Name":"Don","StartYear":2009,"EndYear":2012,"GPARecord":[3.1,2.1,1.1,3.7]},
				{"Id":8,"Name":"Mike","StartYear":2009,"EndYear":2011,"GPARecord":[3.6,2.2,1.1]},
				{"Id":9,"Name":"Stacy","StartYear":2015,"EndYear":2016,"GPARecord":[3.3,2.3]},
				{"Id":10,"Name":"Safron","StartYear":2016,"EndYear":2016,"GPARecord":[3.3]},
				{"Id":11,"Name":"Bill","StartYear":2012,"EndYear":2015,"GPARecord":[3.6,2.4,2.3,3.7]},
				{"Id":12,"Name":"Quin","StartYear":2008,"EndYear":2012,"GPARecord":[3.3,2.7,1.1,3.7,2.4]},
				{"Id":13,"Name":"Erin","StartYear":2008,"EndYear":2011,"GPARecord":[3.8,2.9,1.1,3.7]},
				{"Id":14,"Name":"Sharon","StartYear":2013,"EndYear":2016,"GPARecord":[3.6,2.3,1.1,3.7]},
				{"Id":15,"Name":"Lilly","StartYear":2011,"EndYear":2014,"GPARecord":[1.0,2.5,1.1,3.7]},
				{"Id":16,"Name":"Inara","StartYear":2004,"EndYear":2007,"GPARecord":[3.3,2.8,1.1,3.7]},
				{"Id":17,"Name":"Harry","StartYear":2005,"EndYear":2007,"GPARecord":[2.4,2.9,1.1]},
				{"Id":18,"Name":"Emma","StartYear":2007,"EndYear":2011,"GPARecord":[3.8,2.6,1.6,3.7,2.8]},
				{"Id":19,"Name":"Sharon","StartYear":2010,"EndYear":2013,"GPARecord":[3.5,2.8,1.1,3.7]},
				{"Id":20,"Name":"Uday","StartYear":2002,"EndYear":2005,"GPARecord":[3.8,2.4,1.7,3.7]},
				{"Id":21,"Name":"Ross","StartYear":2003,"EndYear":2006,"GPARecord":[3.3,2.7,1.5,3.7]},
				{"Id":22,"Name":"Michael","StartYear":2001,"EndYear":2004,"GPARecord":[3.7,2.5,1.4,3.7]},
				{"Id":23,"Name":"Nick","StartYear":2001,"EndYear":2004,"GPARecord":[3.4,2.0,1.0,3.7]},
				{"Id":24,"Name":"Laura","StartYear":2010,"EndYear":2013,"GPARecord":[1.5,2.7,3.2,4.0]},
				{"Id":25,"Name":"Kevin","StartYear":2000,"EndYear":2003,"GPARecord":[3.3,2.4,1.6,3.7]}]

      var output = dataService.studentsToYears(input);

      expect(output.length).toEqual(17);

			expect(output[3].students.length).toEqual(5);  // 2003
			expect(output[3].GPA).toEqual(2.4 + 3.3 + 1.4 + 1.0 + 3.7);  // 2003

			expect(output[10].students.length).toEqual(9); // 2010
			expect(output[10].students.some(function (s) {
				return s.Name === 'Jill';} )).toEqual(true);

			var jill = output[10].students.filter(function (s) { return s.Name === 'Jill'; } )[0];

			expect(jill.Name).toEqual('Jill');
			expect(jill.GPARecord[2010]).toEqual(3.3);

    });
  });
});
