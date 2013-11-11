'use strict';
  
/* App Module */
var reportsModule = angular.module('reportsModule',
	['ngResource','ngTable','googlechart']); //dependencies go inside the square brackets

reportsModule.config(function ($routeProvider, $httpProvider) {
$routeProvider. //this controls navigation within our app
when('/', { controller: 'MainCtrl', templateUrl: 'views/main.html' }).
when('/web_storage_report', { controller: 'pi512001Ctrl', templateUrl: 'views/pi512001_report.html' }).
otherwise({ redirectTo: '/' });

//enable crossdomain requests
$httpProvider.defaults.withCredentials = true;
delete $httpProvider.defaults.headers.common["X-Requested-With"];
delete $httpProvider.defaults.headers.post["Content-Type"];
});
