'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope',function($scope) {



        $scope.crosswordTextFields = [
            {textFieldAnswer: "FISH", quizText:"Swims in the sea", offset:2},
            {textFieldAnswer: "HOME", quizText:"Where you live", offset:2},
            {textFieldAnswer: "BORING", quizText:"Doing nothing", offset:2}
        ];

        $scope.selectedField = $scope.crosswordTextFields[0];
        $scope.tableWidth = 0;

        $scope.selectedRow = null;

        $scope.setClickedRow = function(index){
            $scope.selectedRow = index;
            $scope.selectedField = $scope.crosswordTextFields[index]

        }

        $scope.getTabletWidth = function () {
            $scope.tableWidth += 1;
            return $scope.tableWidth;
        }





    }]);