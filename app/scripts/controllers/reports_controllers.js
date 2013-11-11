'use strict';

reportsModule.controller('pi512001Ctrl', ['$scope','dataFactory','formatFactory','ngTableParams','$filter',function ($scope, dataFactory, formatFactory, ngTableParams,$filter){      
	
	$scope.report=[];
	var cols=[];
	
	var urlBase = 'http://lasp-db-dev:3030/VIVO/query';
    var queryStr = "PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspcms: <http://localhost:8080/laspcms#> SELECT ?webspeed ?webresponse ?weborg ?web ?websize ?webdir ?webfs ?webFileSystem ?webDFUsed ?webDFSize ?fs ?Size ?resporg ?ResponsibleElement ?Speedtype ?FileSystem ?lowDir ?MountPoint ?DFSize ?DFUsed ?Used WHERE { ?topDir laspcms:isTopLevelDirectoryOn <http://webdev1.lasp.colorado.edu:57529/vivo/individual/n26815> . ?topDir rdfs:label ?top . ?topDir laspcms:containsDirectory ?lowDir . ?lowDir rdfs:label ?low . ?MountPoint <http://jena.hpl.hp.com/ARQ/property#concat> (?top ?low) . ?topDir laspcms:hasDirectorySize ?Size . ?lowDir laspcms:hasDirectorySize ?Used . ?topDir laspcms:mountsFileSystem ?webfs . ?webfs rdfs:label ?webFileSystem . ?webfs laspcms:hasStorageSize ?webDFSize .?webfs laspcms:hasUsedSize ?webDFUsed  OPTIONAL { ?lowDir laspcms:mountsFileSystem ?fs . ?fs rdfs:label ?FileSystem . ?fs laspcms:hasStorageSize ?DFSize . ?fs laspcms:hasUsedSize ?DFUsed . } OPTIONAL { ?lowDir laspcms:responsibleOrganizationalElement ?resporg . ?resporg rdfs:label ?ResponsibleElement . ?resporg laspcms:billsToSpeedtype ?spdtype . ?spdtype rdfs:label ?Speedtype } OPTIONAL { ?lowDir laspcms:containsDirectory ?web . ?web rdfs:label ?webdir . ?web laspcms:hasDirectorySize ?websize . OPTIONAL { ?web laspcms:responsibleOrganizationalElement ?webresponse . ?webresponse rdfs:label ?weborg . ?webresponse laspcms:billsToSpeedtype ?webspdtyp . ?webspdtyp rdfs:label ?webspeed . }}}";
	
	$scope.getReport = function(){
        dataFactory.getSPARQLQuery(urlBase, queryStr)
            .success(function(data){
            	$scope.error = '';
                $scope.report=formatFactory.formatWebReport(data);
                $scope.chart=$scope.makeChart();
            })
            .error(function(data,status) {
                $scope.error = "Fuseki returned: " + status;
        	});
        //Setup headers for google visualization
		cols.push({"id": "filesystem",
					"label": "Filesystem",
					"type": "string"});
		cols.push({"id": "directory",
					"label": "Directory",
					"type": "string"});
		cols.push({"id": "size",
					"label": "Filesystem Size (GB)",
					"type": "number"});
		cols.push({"id": "used",
					"label": "Filesystem Used (GB)",
					"type": "number"});
		cols.push({"id": "psize",
					"label": "/public/ size (GB)",
					"type": "number"});
		cols.push({"id": "subsize",
					"label": "Sub-directory size (GB)",
					"type": "number"});
		cols.push({"id": "element",
					"label": "Responsible Element",
					"type": "string"});
		cols.push({"id": "speedtype",
					"label": "Speedtype",
					"type": "number"});
    };	
    $scope.getReport();
    
    $scope.makeChart = function(){
    	var localChart=[];
    	localChart={
	    	"type": "Table",
	    	"displayed": true,
	    	"data": {
	    		"cols": cols,
	    		"rows": $scope.report
	    	},
	    };
	    return localChart;
    };
}]);

