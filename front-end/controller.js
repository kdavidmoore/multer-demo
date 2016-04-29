var studentApp = angular.module('studentApp', []);
studentApp.controller('studentController', function($scope, $http){

	//On load, run getStudentsFromApi and send it the students path
	getStudentsFromApi('/students/default');	

	//On click of the sort button, get the student list from the students path
	$scope.sortAlph = function(){
		getStudentsFromApi('/students/default');	
	}

	//On click of the reverse button, get the student list from the students/reverse path
	$scope.reverseSort = function(){
		getStudentsFromApi('/students/reversed');
	}

	$scope.submitImage = (form){
		var formData = new FormData(form);
		$http.post('http://localhost:3050/uploads', formData);
	}

	//the getStudents function that takes the URL we are after
	function getStudentsFromApi(urlEnding){
		$http({method: 'GET', url: 'http://localhost:3050' + urlEnding}).then(function(response){
			console.log(response);
			$scope.studentList = response.data;
		}, function(response){
			console.log('Error: ' + response);
			$scope.studentList = response.data;
		});
	}
});