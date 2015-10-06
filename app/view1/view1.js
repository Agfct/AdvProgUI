'use strict';

angular.module('myApp.view1', ['ngRoute','ngFitText'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])

    .controller('View1Ctrl', ['$scope',function($scope) {



        $scope.crosswordTextFields = [
            {textFieldAnswer: "FISH", quizText:"Swims in the sea", offset:2},
            {textFieldAnswer: "HOME", quizText:"Where you live", offset:0},
            {textFieldAnswer: "BORING", quizText:"Doing nothing", offset:1}
        ];


        $scope.crosswordTextFieldAnswers = []
        $scope.crosswordArray = [];
        $scope.selectedField = $scope.crosswordTextFieldAnswers[0];

        //This method should be in the initial setup (order matters)
        generateDummyAnswers();
        function generateDummyAnswers(){
            var fields = $scope.crosswordTextFields;
            for (var i = 0; i < fields.length; i++) {
                var str = "";

                for (var j = 0; j < fields[i].textFieldAnswer.length; j++) {
                    str += "?";
                }

                $scope.crosswordTextFieldAnswers.push({textAnswer:str})

            }
        }

        //TODO: Fikse slik at den tar in et object og henter textAnswer fra den.
        $scope.tableWidth = function (){
            var field = $scope.crosswordTextFields;
            var left = 0;
            var right = 0;
            for (var i = 0; i < field.length; i++) {
               if(field[i].offset > left){
                   left = field[i].offset;
               }
                if(field[i].textFieldAnswer.length - field[i].offset > right){
                    right = field[i].textFieldAnswer.length - field[i].offset;
                }
            }
            var tempArray = $scope.crosswordArray;
            //For eatch crosswordTextField we add a new line with textfield answer + padding on both sides
            for (var i = 0; i < field.length; i++) {
                var leftPad = left - field[i].offset
                var realTextFieldLength = field[i].textFieldAnswer.length;
                var currentTextFieldLength = $scope.crosswordTextFieldAnswers[i].length;

                var tempInnerArray = [];
                for (var k = 0; k < left+right; k++) {
                if(leftPad > 0){
                    leftPad -= 1;
                    tempInnerArray.push(' ');

                }else if(leftPad == 0 && currentTextFieldLength >= 0){
                    tempInnerArray.push($scope.crosswordTextFieldAnswers[i].textAnswer.charAt($scope.crosswordTextFieldAnswers[i].textAnswer.length - currentTextFieldLength));
                    currentTextFieldLength  -= 1;
                }else{
                    tempInnerArray.push(' ');
                }

                }
                //If the new generated array tempInnerArray is equal to the one already present in tempArray we do not add a new array to the list
                if(!arraysEqual(tempArray[i], tempInnerArray)){
                    tempArray[i] = tempInnerArray;
                }

            }
                return $scope.crosswordArray;
        }

        function arraysEqual(a, b) {

            if (a === b) return true;
            if (a == null || b == null) return false;
            if (a.length != b.length) return false;

            // If you don't care about the order of the elements inside
            // the array, you should sort both arrays here.

            for (var i = 0; i < a.length; ++i) {
                if (a[i] !== b[i]) return false;
            }
            return true;
        }

        $scope.selectedRow = null;

        $scope.setClickedRow = function(index){
            $scope.selectedRow = index;
            $scope.selectedField = $scope.crosswordTextFieldAnswers[index]


        }

        $scope.getTabletWidth = function () {
            $scope.tableWidth += 1;
            return $scope.tableWidth;
        }





        //$scope.tableWidth = function (){
        //    var field = $scope.crosswordTextFields;
        //    var left = 0;
        //    var right = 0;
        //    for (var i = 0; i < field.length; i++) {
        //        if(field[i].offset > left){
        //            left = field[i].offset;
        //        }
        //        if(field[i].textFieldAnswer.length - field[i].offset > right){
        //            right = field[i].textFieldAnswer.length - field[i].offset;
        //        }
        //    }
        //    var tempArray = $scope.crosswordArray;
        //    //For eatch crosswordTextField we add a new line with textfield answer + padding on both sides
        //    for (var i = 0; i < field.length; i++) {
        //        var leftPad = left - field[i].offset
        //        var textFieldLength = field[i].textFieldAnswer.length;
        //
        //        var tempInnerArray = [];
        //        for (var k = 0; k < left+right; k++) {
        //            if(leftPad > 0){
        //                leftPad -= 1;
        //                tempInnerArray.push(' ');
        //
        //            }else if(leftPad == 0 && textFieldLength >= 0){
        //                tempInnerArray.push(field[i].textFieldAnswer.charAt(field[i].textFieldAnswer.length - textFieldLength));
        //                textFieldLength  -= 1;
        //            }else{
        //                tempInnerArray.push(' ');
        //            }
        //
        //        }
        //        //If the new generated array tempInnerArray is equal to the one already present in tempArray we do not add a new array to the list
        //        if(!arraysEqual(tempArray[i], tempInnerArray)){
        //            tempArray[i] = tempInnerArray;
        //        }
        //
        //    }
        //    return $scope.crosswordArray;
        //}

    }]);