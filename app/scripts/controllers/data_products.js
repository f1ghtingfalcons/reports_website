'use strict';

reportsModule.controller('dataProductCtrl', ['$scope','dataFactory','formatFactory','$filter',function ($scope,dataFactory,formatFactory,$filter){      
	
	$scope.title="Data Products Report";
	
	$scope.report=[];
	$scope.cols=[];
	
	$scope.urlBase = 'http://lasp-db-dev:3030/VIVO/query';
    $scope.queryStr = "PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspcms: <http://localhost:8080/laspcms#> PREFIX vsto: <http://escience.rpi.edu/ontology/vsto/2/0/vsto.owl#> SELECT DISTINCT ?x ?y ?s ?i ?dataset ?dataproduct ?instrument ?spacecraft WHERE { ?x a vsto:DataProduct . ?x rdfs:label ?dataproduct . ?x vsto:isFromDataset ?y . ?y rdfs:label ?dataset . ?y vsto:isFromInstrument ?i . ?i rdfs:label ?instrument . ?i vsto:isInstrumentOn ?s . ?s rdfs:label ?spacecraft . } ORDER BY ?dataset";
	
	function getReport(){
        dataFactory.getSPARQLQuery($scope.urlBase, $scope.queryStr)
            .success(function(data){
            	$scope.error = '';
                $scope.report=formatFactory.formatDataProductReport(data);
                $scope.chart=makeChart();
            })
            .error(function(data,status) {
                $scope.error = "Fuseki returned: " + status;
        	});
        //Setup headers for google visualization
		$scope.cols.push({"id": "dataSet",
					"label": "Data Set",
					"type": "string"});
		$scope.cols.push({"id": "dataProduct",
					"label": "Data Product",
					"type": "string"});
		$scope.cols.push({"id": "instrument",
					"label": "Instrument",
					"type": "string"});
		$scope.cols.push({"id": "spaceCraft",
					"label": "Space Craft",
					"type": "string"});
    };	
    getReport();
    
    function makeChart(){
    	var localChart=[];
    	localChart={
	    	"type": "Table",
	    	"displayed": true,
	    	"data": {
	    		"cols": $scope.cols,
	    		"rows": $scope.report
	    	},
	    };
	    return localChart;
    };
}]);