reportsModule.controller('marinerCtrl', ['$scope','dataFactory','formatFactory','ngTableParams','$filter',function ($scope, dataFactory, formatFactory, ngTableParams,$filter){      
	
	$scope.report=[];
	var cols=[];
	
	var urlBase = 'http://lasp-db-dev:3030/VIVO/query';
    var queryStr = "PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspcms: <http://localhost:8080/laspcms#> SELECT ?webspeed ?webresponse ?weborg ?web ?websize ?webdir ?webfs ?webFileSystem ?webDFUsed ?webDFSize ?fs ?Size ?resporg ?ResponsibleElement ?Speedtype ?FileSystem ?lowDir ?MountPoint ?DFSize ?DFUsed ?Used WHERE { ?topDir laspcms:isTopLevelDirectoryOn <http://webdev1.lasp.colorado.edu:57529/vivo/individual/n26815> . ?topDir rdfs:label ?top . ?topDir laspcms:containsDirectory ?lowDir . ?lowDir rdfs:label ?low . ?MountPoint <http://jena.hpl.hp.com/ARQ/property#concat> (?top ?low) . ?topDir laspcms:hasDirectorySize ?Size . ?lowDir laspcms:hasDirectorySize ?Used . ?topDir laspcms:mountsFileSystem ?webfs . ?webfs rdfs:label ?webFileSystem . ?webfs laspcms:hasStorageSize ?webDFSize .?webfs laspcms:hasUsedSize ?webDFUsed  OPTIONAL { ?lowDir laspcms:mountsFileSystem ?fs . ?fs rdfs:label ?FileSystem . ?fs laspcms:hasStorageSize ?DFSize . ?fs laspcms:hasUsedSize ?DFUsed . } OPTIONAL { ?lowDir laspcms:responsibleOrganizationalElement ?resporg . ?resporg rdfs:label ?ResponsibleElement . ?resporg laspcms:billsToSpeedtype ?spdtype . ?spdtype rdfs:label ?Speedtype } OPTIONAL { ?lowDir laspcms:containsDirectory ?web . ?web rdfs:label ?webdir . ?web laspcms:hasDirectorySize ?websize . OPTIONAL { ?web laspcms:responsibleOrganizationalElement ?webresponse . ?webresponse rdfs:label ?weborg . ?webresponse laspcms:billsToSpeedtype ?webspdtyp . ?webspdtyp rdfs:label ?webspeed . }}}";
	
	$scope.getReport = function(){
        dataFactory.getSPARQLQuery(urlBase, queryStr)
            .success(function(data){
            	$scope.error = '';
                $scope.report=formatFactory.formatWebReport(data);
                $scope.chart=$scope.makeChart();
            })
            .error(function(data,status) {
                $scope.error = "Fuseki returned: " + status;
        	});
        //Setup headers for google visualization
		cols.push({"id": "filesystem",
					"label": "Filesystem",
					"type": "string"});
		cols.push({"id": "directory",
					"label": "Directory",
					"type": "string"});
		cols.push({"id": "size",
					"label": "Filesystem Size (GB)",
					"type": "number"});
		cols.push({"id": "used",
					"label": "Filesystem Used (GB)",
					"type": "number"});
		cols.push({"id": "psize",
					"label": "/public/ size (GB)",
					"type": "number"});
		cols.push({"id": "subsize",
					"label": "Sub-directory size (GB)",
					"type": "number"});
		cols.push({"id": "element",
					"label": "Responsible Element",
					"type": "string"});
		cols.push({"id": "speedtype",
					"label": "Speedtype",
					"type": "number"});
    };	
    $scope.getReport();
    
    $scope.makeChart = function(){
    	var localChart=[];
    	localChart={
	    	"type": "Table",
	    	"displayed": true,
	    	"data": {
	    		"cols": cols,
	    		"rows": $scope.report
	    	},
	    };
	    return localChart;
    };
}]);