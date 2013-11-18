'use strict';

/* Services */
reportsModule.factory('dataFactory', function($http){
    
    var dataFactory = {};
    
    dataFactory.getSPARQLQuery = function (urlBase, queryStr) {
        var query = "query=" + escape(queryStr);
        return $http.post(urlBase,query,{headers: {"Accept": "application/sparql-results+json", 'Content-type': 'application/x-www-form-urlencoded'}});
    };
    
    return dataFactory;
});

reportsModule.factory('formatFactory', function(){
    var formatFactory = {};
    
    formatFactory.formatWebReport = function(jsonObj){
		var list = [];
		var dfsize;
		var dfused;
		var Size;
		var Used;
		var sze;
		var dfs;
		var dfu;
		var usd;
		var response;
		var speed;
		var reorg;
		var directory;
		var dirurl;
		var files;
		var filesuri;

        // Build up a table of results.
	        for(var i = 0; i<  jsonObj.results.bindings.length; i++) {
	          sze = new Number(jsonObj.results.bindings[i].Size.value)/1024/1024;
	          if(typeof jsonObj.results.bindings[i].FileSystem === 'undefined') {
	          	files = jsonObj.results.bindings[i].webFileSystem.value;
	          	filesuri = jsonObj.results.bindings[i].webfs.value;
	          	dfs = new Number(jsonObj.results.bindings[i].webDFSize.value)/1024/1024;
	            dfu = new Number(jsonObj.results.bindings[i].webDFUsed.value)/1024/1024;
	          }
	          else {
	          	files = jsonObj.results.bindings[i].FileSystem.value;
	          	filesuri = jsonObj.results.bindings[i].fs.value;
	          	dfs = new Number(jsonObj.results.bindings[i].DFSize.value)/1024/1024;
	            dfu = new Number(jsonObj.results.bindings[i].DFUsed.value)/1024/1024;
	          }
	          if(typeof jsonObj.results.bindings[i].Speedtype === 'undefined')
	          	speed = " ";
	          else 
	          	speed = jsonObj.results.bindings[i].Speedtype.value;
	          if(typeof jsonObj.results.bindings[i].ResponsibleElement === 'undefined'){
	          	response = ' ';
	          	reorg = ' ';
	          }
	          else {
	          	response = jsonObj.results.bindings[i].ResponsibleElement.value;
	          	reorg = jsonObj.results.bindings[i].resporg.value;
	          }
	          if(typeof jsonObj.results.bindings[i].webdir === 'undefined'){
	          	usd = new Number(jsonObj.results.bindings[i].Used.value)/1024/1024;
	          	directory = jsonObj.results.bindings[i].lowDir.value;
	          	dirurl = jsonObj.results.bindings[i].MountPoint.value;
	          }
	          else {
	          	usd = new Number(jsonObj.results.bindings[i].websize.value)/1024/1024;
	          	dirurl = "/public/web" + jsonObj.results.bindings[i].webdir.value;
	          	directory = jsonObj.results.bindings[i].web.value;
	          }
	          if(typeof jsonObj.results.bindings[i].weborg !== 'undefined'){
	          	speed = jsonObj.results.bindings[i].webspeed.value;
	          	response = jsonObj.results.bindings[i].weborg.value;
	          	reorg = jsonObj.results.bindings[i].webresponse.value;
	          }
	          dfsize = dfs.toFixed(1);
	          dfused = dfu.toFixed(1);
	          Size = sze.toFixed(1);
	          Used = usd.toFixed(1);
	          list.push({"c": [
	          			   {"v": files},
	                       {"v": dirurl},
	                       {"v": dfsize},
	                       {"v": dfused},
	                       {"v": Size},
	                       {"v": Used},
	                       {"v": response},
	                       {"v": speed}]
	                    });
	        }
        return list;
    };
    
    formatFactory.formatDatabaseReport = function(jsonObj){
    	var list = [];
		var dfsize;
		var dfused;
		var dbused;
		var dfs;
		var dfu;
		var dbu;
		var response;
		var reorg;
		var speed;

        // Build up a table of results.
        for(var i = 0; i<  jsonObj.results.bindings.length; i++) {
          dfs = new Number(jsonObj.results.bindings[i].DFSizeinGB.value)/1024/1024;
          dfu = new Number(jsonObj.results.bindings[i].DFUsedinGB.value)/1024/1024;
          dbu = new Number(jsonObj.results.bindings[i].DBFileSizeinGB.value)/1024/1024;
          if(typeof jsonObj.results.bindings[i].SpeedType === 'undefined')
          	speed = " ";
          else 
          	speed = jsonObj.results.bindings[i].SpeedType.value;
          if(typeof jsonObj.results.bindings[i].ResponsibleElement === 'undefined'){
          	response = ' ';
          	reorg = ' ';
          }
          else {
          	response = jsonObj.results.bindings[i].ResponsibleElement.value;
          	reorg = jsonObj.results.bindings[i].resporg.value;
          }
          dfsize = dfs.toFixed(1);
          dfused = dfu.toFixed(1);
          dbused = dbu.toFixed(1);
          list.push({"c": [
      			   {"v": jsonObj.results.bindings[i].DBType.value},
                   {"v": jsonObj.results.bindings[i].Server.value},
                   {"v": jsonObj.results.bindings[i].Database.value},
                   {"v": jsonObj.results.bindings[i].Mountpoint.value},
                   {"v": dbused},
                   {"v": dfsize},
                   {"v": dfused},
                   {"v": response},
                   {"v": speed}]
                });
        }
        return list;
    };
    
    formatFactory.formatDSReport = function(jsonObj){
    	var list = [];
		var dfsize;
		var dfused;
		var dfs;
		var dfu;
		var response;
		var speed;
		var reorg;

        // Build up a table of results.
        for(var i = 0; i<  jsonObj.results.bindings.length; i++) {
          dfs = new Number(jsonObj.results.bindings[i].DFSize.value)/1024/1024;
          dfu = new Number(jsonObj.results.bindings[i].DFUsed.value)/1024/1024;
          if(typeof jsonObj.results.bindings[i].Speedtype === 'undefined')
          	speed = " ";
          else 
          	speed = jsonObj.results.bindings[i].Speedtype.value;
          if(typeof jsonObj.results.bindings[i].ResponsibleElement === 'undefined'){
          	response = ' ';
          	reorg = ' ';
          }
          else {
          	response = jsonObj.results.bindings[i].ResponsibleElement.value;
          	reorg = jsonObj.results.bindings[i].resporg.value;
          }
          dfsize = dfs.toFixed(1);
          dfused = dfu.toFixed(1);
          list.push({"c": [
      			   {"v": jsonObj.results.bindings[i].FileSystem.value},
                   {"v": jsonObj.results.bindings[i].MountPoint.value},
                   {"v": dfsize},
                   {"v": dfused},
                   {"v": response},
                   {"v": speed}]
                });
	    }
        return list;
    };
    
    formatFactory.formatMarinerReport = function(jsonObj){
    	var list = [];
		var dfsize;
		var dfused;
		var dirsize;
		var dfs;
		var dfu;
		var dir;
		var response;
		var speed;
		var reorg;
		var filesys;
		var fileurl;

        // Build up a table of results.
        for(var i = 0; i<  jsonObj.results.bindings.length; i++) {
          dir = new Number(jsonObj.results.bindings[i].DirUsed.value)/1024/1024;
          dirsize = dir.toFixed(1);
          if(typeof jsonObj.results.bindings[i].Speedtype === 'undefined')
	      	speed = " ";
	      else 
	       	speed = jsonObj.results.bindings[i].Speedtype.value;
	      if(typeof jsonObj.results.bindings[i].ResponsibleElement === 'undefined'){
	       	response = ' ';
	       	reorg = ' ';
	      }
	      else {
	       	response = jsonObj.results.bindings[i].ResponsibleElement.value;
	       	reorg = jsonObj.results.bindings[i].resporg.value;
	      }
	      if(typeof jsonObj.results.bindings[i].DFSize === 'undefined'){
	       	dfu = 0;
	       	dfs = 0;
	      }
	      else {
	       	dfs = new Number(jsonObj.results.bindings[i].DFSize.value)/1024/1024;
            dfu = new Number(jsonObj.results.bindings[i].DFUsed.value)/1024/1024;
	      }
	      if(typeof jsonObj.results.bindings[i].FileSystem === 'undefined'){
	       	filesys = ' ';
	       	fileurl = ' ';
	      }
	      else {
	       	filesys = jsonObj.results.bindings[i].FileSystem.value;
	       	fileurl = jsonObj.results.bindings[i].fs.value;
	      }
	      dfsize = dfs.toFixed(1);
          dfused = dfu.toFixed(1);
          list.push({"c": [
          			   {"v": filesys},
                       {"v": jsonObj.results.bindings[i].MountPoint.value},
                       {"v": dfsize},
                       {"v": dfused},
                       {"v": jsonObj.results.bindings[i].Directory.value},
                       {"v": dirsize},
                       {"v": response},
                       {"v": speed}]
                    });
        } 
        return list;
    };
    
    formatFactory.formatDataProductReport = function(jsonObj){	
        var list = [];
        // Build up a table of results.
        for(var i = 0; i<  jsonObj.results.bindings.length; i++) {
        	list.push({"c": [
          			   {"v": jsonObj.results.bindings[i].dataset.value},
                       {"v": jsonObj.results.bindings[i].dataproduct.value},
                       {"v": jsonObj.results.bindings[i].instrument.value},
                       {"v": jsonObj.results.bindings[i].spacecraft.value}]
        	});
        }
        return list;
    };
    
    return formatFactory;
});
