var app = angular.module('itunes');

app.service('itunesService', function($http, $q){
  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also note that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in.
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

    //Code here
    this.artistGrab = function(artist) {
    	var dfd = $q.defer();
    	$http({
    		method: 'JSONP',
    		url: 'https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
    	}).then(function(response) {
    		console.log(response);
    		var arr1 = response.data.results;
    		console.log(arr1); 
    		var arr2 = [];
			for (var i = 0; i < arr1.length; i++) {
				arr2[i] = {
					AlbumArt: arr1[i].artworkUrl60,
					Artist: arr1[i].artistName,
					Collection: arr1[i].collectionName,
					CollectionPrice: arr1[i].collectionPrice,
					Play: arr1[i].previewUrl,
					Type: arr1[i].kind,
					Song: arr1[i].trackName,
					SongPrice: arr1[i].trackPrice
				}
			}
    		dfd.resolve(arr2);
    	})
    	return dfd.promise;
    };
});
