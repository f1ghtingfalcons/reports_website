'use strict';

reportsModule.controller('pi512001Ctrl', ['$scope','dataFactory','formatFactory','ngTableParams','$filter',function ($scope, dataFactory, formatFactory, ngTableParams,$filter){      
	
	$scope.title="Web Storage Report";
	
	var report=[];
	var cols=[];
	
	var urlBase = 'http://lasp-db-dev:3030/VIVO/query';
    var queryStr = "PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspcms: <http://localhost:8080/laspcms#> SELECT ?webspeed ?webresponse ?weborg ?web ?websize ?webdir ?webfs ?webFileSystem ?webDFUsed ?webDFSize ?fs ?Size ?resporg ?ResponsibleElement ?Speedtype ?FileSystem ?lowDir ?MountPoint ?DFSize ?DFUsed ?Used WHERE { ?topDir laspcms:isTopLevelDirectoryOn <http://webdev1.lasp.colorado.edu:57529/vivo/individual/n26815> . ?topDir rdfs:label ?top . ?topDir laspcms:containsDirectory ?lowDir . ?lowDir rdfs:label ?low . ?MountPoint <http://jena.hpl.hp.com/ARQ/property#concat> (?top ?low) . ?topDir laspcms:hasDirectorySize ?Size . ?lowDir laspcms:hasDirectorySize ?Used . ?topDir laspcms:mountsFileSystem ?webfs . ?webfs rdfs:label ?webFileSystem . ?webfs laspcms:hasStorageSize ?webDFSize .?webfs laspcms:hasUsedSize ?webDFUsed  OPTIONAL { ?lowDir laspcms:mountsFileSystem ?fs . ?fs rdfs:label ?FileSystem . ?fs laspcms:hasStorageSize ?DFSize . ?fs laspcms:hasUsedSize ?DFUsed . } OPTIONAL { ?lowDir laspcms:responsibleOrganizationalElement ?resporg . ?resporg rdfs:label ?ResponsibleElement . ?resporg laspcms:billsToSpeedtype ?spdtype . ?spdtype rdfs:label ?Speedtype } OPTIONAL { ?lowDir laspcms:containsDirectory ?web . ?web rdfs:label ?webdir . ?web laspcms:hasDirectorySize ?websize . OPTIONAL { ?web laspcms:responsibleOrganizationalElement ?webresponse . ?webresponse rdfs:label ?weborg . ?webresponse laspcms:billsToSpeedtype ?webspdtyp . ?webspdtyp rdfs:label ?webspeed . }}}";
	
	function getReport(){
        dataFactory.getSPARQLQuery(urlBase, queryStr)
            .success(function(data){
            	$scope.error = '';
                report=formatFactory.formatWebReport(data);
                $scope.chart=makeChart();
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
    getReport();
    
    function makeChart(){
    	var localChart=[];
    	localChart={
	    	"type": "Table",
	    	"displayed": true,
	    	"data": {
	    		"cols": cols,
	    		"rows": report
	    	},
	    };
	    return localChart;
    };
}]);

reportsModule.controller('marinerCtrl', ['$scope','dataFactory','formatFactory','ngTableParams','$filter',function ($scope, dataFactory, formatFactory, ngTableParams,$filter){      
	
	$scope.title="Mariner Storage Report";
	
	var report=[];
	var cols=[];
	
	var urlBase = 'http://lasp-db-dev:3030/VIVO/query';
    var queryStr = "PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspcms: <http://localhost:8080/laspcms#> SELECT ?resporg ?fs ?dir ?dir2 ?FileSystem ?MountPoint ?Directory ?DFUsed ?DFSize ?DirUsed ?ResponsibleElement ?Speedtype WHERE { ?dir laspcms:isTopLevelDirectoryOn <http://webdev1.lasp.colorado.edu:57529/vivo/individual/n1125> . ?dir rdfs:label ?MountPoint . ?dir laspcms:containsDirectory ?dir2 . ?dir2 rdfs:label ?Directory . ?dir2 laspcms:hasDirectorySize ?DirUsed . OPTIONAL { ?dir laspcms:mountsFileSystem ?fs . ?fs rdfs:label ?FileSystem . ?fs laspcms:hasUsedSize ?DFUsed . ?fs laspcms:hasStorageSize ?DFSize . } OPTIONAL { ?dir2 laspcms:mountsFileSystem ?fs . ?fs rdfs:label ?FileSystem . ?fs laspcms:hasUsedSize ?DFUsed . ?fs laspcms:hasStorageSize ?DFSize . } OPTIONAL { ?dir2 laspcms:responsibleOrganizationalElement ?resporg . ?resporg rdfs:label ?ResponsibleElement . ?resporg laspcms:billsToSpeedtype ?spdtype . ?spdtype rdfs:label ?Speedtype } } ORDER BY ?FileSystem ?MountPoint ?Directory";
	
	function getReport(){
        dataFactory.getSPARQLQuery(urlBase, queryStr)
            .success(function(data){
            	$scope.error = '';
                report=formatFactory.formatMarinerReport(data);
                $scope.chart=makeChart();
            })
            .error(function(data,status) {
                $scope.error = "Fuseki returned: " + status;
        	});
        //Setup headers for google visualization
		cols.push({"id": "filesystem",
					"label": "Filesystem",
					"type": "string"});
		cols.push({"id": "mount",
					"label": "Mount Point",
					"type": "string"});
		cols.push({"id": "dfsize",
					"label": "DF Size (GB)",
					"type": "number"});
		cols.push({"id": "dfused",
					"label": "DF Used (GB)",
					"type": "number"});
		cols.push({"id": "directory",
					"label": "Directory",
					"type": "string"});
		cols.push({"id": "dusize",
					"label": "DU Size",
					"type": "number"});
		cols.push({"id": "element",
					"label": "Responsible Element",
					"type": "string"});
		cols.push({"id": "speedtype",
					"label": "Speedtype",
					"type": "number"});
    };	
    getReport();
    
    function makeChart(){
    	var localChart=[];
    	localChart={
	    	"type": "Table",
	    	"displayed": true,
	    	"data": {
	    		"cols": cols,
	    		"rows": report
	    	},
	    };
	    return localChart;
    };
}]);

reportsModule.controller('databaseCtrl', ['$scope','dataFactory','formatFactory','ngTableParams','$filter',function ($scope, dataFactory, formatFactory, ngTableParams,$filter){      
	
	$scope.title="Database Storage Report";
	
	var report=[];
	var cols=[];
	
	var urlBase = 'http://lasp-db-dev:3030/VIVO/query';
    var queryStr = "PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspcms: <http://localhost:8080/laspcms#> SELECT DISTINCT ?resporg ?spdtype ?ResponsibleElement ?dir ?db ?serv ?SpeedType ?Database ?DBType ?Mountpoint ?Server ?DBFileSizeinGB ?DFSizeinGB ?DFUsedinGB WHERE { ?db a laspcms:Database . ?db rdfs:label ?Database . ?db laspcms:hasDatabaseType ?type . ?type rdfs:label ?DBType . ?db laspcms:usesFileSystem ?fs . ?fs laspcms:mountedOnDirectory ?dir . ?dir rdfs:label ?Mountpoint . ?dir laspcms:isTopLevelDirectoryOn ?serv . ?serv rdfs:label ?Server . ?db laspcms:databaseFileSize ?DBFileSizeinGB . ?fs laspcms:hasStorageSize ?DFSizeinGB . ?fs laspcms:hasUsedSize ?DFUsedinGB . OPTIONAL { ?db laspcms:responsibleOrganizationalElement ?resporg . ?resporg rdfs:label ?ResponsibleElement . ?resporg laspcms:billsToSpeedtype ?spdtype . ?spdtype rdfs:label ?SpeedType }} ORDER BY ?DBType ?Server ?Database";
	
	function getReport(){
        dataFactory.getSPARQLQuery(urlBase, queryStr)
            .success(function(data){
            	$scope.error = '';
                report=formatFactory.formatDatabaseReport(data);
                $scope.chart=makeChart();
            })
            .error(function(data,status) {
                $scope.error = "Fuseki returned: " + status;
        	});
        //Setup headers for google visualization
		cols.push({"id": "dbtype",
					"label": "DB Type",
					"type": "string"});
		cols.push({"id": "server",
					"label": "Server",
					"type": "string"});
		cols.push({"id": "database",
					"label": "Database",
					"type": "string"});
		cols.push({"id": "mountpoint",
					"label": "Mount Point",
					"type": "string"});
		cols.push({"id": "dbsize",
					"label": "DB Size (GB)",
					"type": "number"});
		cols.push({"id": "dfsize",
					"label": "DF Size (GB)",
					"type": "number"});
		cols.push({"id": "dfused",
					"label": "DF Used (GB)",
					"type": "number"});
		cols.push({"id": "element",
					"label": "Responsible Element",
					"type": "string"});
		cols.push({"id": "speedtype",
					"label": "Speedtype",
					"type": "number"});
    };	
    getReport();
    
    function makeChart(){
    	var localChart=[];
    	localChart={
	    	"type": "Table",
	    	"displayed": true,
	    	"data": {
	    		"cols": cols,
	    		"rows": report
	    	},
	    };
	    return localChart;
    };
}]);

reportsModule.controller('dsCtrl', ['$scope','dataFactory','formatFactory','ngTableParams','$filter',function ($scope, dataFactory, formatFactory, ngTableParams,$filter){      
	
	$scope.title="DS Storage Report";
	
	var report=[];
	var cols=[];
	
	var urlBase = 'http://lasp-db-dev:3030/VIVO/query';
    var queryStr = "PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspcms: <http://localhost:8080/laspcms#> SELECT DISTINCT ?resporg ?fs ?dir ?FileSystem ?MountPoint ?DFSize ?DFUsed ?ResponsibleElement ?Speedtype WHERE { ?dir laspcms:isTopLevelDirectoryOn <http://webdev1.lasp.colorado.edu:57529/vivo/individual/n5408> . ?dir rdfs:label ?MountPoint . ?dir laspcms:mountsFileSystem ?fs . ?fs rdfs:label ?FileSystem . ?fs laspcms:hasStorageSize ?DFSize . ?fs laspcms:hasUsedSize ?DFUsed . OPTIONAL { ?dir laspcms:responsibleOrganizationalElement ?resporg . ?resporg rdfs:label ?ResponsibleElement . ?resporg laspcms:billsToSpeedtype ?spdtype . ?spdtype rdfs:label ?Speedtype }} ORDER BY ?FileSystem ?MountPoint";
	
	function getReport(){
        dataFactory.getSPARQLQuery(urlBase, queryStr)
            .success(function(data){
            	$scope.error = '';
                report=formatFactory.formatDSReport(data);
                $scope.chart=makeChart();
            })
            .error(function(data,status) {
                $scope.error = "Fuseki returned: " + status;
        	});
        //Setup headers for google visualization
		cols.push({"id": "filesystem",
					"label": "Filesystem",
					"type": "string"});
		cols.push({"id": "mountpoint",
					"label": "Mount Point",
					"type": "string"});
		cols.push({"id": "dfsize",
					"label": "DF Size (GB)",
					"type": "number"});
		cols.push({"id": "dfused",
					"label": "DF Used (GB)",
					"type": "number"});
		cols.push({"id": "element",
					"label": "Responsible Element",
					"type": "string"});
		cols.push({"id": "speedtype",
					"label": "Speedtype",
					"type": "number"});
    };	
    getReport();
    
    function makeChart(){
    	var localChart=[];
    	localChart={
	    	"type": "Table",
	    	"displayed": true,
	    	"data": {
	    		"cols": cols,
	    		"rows": report
	    	},
	    };
	    return localChart;
    };
}]);