var apikey = '8e59aef0a8bcad6ac1ccbb6c83bd9533ff6d71d5'; // Put your API key here

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
var i;
var j;
function searchCallback(results) {
    $('.resultsBlock').empty();
    //console.log(results); //results is an array of objects with 1 object per search result.
    for (i = 0; i < results.length; i++) {
        //create a div with two divs nested in it
        $(".resultsBlock").append("<div id='result" + i + "' class='col-md-3 searchResult'><div class='preview'></div><div style='display:none' class='extend'></div></div>");
        //div 1: image, name, original_release_date, deck
        $("#result" + i).children(".preview").append(
            "<p><img src='" + results[i].image.thumb_url + "' ></p>"
            );
        $("#result" + i).children(".preview").append(
            "<p class='gameTitle'>"+ results[i].name + "</p>");
        $("#result" + i).children(".preview").append(
            "<p>Release Date: "+ results[i].original_release_date + "</p>");
        $("#result" + i).children(".preview").append(
            "<p>"+ results[i].deck + "</p>");
        //div 2: desciption, site_detail_url, platforms
        $("#result" + i).children(".extend").append(
            "<p>" + results[i].description + "</p>");
        $("#result" + i).children(".extend").append(
            "<p class='platforms'>Platforms available:</p>");
        for (j = 0; j < results[i].platforms.length; j++) {
            if (j < (results[i].platforms.length - 1)) {
                $("#result" + i).children(".extend").append(
                    results[i].platforms[j].name + ", ");
            } else {
                $("#result" + i).children(".extend").append(
                    results[i].platforms[j].name);
            }
        }
    }
    //Display results: results[i][image][small_url] <--Remember image tag
}

$(document).ready(function() {

	// Start the search here!

    $('.resultsBlock').on("click", ".searchResult", function() {
        $(this).children(".extend").slideToggle();
    });

    //Text search reference: http://stackoverflow.com/questions/6524288/jquery-event-for-user-pressing-enter-in-a-textbox
    $('.search').keyup(function(e){
        console.log("Keyup worked at all");
        if(e.keyCode == 13)
        {
            search($(this).val());
        }
    });
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
//TODO: Take in search input
//Execute search
//DONE: Create 1 div per result - for (i = 0; i < results.length; i++)
//DONE: Display selected information in unexpanded div <div class="bootstrappy class"><div></div>
//DONE: Display extended information in expanded div    <div style="display:none"></div></div>
//DONE: Ensure divs are placed appropriately (bootstrap)
//TODO: Style search results
//TODO: Scrolling or other options for lots of text