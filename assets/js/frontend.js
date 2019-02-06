const electron = require('electron');
const clipboard = electron.clipboard;

$(document).ready(function(){
    var gif = "";
    $( "#search" ).on( "keydown", function(event) {
        if(event.which == 13) {
        var search = $("#search").val();
        if(search.length < 1){
            swal("You need to enter at least something for us to search with silly!");
            return;
        }
        var giphy_url = "https://api.giphy.com/v1/gifs/random?api_key=ony24LDgR05mH9UPeFdeH8aKjRrxzyQd&tag="+search+"&rating=G";
        $.get(giphy_url, function(data, status){
            // swal(data.data.images.fixed_height_still.url);
            $("#gif").attr("src",data.data.images.downsized_large.url);
            gif = data.data.images.downsized_large.url;
        });
        }          
    });

    $( "#copy-link" ).on( "click", function(element) {
        clipboard.writeText( $("#gif").attr("src"), 'selection');
		
		swal("Copied to clipboard");
    } )
})   