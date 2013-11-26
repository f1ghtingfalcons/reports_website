'use strict';

reportsModule.controller('storageArrayCtrl', ['$scope','dataFactory','$filter',function ($scope,dataFactory,$filter){      
	
	$scope.title="Storage Array Allocation";
	$scope.urlBase = 'http://lasp-db-dev:3030/VIVO/query';
	$scope.counter = 0;
	$scope.arrayQuery = 'select';

	function queryMaker()
    {
        if ($scope.arrayQuery == 'select')
		{
			$scope.queryStr = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX laspcms:<http://localhost:8080/laspcms#> SELECT (str(?array) AS ?Array) WHERE { ?thing a laspcms:StorageArray . ?thing rdfs:label ?array}";
		}
		else
		{
			$scope.queryStr = "PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> PREFIX laspcms:<http://localhost:8080/laspcms#> SELECT ?database ?DatabaseSize ?storagecap ?db ?fslabel ?fsstoragesize ?fsusedspace ?server WHERE {?db a laspcms:Database  . ?db rdfs:label ?database . ?db laspcms:usesFileSystem ?fs . ?fs laspcms:storedOnArray ?array . ?fs rdfs:label ?fslabel . ?fs laspcms:hasStorageSize ?fsstoragesize . ?fs laspcms:hasUsedSize ?fsusedspace . ?array rdfs:label ?arraylabel . FILTER(regex(str(?arraylabel), \"" + $scope.arrayQuery.name + "\")) . ?db laspcms:databaseFileSize ?DatabaseSize . OPTIONAL {?array laspcms:hasStorageCapacity ?storagecap} . OPTIONAL{?fs laspcms:mountedOnDirectory ?mountdir . ?mountdir laspcms:isTopLevelDirectoryOn ?serverurl . ?serverurl rdfs:label ?server}} ORDER BY DESC(?DatabaseSize)";
		}
    };
	
	$scope.sparqlQueryJson = function()
    {
    	$scope.chart=[];
    	//pass in drop down option values to create our final query
        queryMaker();
        //return the querry
        dataFactory.getSPARQLQuery($scope.urlBase, $scope.queryStr)
            .success(function(data){
            	$scope.error = '';
            	if($scope.counter>0){
            		$scope.data = formatArray(data);
            		$scope.chart = makeChart();
            		//draw additional details around the chart
					document.getElementById("details_div").innerHTML = "Hover over a chart slice or database name to see more details.";
					document.getElementById("notes").innerHTML = "Array capacity: "+Math.round($scope.arrayCapacity)+" GB<br>Total allocated space: "+Math.round($scope.arrayAllocated)+" GB<br>Free space remaining: "+Math.round($scope.freespace)+" GB<br><br>(Databases are ordered by size with the largest displaying first.)";
				}
            	else {
            		$scope.arrays = formatArray(data);
            		$scope.arrayQuery = $scope.arrays[0];
            		$scope.counter = $scope.arrays.length;
            	}
            })
            .error(function(data,status) {
                $scope.error = "Fuseki returned: " + status;
        	});
    };
	
    $scope.sparqlQueryJson();
  
    function makeChart(){
    	var localChart=[];
    	localChart={
	    	"type": "PieChart",
	    	"displayed": true,
	    	"data": $scope.data,
	    	"options": {
				title: $scope.arrayQuery.name + " Allocation (GB)",
				is3D: true,
				sliceVisibilityThreshold: 0,
				slices: $scope.sliceArray,
				chartArea: {left:0, right:0, width:"100%", height:"90%"},
				tooltip: {trigger: 'focus'},
			},
			"formatters": {}
	    };
	    return localChart;
    };	
    
    $scope.createCustomHTMLContent = function(dbURL, dbname, size, filesystemname, fsspace, fsused, server)
	{
		var returnHTML;
		if(dbname == 'Free Space Remaining')
		{
			returnHTML = dbname+': '+size+' GB ('+Math.round(1000*size/$scope.arrayCapacity)/10+'% of array capacity)';
		}
		else
		{
			returnHTML =  '<h3>Database Details:</h3>';
			returnHTML += '<b>DB Name:</b> '+dbname;
			returnHTML += '<br><b>VIVO URL:</b> <a href="'+dbURL+'">'+dbURL+'</a>';
			returnHTML += '<br><b>DB Size:</b> '+size+' GB ('+Math.round(1000*size/arrayCapacity)/10+'% of array capacity)';
			returnHTML += '<br><b>Stored on Filesystem:</b> '+filesystemname+' ('+filesystemname+' is currently using '+fsused+' GB ('+Math.round(1000*fsused/fsspace)/10+'%) of its total space, '+fsspace+' GB)';
			returnHTML += '<br><b>Server:</b> '+server;
		}
		return returnHTML;
	};
	
	$scope.sliceMouseOver = function(e)
	{
		chart.setSelection([e]);
		//get the item that the mouse is over and select information about it from the data table
		selection = chart.getSelection()[0];
		var dbURL = data.getValue(selection.row, 2);
		var dbname = data.getValue(selection.row, 0);
		var dbsize = data.getValue(selection.row, 1);
		var filesystemname = data.getValue(selection.row, 3);
		var filesystemspace = data.getValue(selection.row, 4);
		var filesystemused = data.getValue(selection.row, 5);
		var server = data.getValue(selection.row, 6);
		
		//change the information displayed in the details div
		document.getElementById("details_div").innerHTML = $scope.createCustomHTMLContent(dbURL, dbname, dbsize, filesystemname, filesystemspace, filesystemused, server);
	};
    
    function formatArray(jsonObj){
    	var list = [];
    	var rows = [];
    	var cols = [];
		
		if($scope.counter>0){		
			// Build up a list for the sorted results (SPARQL returns sorted list already).
			var resultsList = [];
			var dbname;
			var dbsize;
			var dbURL;
			var fslabel;
			var fsstoragesize;
			var fsusedspace;
			var server;
			
			$scope.arrayCapacity = (+jsonObj.results.bindings[0].storagecap.value)/1024/1024;
			$scope.arrayAllocated = 0;
			
			// Add each row from SPARQL query t            	// Grab capacity of array from SPARQL query:o resultsList
			for (var i = 0; i < jsonObj.results.bindings.length; i++)
			{	
				//create and reformat a few results from the SPARQL query
				dbname = {"v":jsonObj.results.bindings[i].database.value};
				dbsize = {"v":Math.round((+jsonObj.results.bindings[i].DatabaseSize.value)/1024/1024)};
				dbURL = {"v":jsonObj.results.bindings[i].db.value};
				fslabel = {"v":jsonObj.results.bindings[i].fslabel.value};
				fsstoragesize = {"v":Math.round((+jsonObj.results.bindings[i].fsstoragesize.value)/1024/1024)};
				fsusedspace = {"v":Math.round((+jsonObj.results.bindings[i].fsusedspace.value)/1024/1024)};
				server = {"v":jsonObj.results.bindings[i].server.value};
				
				// Add database name, size, etc to the list from the query
				resultsList.push([dbname, dbsize, dbURL, fslabel, fsstoragesize, fsusedspace, server]);
				
				$scope.arrayAllocated = $scope.arrayAllocated + (+jsonObj.results.bindings[i].DatabaseSize.value)/1024/1024;
			}
	
			// Run subtraction of allocated space and add free space entry to the resultsList
			$scope.freespace = Math.round($scope.arrayCapacity - $scope.arrayAllocated);
			resultsList.push([{"v":"Free Space Remaining"},{"v":$scope.freespace},{"v":""},{"v":""},{"v":0},{"v":0},{"v":""}]);
						
			//Setup headers for google visualization
			cols.push({"id": "database",
					"label": "Database",
					"type": "string"});
			cols.push({"id": "size",
					"label": "Size",
					"type": "number"});
			cols.push({"id": "url",
					"label": "URL",
					"type": "string"});
			cols.push({"id": "filesystem",
					"label": "Filesystem",
					"type": "string"});
			cols.push({"id": "fsspace",
					"label": "FSspace",
					"type": "number"});
			cols.push({"id": "fsused",
					"label": "FSused",
					"type": "number"});
			cols.push({"id": "server",
					"label": "Server",
					"type": "string"});
								
			for(var i=0;i<resultsList.length;i++){
				rows.push({"c": resultsList[i]});
			}
			list = {"cols": cols,"rows": rows};
			
			// Set up a slice properties array so we can set the last slice (always free space remaining) to always display as green
			$scope.lastIndex = resultsList.length-1;
			$scope.sliceArray = [];
			for(i = 0; i < $scope.lastIndex; i++)
			{
				$scope.sliceArray.push({});
			}
			$scope.sliceArray.push({color: 'green'});
		}
		else {
			list.push({"name":'select'});
			for (var i = 0; i < jsonObj.results.bindings.length; i++){
				list.push({"name":jsonObj.results.bindings[i].Array.value});
			}
		}
    	return list;
    }
}]);