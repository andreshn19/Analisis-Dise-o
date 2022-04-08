var validationApp = angular.module('validationApp', ['ui.bootstrap']);

// create angular controller

validationApp.controller('RegistrationController', function ($scope) {
    $scope.forms = {
        'userForm': {
            'validEmail ': false,
            'validConfirmedPasswords': false,
            'allSecurityAnswered': false
        }

    };
    var answersProvided = [];
    $scope.typeForFirstPassword = "password";
    $scope.typeForSecondPassword = "password";
    $scope.submitState = true;
    $scope.user = {
        'securityQuestions': [
            {
                'questionSelected': '',
                'answerProvided': ''
            },
            {
                'questionSelected': '',
                'answerProvided': ''
            },
            {
                'questionSelected': '',
                'answerProvided': ''
            }
        ]
    };
    $scope.count = 0;
    var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $scope.emailWrong = false;
    $scope.selectedValue = [
        {
            'initialValue': "Pregunta de seguriadad 1"
        },
        {
            'initialValue': "Pregunta de seguriadad 2"
        },
        {
            'initialValue': "Pregunta de seguriadad 3"
        }
    ];
    $scope.selectQuestion = [
        {
            'initialState': true,
            'alreadySelected': false
        },
        {
            'initialState': true,
            'alreadySelected': false
        },
        {
            'initialState': true,
            'alreadySelected': false
        }
    ];
    $scope.securityQuestions = [
        {
            "question": "What is the name of your first boyfriend/girlfriend?"
        },
        {
            "question": "What is the phone number from your childhood?"
        },
        {
            "question": "What was your favorite place to visit as a child?"
        },
        {
            "question": "Who is your favorite actor, musician, or artist?"
        },
        {
            "question": "What is the name of your favorite pet?"
        }
    ];
    $scope.dateBirthPlaceHolder = "Fecha de Nacimiento";
    $scope.questionSelectedError = "Sorry this question is already selected.";
    $scope.inputType = "number";
    $scope.isCollapsed = true;
    $scope.focusEvent = function () {
        $scope.dateBirthPlaceHolder = "dd/mm/yyyy";
        //        $scope.inputType = "date";
    };
    $scope.leaveEvent = function () {
        $scope.dateBirthPlaceHolder = "Date of Birth";
        //        $scope.inputType = "number";
    };
    $scope.selectValue = function (valueSelected, questionNumber) {
        switch (questionNumber) {
            case 0:
                if ($scope.selectedValue[1].initialValue === valueSelected ||
                    $scope.selectedValue[2].initialValue === valueSelected) {
                    $scope.selectQuestion[0].alreadySelected = true;
                } else {
                    $scope.selectQuestion[0].alreadySelected = false;
                }
                break;
            case 1:
                if ($scope.selectedValue[0].initialValue === valueSelected ||
                    $scope.selectedValue[2].initialValue === valueSelected) {
                    $scope.selectQuestion[1].alreadySelected = true;
                } else {
                    $scope.selectQuestion[1].alreadySelected = false;
                }
                break;
            case 2:
                if ($scope.selectedValue[1].initialValue === valueSelected ||
                    $scope.selectedValue[0].initialValue === valueSelected) {
                    $scope.selectQuestion[2].alreadySelected = true;
                } else {
                    $scope.selectQuestion[2].alreadySelected = false;
                }
                break;
        }
        $scope.selectedValue[questionNumber].initialValue = valueSelected;
        $scope.selectQuestion[questionNumber].initialState =
            ($scope.selectQuestion[questionNumber].alreadySelected) ? true : false;
    };
    $scope.status = [
        {
            isopen: false
        },
        {
            isopen: false
        },
        {
            isopen: false
        }
    ];
    $scope.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.status.isopen = !$scope.status.isopen;
    };
    $scope.validateEmail = function () {
        //console.log("email enetered is"+$scope.user.email);
        var emailIdLength = ($scope.user.email === undefined) ? 0 : $scope.user.email.length;
        var inValid = (emailIdLength === 0) ? true : false;
        if (!inValid) {
            if (!emailRegex.test($scope.user.email)) {
                $scope.emailWrong = true;
                $scope.emailValidationError = "Email not in proper format";
            } else {
                $scope.emailWrong = false;
                $scope.forms.userForm.validEmail = true;
            }
        } else {
            $scope.emailWrong = false;
        }

    };
    $scope.minimumPasswordLength = 8;
    var caseRegex = /[a-z].*[A-Z]|[A-Z].*[a-z]/;
    var numberRegex = /.*[0-9].*/;
    $scope.progress = 0;
    $scope.strengthType = "success";
    $scope.passwordStrength = "";
    var passwordProgressBar = {
        'lengthCriteria': false,
        'caseCriteria': false,
        'numberCriteria': false
    };
    $scope.checkPasswordCriteria = function (enteredPassword) {
        if (enteredPassword.length < 8) {
            $scope.passwordLengthClass = "glyphicon glyphicon-remove-circle criteria-failed";
            passwordProgressBar.lengthCriteria = false;
        } else {
            $scope.passwordLengthClass = "glyphicon glyphicon-ok-circle criteria-met";
            passwordProgressBar.lengthCriteria = true;
        }
        if (caseRegex.test(enteredPassword)) {
            $scope.caseClass = "glyphicon glyphicon-ok-circle criteria-met";
            passwordProgressBar.caseCriteria = true;
        } else {
            $scope.caseClass = "glyphicon glyphicon-remove-circle criteria-failed";
            passwordProgressBar.caseCriteria = false;
        }
        if (numberRegex.test(enteredPassword)) {
            $scope.numberClass = "glyphicon glyphicon-ok-circle criteria-met";
            passwordProgressBar.numberCriteria = true;
        } else {
            $scope.numberClass = "glyphicon glyphicon-remove-circle criteria-failed";
            passwordProgressBar.numberCriteria = false
        }
        //        if(($scope.user.firstName !== undefined && $scope.user.lastName !== undefined)){
        //            if($scope.user.lastName.length >2 && $scope.user.lastName.length >2){
        //                if(enteredPassword.indexOf($scope.user.firstName) != -1 || enteredPassword.indexOf($scope.user.lastName) != -1) {
        //                     $scope.nameClass = "glyphicon glyphicon-remove-circle criteria-failed";
        //                }else{
        //                     $scope.nameClass = "glyphicon glyphicon-ok-circle criteria-met";
        //                }
        //            }
        //        }
        if (passwordProgressBar.lengthCriteria && passwordProgressBar.caseCriteria && passwordProgressBar.numberCriteria) {
            $scope.progress = 99;
            $scope.strengthType = "success";

        } else if ((passwordProgressBar.lengthCriteria && passwordProgressBar.caseCriteria) ||
            (passwordProgressBar.lengthCriteria && passwordProgressBar.numberCriteria) ||
            (passwordProgressBar.caseCriteria && passwordProgressBar.numberCriteria)) {
            $scope.progress = 66;
            $scope.strengthType = "primary";
        } else if (passwordProgressBar.lengthCriteria || passwordProgressBar.caseCriteria || passwordProgressBar.numberCriteria) {
            $scope.progress = 33;
            $scope.strengthType = "danger";
        }
    };
    $scope.confirmedPasswordMatchError = false;
    $scope.confirmEnteredPassword = function (confirmedPassword) {
        if ($scope.progress === 99) {
            if ($scope.user.password !== $scope.user.confirmedPassword) {
                $scope.confirmedPasswordMatchError = true;
                $scope.forms.userForm.validConfirmedPasswords = false;
            } else {
                $scope.confirmedPasswordMatchError = false;
                $scope.forms.userForm.validConfirmedPasswords = true;
            }
        }
    };
    $scope.changeInputType = function (index,event) {
      console.log(event);
        if (index === 0) {
            $scope.typeForFirstPassword = ($scope.typeForFirstPassword === "password") ? "text" : "password";
        } else if (index === 1) {
            $scope.typeForSecondPassword = ($scope.typeForSecondPassword === "password") ? "text" : "password";
        }
    };
    $scope.popup1 = {
        opened: false
    };
    $scope.open1 = function () {
        $scope.popup1.opened = true;
        $scope.dateBirthPlaceHolder = "dd/mm/yyyy"
    };
    $scope.$watch('popup1.opened', function (opened) {
        //         alert("watch working");
        if (!opened) {

            $scope.dateBirthPlaceHolder = "Date of Birth";
        }
    });
    $scope.$watchCollection('[user.securityQuestions[0].answerProvided,' +
        'user.securityQuestions[1].answerProvided,' +
        'user.securityQuestions[2].answerProvided]', function (values) {
        var firstAnswer = values[0];
        var secondAnswer = values[1];
        var thirdAnswer = values[2];
        if(firstAnswer.length >=2 && secondAnswer.length >=2 && thirdAnswer.length >=2 ) {
            $scope.forms.userForm.allSecurityAnswered = true;
        }else{
            $scope.forms.userForm.allSecurityAnswered = false;
        }
    });

});