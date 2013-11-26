'use strict';
  
/* App Module */
var reportsModule = angular.module('reportsModule',
	['ngResource','googlechart']); //dependencies go inside the square brackets

reportsModule.config(function ($routeProvider, $httpProvider) {
$routeProvider. //this controls navigation within our app
when('/', { templateUrl: 'views/main.html' }).
when('/web_storage_report', { controller: 'pi512001Ctrl', templateUrl: 'views/storage_report.html' }).
when('/mariner_storage_report', { controller: 'marinerCtrl', templateUrl: 'views/storage_report.html' }).
when('/database_storage_report', { controller: 'databaseCtrl', templateUrl: 'views/storage_report.html' }).
when('/ds_storage_report', { controller: 'dsCtrl', templateUrl: 'views/storage_report.html' }).
when('/data_product_report', { controller: 'dataProductCtrl', templateUrl: 'views/data_products.html' }).
when('/lasp_organization_chart', { controller: 'orgChartCtrl', templateUrl: 'views/org_chart.html' }).
when('/storage_array_allocation', { controller: 'storageArrayCtrl', templateUrl: '/views/storage_array_allocation.html'}).
otherwise({ redirectTo: '/' });

//enable crossdomain requests
$httpProvider.defaults.withCredentials = true;
delete $httpProvider.defaults.headers.common["X-Requested-With"];
delete $httpProvider.defaults.headers.post["Content-Type"];
});
