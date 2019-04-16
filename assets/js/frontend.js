const electron = require('electron');
const clipboard = electron.clipboard;
const remote = require('electron').remote;
const shell = require('electron').shell;

$(document).ready(function(){ 
    var gifs = []; 
    var currentGif = {};
    var currentGifIndex = 0;
    $("#copy-link").css("visibility", "hidden");
    $("#save-image").css("visibility", "hidden");
    $("#prev-gif").css("visibility", "hidden");
    $("#next-gif").css("visibility", "hidden");

    $( "#search" ).on( "keydown", function(event) {
        if(event.which == 13) {
            var offset = Math.floor((Math.random() * 100) + 1);
            var search = $("#search").val();            
            currentGifIndex = 0;    
            $("#prev-gif").css("visibility", "hidden");
            if(search.length < 1){
                swal("You need to enter at least something for us to search with silly!");
                return;
            }
            $("#gif").attr("src","./assets/images/loading.svg");           
            var giphy_url = "https://api.giphy.com/v1/gifs/search?api_key="+config.giphyKey+"&q="+search+"&limit=25&offset=0&rating=R&lang=en";
            $.get(giphy_url, function(){
                // swal(data.data.images.fixed_height_still.url);                
            }).done(function(data) {                
                if(data.data[0]){
                    gifs = data.data;
                    currentGif = gifs[0];                    
                    $("#gif").attr("src",currentGif.images.original.url);
                    $("#copy-link").css("visibility", "visible");
                    $("#save-image").css("visibility", "visible");
                    // $("#prev-gif").css("visibility", "visible");
                    $("#next-gif").css("visibility", "visible");
                    console.log('Current gif index: ' + currentGifIndex + '\n' + 'Current gif: ' + currentGif.images.original.url);              
                } else {
                    swal("We couldn't find you a gif 😔 Please try a different search");
                    $("#gif").attr("src","https://media.giphy.com/media/l0ExsgrTuACbtPaqQ/giphy.gif");
                    $("#copy-link").css("visibility", "hidden");
                    $("#save-image").css("visibility", "hidden");
                    $("#prev-gif").css("visibility", "hidden");
                    $("#next-gif").css("visibility", "hidden");
                }                
            });
        }          
    });

    $( "#prev-gif" ).on( "click", function(element) {
        if(currentGifIndex-1 >= 0){
            $("#gif").attr("src","./assets/images/loading.svg");           
            $("#gif").attr("src",gifs[currentGifIndex-1].images.original.url);  
            currentGif = gifs[currentGifIndex-1];
            currentGifIndex = currentGifIndex-1;    
            console.log('Current gif index: ' + currentGifIndex + '\n' + 'Current gif: ' + currentGif.images.original.url);              
        }
        if(currentGifIndex == 0){
            $("#prev-gif").css("visibility", "hidden");
        }
    });

    $( "#next-gif" ).on( "click", async function(element) {
        if(currentGifIndex+1 <= gifs.length){
            $("#gif").attr("src","./assets/images/loading.svg");           
            $("#gif").attr("src", await gifs[currentGifIndex+1].images.original.url);
            currentGif = gifs[currentGifIndex+1];
            currentGifIndex = currentGifIndex+1;
            console.log('Current gif index: ' + currentGifIndex + '\n' + 'Current gif: ' + currentGif.images.original.url);            
        } 
        if(currentGifIndex+1 == gifs.length){
            $("#next-gif").css("visibility", "hidden");
        }       
        if(currentGifIndex > 0){
            $("#prev-gif").css("visibility", "visible");
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
        remote.getCurrentWindow().close();
    });
})   