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
    
    return formatFactory;
});
