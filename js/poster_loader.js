function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}


// when the document has been loaded
$(document).ready(function() {

  // for every posters folder
  var folders = [ "america",
                  "japan",
                  "children",
                  "black-metal",
                  "detroit"];


  // add the initial row (where the images will sit)
  $("#thumbnails").last().append('<div class="thumbs row posters">');

  // iterate through each posters folder
  $.each( folders, function(index,folder) {

    // get the package info
    thumb_path = "images-posters/" + folder + "/thumb.png";
    alt_text_path = "images-posters/" + folder + "/alt_text.txt";

    // append a div for the thumbnail and text
    $(".thumbs.row").last().append('\
      <div id="'+folder+'-thumb" class="three columns">\
        \
        <a href="#">\
          <img id="'+folder+'" class="thumb" src=' + thumb_path + ' width="100%">\
        </a>\
        <p class="'+folder+'-thumb alt-text"></p>\
      </div>\
    ');

    $("p."+folder+"-thumb.alt-text").load(alt_text_path);

    // if this is the last image in a row
    if (index%3 == 2) {
      // start the next row
      $("#thumbnails").last().append('<div class="thumbs row posters">');
    }

    // get the info for the full page version
    full_path = "images-posters/" + folder + "/full.png";
    full_text_path = "images-posters/" + folder + "/full_text.txt";


    // append a div for the image and text
    $("#fulls").append('\
      <div id="'+folder+'-full" class="full-images row">\
        <div class="'+folder+'-full image-container eight columns">\
          <img class="full-image" src=' + full_path + ' width="100%">\
        </div>\
        <div class="four columns">\
          <p class="'+folder+'-full full-text"></p>\
        </div>\
      </div>\
    ')

    // try to pull in other images (e.g. full1.png, full2.png, etc...)
    full_path_part = "images-posters/" + folder + "/full";
    current_img = 1;
    current_path = full_path_part + current_img + ".png";
    // while we still have images to load
    while ( UrlExists(current_path) ) {

      // append those images to the div
      $("."+folder+"-full.image-container").append('\
        <img class="full-image" src=' + current_path + ' width="100%">\
      ')

      // bump up the image number
      current_img = current_img + 1;
      current_path = full_path_part + current_img + ".png";
    }

    $("p."+folder+"-full.full-text").load(full_text_path);
    $("."+folder+"-full.image-container").append('\
      <a class="poster-back-button" href="#">back</a>\
    ');

  });

  $(".full-images").hide();

  // when you click on a thumb in a row
  $("img.thumb").click(function() {
    // hide all the thumbnails
    $(".thumbs.row.posters").hide();
    // show the image and text
    $("#"+this.id+"-full").show()
    // change the location of the page
    //TODO
  });
  $("a.poster-back-button").click(function() {
    // hide all the thumbnails
    $(".full-images").hide();
    // show the image and text
    $(".thumbs.row.posters").show();
    // change the location to the image
    //TODO
  });
});
