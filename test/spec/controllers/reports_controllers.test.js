describe('Unit Tests: pi512001Ctrl', function () {

	var $httpBackend, $http, $scope, $rootScope, $dataFactory, $formatFactory, $controller;
    var ctrl = null;

    beforeEach(angular.mock.module('reportsModule'));

  	beforeEach(inject(function($httpBackend, $http, $rootScope, dataFactory, formatFactory, $controller){
	    $httpBackend = $httpBackend;
	    $http = $http;
	    $scope = $rootScope.$new();
	    $dataFactory = dataFactory;
	    $formatFactory = formatFactory;
	    $httpBackend.expectPOST("http://lasp-db-dev:3030/VIVO/query",
                "query="+escape("PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspcms: <http://localhost:8080/laspcms#> SELECT ?webspeed ?webresponse ?weborg ?web ?websize ?webdir ?webfs ?webFileSystem ?webDFUsed ?webDFSize ?fs ?Size ?resporg ?ResponsibleElement ?Speedtype ?FileSystem ?lowDir ?MountPoint ?DFSize ?DFUsed ?Used WHERE { ?topDir laspcms:isTopLevelDirectoryOn <http://webdev1.lasp.colorado.edu:57529/vivo/individual/n26815> . ?topDir rdfs:label ?top . ?topDir laspcms:containsDirectory ?lowDir . ?lowDir rdfs:label ?low . ?MountPoint <http://jena.hpl.hp.com/ARQ/property#concat> (?top ?low) . ?topDir laspcms:hasDirectorySize ?Size . ?lowDir laspcms:hasDirectorySize ?Used . ?topDir laspcms:mountsFileSystem ?webfs . ?webfs rdfs:label ?webFileSystem . ?webfs laspcms:hasStorageSize ?webDFSize .?webfs laspcms:hasUsedSize ?webDFUsed  OPTIONAL { ?lowDir laspcms:mountsFileSystem ?fs . ?fs rdfs:label ?FileSystem . ?fs laspcms:hasStorageSize ?DFSize . ?fs laspcms:hasUsedSize ?DFUsed . } OPTIONAL { ?lowDir laspcms:responsibleOrganizationalElement ?resporg . ?resporg rdfs:label ?ResponsibleElement . ?resporg laspcms:billsToSpeedtype ?spdtype . ?spdtype rdfs:label ?Speedtype } OPTIONAL { ?lowDir laspcms:containsDirectory ?web . ?web rdfs:label ?webdir . ?web laspcms:hasDirectorySize ?websize . OPTIONAL { ?web laspcms:responsibleOrganizationalElement ?webresponse . ?webresponse rdfs:label ?weborg . ?webresponse laspcms:billsToSpeedtype ?webspdtyp . ?webspdtyp rdfs:label ?webspeed . }}}"),
                {"Accept": "application/sparql-results+json", 'Content-type': 'application/x-www-form-urlencoded'})
                .respond(200);
	      /* Below runs our controller code.  Note that it won't actually send its http request to the real server, but it will send it instead to
	       * our httpBackend, so it won't actually return any JSON from the endpoint.
	       */
	      ctrl = $controller('pi512001Ctrl', {
	      $scope: $scope,
	      $dataFactory: dataFactory,
	      $formatFactory: formatFactory,
	      $http: $http,
	    });
      	$httpBackend.flush();
    }));
	
	it("can get an instance of dataFactory", function(){
      //all assertions since $dataFactory was set up in our beforeEach above
      expect($dataFactory).toBeDefined();
    });
    
    it("can get an instance of formatFactory", function(){
    //all assertions since $dataFactory was set up in our beforeEach above
      expect($formatFactory).toBeDefined();
    });

    it("can find dataFactory.getSPARQLQuery()", function(){
      //all assertions since $dataFactory was set up in our beforeEach above
      expect($dataFactory.getSPARQLQuery).toBeDefined();
    });
    
    it("sent the correct SPARQL query to the correct place", function(){
      //all assertion since $scope has already been created by the controller in beforeEach above
      expect($scope.urlBase).toBe("http://lasp-db-dev:3030/VIVO/query");
      expect($scope.queryStr).toBe("PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#> PREFIX laspcms: <http://localhost:8080/laspcms#> SELECT ?webspeed ?webresponse ?weborg ?web ?websize ?webdir ?webfs ?webFileSystem ?webDFUsed ?webDFSize ?fs ?Size ?resporg ?ResponsibleElement ?Speedtype ?FileSystem ?lowDir ?MountPoint ?DFSize ?DFUsed ?Used WHERE { ?topDir laspcms:isTopLevelDirectoryOn <http://webdev1.lasp.colorado.edu:57529/vivo/individual/n26815> . ?topDir rdfs:label ?top . ?topDir laspcms:containsDirectory ?lowDir . ?lowDir rdfs:label ?low . ?MountPoint <http://jena.hpl.hp.com/ARQ/property#concat> (?top ?low) . ?topDir laspcms:hasDirectorySize ?Size . ?lowDir laspcms:hasDirectorySize ?Used . ?topDir laspcms:mountsFileSystem ?webfs . ?webfs rdfs:label ?webFileSystem . ?webfs laspcms:hasStorageSize ?webDFSize .?webfs laspcms:hasUsedSize ?webDFUsed  OPTIONAL { ?lowDir laspcms:mountsFileSystem ?fs . ?fs rdfs:label ?FileSystem . ?fs laspcms:hasStorageSize ?DFSize . ?fs laspcms:hasUsedSize ?DFUsed . } OPTIONAL { ?lowDir laspcms:responsibleOrganizationalElement ?resporg . ?resporg rdfs:label ?ResponsibleElement . ?resporg laspcms:billsToSpeedtype ?spdtype . ?spdtype rdfs:label ?Speedtype } OPTIONAL { ?lowDir laspcms:containsDirectory ?web . ?web rdfs:label ?webdir . ?web laspcms:hasDirectorySize ?websize . OPTIONAL { ?web laspcms:responsibleOrganizationalElement ?webresponse . ?webresponse rdfs:label ?weborg . ?webresponse laspcms:billsToSpeedtype ?webspdtyp . ?webspdtyp rdfs:label ?webspeed . }}}");
    });

    it("SPARQL query returned without errors", function(){
      //all assertions since $scope was set up in our beforeEach above
      expect($scope.error).toBe('');
    });
    
    
});
