// image object that sets up folders
var imagesObj = {
  'fall': [     "america",
                "japan",
                "children",
                "black-metal",
                "detroit"],

  'winter': [   "forge",
                "dogtown",
                "dead-witch" ],

  'spring': [   "forge",
                "dogtown",
                "dead-witch" ]
}

/* hide or show a set of elements
 * param: selector can be any selector
 * param: display should be either 'none' (to hide) or '' (to show)
 */
set_selector_display = function(selector, display) {
  var ele = document.querySelectorAll(selector);
  Array.prototype.forEach.call(ele, function(e) {
    e.style.display = display;
  });
}

// check if a url exists
function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

// function to select a thumbnail
function select_thumb(folder) {

  // hide all the thumbnails
  set_selector_display(".thumbs.row", 'none');
  set_selector_display(".full-images", 'none');

  // show the image and text
  document.querySelector("#"+folder+"-full").style.display = '';

}

// function to append element to last of a selection
function append_last(selector, element) {

  var selection = document.querySelectorAll(selector);
  var last_selection = selection[selection.length - 1];
  last_selection.appendChild(element);

}

/* function to load images
 * root can be packaging or posters... 'images-' will be prepended when appr.
 * folders should be a list with each folder name inside 'images-<root>'
 */
function folder_loaders(root, folders) {

  // add the initial row (where the images will sit)
  var init_row = document.createElement('div');
  init_row.setAttribute('class', 'thumbs row ' + root );

  append_last("#thumbnails", init_row);

  // iterate through each packaging folder
  Array.prototype.forEach.call( folders, function(folder, index) {

    // get the image info
    var thumb_path = "images-" + root + "/" + folder + "/thumb.png";

    // div with thumb and text
    var new_element = document.createElement('div');
    new_element.setAttribute('class', "three columns");
    new_element.setAttribute('id', folder+'-thumb');
    new_element.innerHTML = '\
      <a href="#'+root+'#'+folder+'">\
        <img id="'+folder+'" class="thumb" src=' + thumb_path + ' onclick="select_thumb(\''+folder+'\')" width="100%">\
      </a>\
    ';

    // append the div
    append_last(".thumbs.row", new_element)

    // if this is the last image in a row
    if (index%3 == 2) {
      // start the next row
      var next_row = document.createElement('div');
      next_row.setAttribute('class', 'thumbs row ' + root );
      append_last("#thumbnails", next_row)
    }

    // get the info for the full page version
    var full_path = "images-" + root + "/" + folder + "/full.png";
    var full_text_path = "images-" + root + "/" + folder + "/full_text.txt";

    var full_images_div = document.createElement('div');
    full_images_div.setAttribute('class', "full-images");
    full_images_div.setAttribute('id', folder+'-full');

    // append the div
    append_last("#fulls", full_images_div);

    function newFullSection(folder, imageSrc, text_id) {

      /* FULL IMAGE ROW */

      var new_row = document.createElement('div');
      new_row.setAttribute('class', "row image-row");

      append_last('#'+folder+'-full', new_row);

      var new_image_div = document.createElement('div');
      new_image_div.setAttribute('class', folder+"-full image-container tweleve columns");
      new_image_div.innerHTML = '\
        <img class="full-image" src=' + imageSrc + ' width="100%">\
      ';

      append_last('#'+folder+'-full .row.image-row', new_image_div);

      /* TEXT ROW */

      var new_row = document.createElement('div');
      new_row.setAttribute('class', "row text-row");

      append_last('#'+folder+'-full', new_row);

      var new_text_div = document.createElement('div');
      new_text_div.setAttribute('class', folder+"-full text-container ten columns");
      new_text_div.innerHTML = '\
        <p id='+text_id+' class="'+folder+'-full full-text"></p>\
      ';

      var prev_div = document.createElement('div');
      var prevHref, prevStatus, prevImage
      if(index == 0) {
        prevHref = "";
        prevStatus = "class=inactive"
        prevImage = "";
      }
      else {
        prevHref = "href=#"+root+"#"+folders[index-1];
        prevStatus = "";
        prevImage = 'onclick="select_thumb(\''+folders[index-1]+'\')"';
      }
      prev_div.setAttribute('class', "one columns");
      prev_div.innerHTML = '\
        <a '+prevHref+' '+prevStatus+' '+prevImage+' >prev</a>\
      ';

      var next_div = document.createElement('div');
      var nextHref, nextStatus, nextImage
      if(index == folders.length-1) {
        nextHref = "";
        nextStatus = "class=inactive"
        nextImage = "";
      }
      else {
        nextHref = "href=#"+root+"#"+folders[index+1];
        nextStatus = "";
        nextImage = 'onclick="select_thumb(\''+folders[index+1]+'\')"';
      }
      next_div.setAttribute('class', "one columns");
      next_div.innerHTML = '\
        <a '+nextHref+' '+nextStatus+' '+nextImage+' >next</a>\
      ';

      append_last('#'+folder+'-full .row.text-row', prev_div);
      append_last('#'+folder+'-full .row.text-row', new_text_div);
      append_last('#'+folder+'-full .row.text-row', next_div);

    }

    newFullSection(folder, full_path, "text_block");

    // load in the full_text
    var full_text;
    var text_blocks;
    var full_text_loader = new XMLHttpRequest();
    full_text_loader.open("GET",full_text_path,true);
    full_text_loader.send();

    // load and prepare full text for multiple images
    full_text_loader.onreadystatechange = function() {
      if (this.readyState== 4 && this.status == 200){
        full_text = this.responseText;

        ele = document.querySelector("#text_block."+folder+"-full.full-text");
        ele.textContent = full_text;
      }
    }

  });
}

// when the document has been loaded
document.addEventListener('DOMContentLoaded', function(){

  folder_loaders("fall", imagesObj["fall"]);
  folder_loaders("winter", imagesObj["winter"]);
  folder_loaders("spring", imagesObj["spring"]);

});
