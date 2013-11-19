'use strict';

reportsModule.controller('orgChartCtrl', ['$scope','dataFactory','formatFactory','$filter',function ($scope,dataFactory,formatFactory,$filter){      
	
	$scope.title="LASP Organization Chart";
	
	$scope.urlBase = 'http://lasp-db-dev:3030/VIVO/query';
    $scope.queryStr = "PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspcms: <http://sorce-dp2:8080/laspcms/> PREFIX vivo: <http://vivoweb.org/ontology/core#> SELECT DISTINCT ?lab ?division ?group ?person ?l ?d ?g ?p ?text3 WHERE { ?l a vivo:Laboratory . ?l rdfs:label ?lab . ?l vivo:hasSubOrganization ?d . ?d rdfs:label ?division OPTIONAL { ?d vivo:hasSubOrganization ?g . ?g rdfs:label ?group . OPTIONAL { ?g vivo:hasCurrentMember ?p . ?p rdfs:label ?person . OPTIONAL { ?p vivo:prefferedTitle ?text3 .}}}}";

	function getChartData(){
		dataFactory.getSPARQLQuery($scope.urlBase, $scope.queryStr)
            .success(function(data){
            	$scope.error = '';
                $scope.data=formatFactory.formatOrgChart(data);
            })
            .error(function(data,status) {
                $scope.error = "Fuseki returned: " + status;
        	});
	};
	getChartData();
	
	
}]);