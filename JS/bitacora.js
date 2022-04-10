// app.js
// create angular app
var validationApp = angular.module('validationApp', ['ui.bootstrap']);

// create angular controller

validationApp.controller('RegistrationController', function($scope) {
    $scope.forms = {
        'userForm': {
            'validEmail ': false,
            'validConfirmedPasswords': false,
            'allSecurityAnswered': false
        }

    };



});
$(document).ready(function() {
    var placeholder = null;
    $('input[type=text]').focus(function() {
        placeholder = $(this).attr("placeholder");
        $(this).attr("placeholder", "");
    });
    $('input[type=text]').blur(function() {
        $(this).attr("placeholder", placeholder);
    });

});