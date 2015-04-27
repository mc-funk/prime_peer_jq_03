var apikey = '8e59aef0a8bcad6ac1ccbb6c83bd9533ff6d71d5'; // Put your API key here

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
    console.log(results); //results is an array of objects with 1 object per search result.
}

$(document).ready(function() {

	// Start the search here!
	search('batman');
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.

function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}
//Take in search input
//Execute search
//Create 1 div per result - for (i = 0; i < results.length; i++) {create new bootsrap class as long as it's not > 12}
//Display selected information in unexpanded div <div class="bootstrappy class"><div></div>
//Display extended information in expanded div    <div style="display:none"></div></div>
//Ensure divs are placed appropriately (bootstrap)
//