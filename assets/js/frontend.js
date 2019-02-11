const electron = require('electron');
const clipboard = electron.clipboard;
const remote = require('electron').remote;
const shell = require('electron').shell;

$(document).ready(function(){  
    $("#copy-link").css("visibility", "hidden");
    $("#save-image").css("visibility", "hidden");
    $( "#search" ).on( "keydown", function(event) {
        if(event.which == 13) {
            var offset = Math.floor((Math.random() * 100) + 1);
            var search = $("#search").val();
            if(search.length < 1){
                swal("You need to enter at least something for us to search with silly!");
                return;
            }
            $("#gif").attr("src","./assets/images/loading.svg");
            var giphy_url = "https://api.giphy.com/v1/gifs/search?api_key="+config.giphyKey+"&q="+search+"&limit=1&offset="+offset+"&rating=R&lang=en";
            $.get(giphy_url, function(){
                // swal(data.data.images.fixed_height_still.url);                
            }).done(function(data) {                
                if(data.data[0]){
                    $("#gif").attr("src",data.data[0].images.original.url);
                    $("#copy-link").css("visibility", "visible");
                    $("#save-image").css("visibility", "visible");
                } else {
                    swal("We couldn't find you a gif 😔 Please try a different search");
                    $("#gif").attr("src","https://media.giphy.com/media/l0ExsgrTuACbtPaqQ/giphy.gif");
                    $("#copy-link").css("visibility", "hidden");
                    $("#save-image").css("visibility", "hidden");
                }                
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