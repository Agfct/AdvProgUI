'use strict';

angular.module('myApp.cqView', ['ngRoute','ngFitText'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/cqView', {
            templateUrl: 'cqView/cqView.html',
            controller: 'cqViewCtrl'
        });
    }])

    .controller('cqViewCtrl', ['$scope','$http',function($scope,$http) {

        //$http.get('/api/bar').success(function(data) {
        //    $scope.bars = data; // stores the data in a usable variable.
        //    console.log(data);
        //});

        //$http.post("/api/bar", newbar).success(function(data) {
        //    $scope.bars.push(data);
        //    console.log(data);
        //});
        var absUrl = window.location.pathname;
        console.log(absUrl);
        $http.get('http://localhost:8082/My.pg/data/tasks/0/getSecretCrosswordTextFields').success(function(data) {

            $scope.crosswordTextFields = data; // stores the data in a usable variable.
            console.log(data);
            generateDummyAnswers();
        });

        var left = 0;
        var right = 0;
        var fields =[];

            //Dummy data:
        //$scope.crosswordTextFields = [
        //    {textFieldAnswer: "FISH", quizText:"Swims in the sea", offset:2},
        //    {textFieldAnswer: "HOME", quizText:"Where you live", offset:0},
        //    {textFieldAnswer: "BORING", quizText:"Doing nothing", offset:1},
        //    {textFieldAnswer: "WC", quizText:"A differnt word for bathroom", offset:0}
        //];


        //Array containing the textField answers as objects
        $scope.crosswordTextFieldAnswers = []

        //Array containing the entire crossword table (answer + empty space)
        $scope.crosswordArray = [];

        //Current seleted field
        $scope.selectedField = $scope.crosswordTextFieldAnswers[0];

        //This method should be in the initial setup (order matters)
        //generateDummyAnswers();
        function generateDummyAnswers(){
            fields = $scope.crosswordTextFields;

            for (var i = 0; i < fields.length; i++) {
                var str = "";

                for (var j = 0; j < fields[i].textFieldAnswer.length; j++) {
                    str += "?";
                }

                $scope.crosswordTextFieldAnswers.push({textAnswer:str, length:str.length})

            }

            for (var i = 0; i < fields.length; i++) {
                if(fields[i].offset > left){
                    left = fields[i].offset;
                }
                if(fields[i].textFieldAnswer.length - fields[i].offset > right){
                    right = fields[i].textFieldAnswer.length - fields[i].offset;
                }
            }
            $scope.selectedField = $scope.crosswordTextFieldAnswers[0];
        }

        $scope.isIndexGrey = function(row, colIndex) {
            if(colIndex < fields[row].textFieldAnswer.length + left - fields[row].offset && colIndex >= left - fields[row].offset){
                return true;
            }
            return false;
        };

        $scope.isIndexAnswerCol = function(row, colIndex) {
            if(colIndex == left){
                return true;
            }
            return false;
        };

        //Sends a word check requrest to the database
        $scope.isWordCorrect = function(row, textField) {
            if(row == 0 && $scope.crosswordTextFieldAnswers[row].textAnswer == "FISH"){
                return true;
            }else if(row == 1 && $scope.crosswordTextFieldAnswers[row].textAnswer == "HOME"){
                return true;
            } else if(row == 2 && $scope.crosswordTextFieldAnswers[row].textAnswer == "BORING"){
                return true;
            }
            return false;
        };

        //TODO: Denne kj�rer hver gang det skjer endringer, helt i slutten kan den sende svar inn til server.
        $scope.tableWidth = function (){

            var tempArray = $scope.crosswordArray;
            //For eatch crosswordTextField we add a new line with textfield answer + padding on both sides
            for (var i = 0; i < fields.length; i++) {
                var leftPad = left - fields[i].offset
                var realTextFieldLength = fields[i].textFieldAnswer.length;
                var currentTextFieldLength = $scope.crosswordTextFieldAnswers[i].textAnswer.length;
                var differenceInLength = realTextFieldLength - currentTextFieldLength;
                var tempInnerArray = [];

                for (var k = 0; k < left+right; k++) {
                    if(leftPad > 0){
                        leftPad -= 1;
                        tempInnerArray.push(' ');

                        //For every char in the written answer
                    }else if(leftPad == 0 && currentTextFieldLength > 0){
                        tempInnerArray.push($scope.crosswordTextFieldAnswers[i].textAnswer.charAt($scope.crosswordTextFieldAnswers[i].textAnswer.length - currentTextFieldLength));
                        currentTextFieldLength  -= 1;

                    }
                    else if(leftPad == 0 && currentTextFieldLength <= 0 && differenceInLength > 0 ) {
                        differenceInLength -= 1;
                        tempInnerArray.push('');
                    }
                    else{
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

            for (var i = 0; i < a.length; ++i) {
                if (a[i] !== b[i]) return false;
            }
            return true;
        }

        $scope.selectedRow = 0;

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