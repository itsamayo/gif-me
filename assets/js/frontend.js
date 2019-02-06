const electron = require('electron');
const clipboard = electron.clipboard;
const remote = require('electron').remote;
const shell = require('electron').shell;

$(document).ready(function(){  
    $("#copy-link").css("visibility", "hidden");
    $("#save-image").css("visibility", "hidden");
    $( "#search" ).on( "keydown", function(event) {
        if(event.which == 13) {
        var search = $("#search").val();
        if(search.length < 1){
            swal("You need to enter at least something for us to search with silly!");
            return;
        }
        $("#gif").attr("src","./assets/images/loading.svg");        
        var giphy_url = "https://api.giphy.com/v1/gifs/random?api_key="+config.giphyKey+"&tag="+search+"&rating=R";
        $.get(giphy_url, function(data, status){
            // swal(data.data.images.fixed_height_still.url);
            $("#gif").attr("src",data.data.images.downsized_large.url);
            $("#copy-link").css("visibility", "visible");
            $("#save-image").css("visibility", "visible");
        });
        }          
    });

    $( "#copy-link" ).on( "click", function(element) {
        clipboard.writeText( $("#gif").attr("src"), 'selection');
		
		swal("Copied the gif's link to your clipboard");
    });

    $( "#giphy" ).on( "click", function(element) {
        shell.openExternal('https://giphy.com');
    });

    $( "#save-image" ).on( "click", function save2() {
        var a  = document.createElement('a');
        a.href = $("#gif").attr("src");
        a.download = 'giphy.gif';

        a.click()
    });

    $('#quit').click(function() {
        swal({
            title: "Are you sure?",
            buttons: true,
            dangerMode: true,
          })
          .then((quit) => {
            if (quit) {
                remote.getCurrentWindow().close();
            } 
          });
    });
})   