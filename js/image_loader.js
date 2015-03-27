// image object that sets up folders
var imagesObj = {
  'fall':   [
                "Photo_02",
                "Photo_05",
                "Photo_06",
                "Photo_10",
                "Photo_11",
                "Photo_12",
                "Photo_13",
                "Photo_14",
                "Photo_15",
                "Photo_16",
                "Photo_18",
                "Photo_19",
                "Photo_22",
                "Photo_23",
                "Photo_25",
                "Photo_27",
                "Photo_28",
                "Photo_29",
                "Photo_32",
                "Photo_34",
                "Photo_36",
                "Photo_39",
                "Photo_40",
                "Photo_41",
                "Photo_42",
                "Photo_43",
                "Photo_44",
                "Photo_45",
                "Photo_46",
                "Photo_47",
                "Photo_48",
                "Photo_49",
                "Photo_50",
                "Photo_52",
                "Photo_54",
                "Photo_57",
                "Photo_62",
                "Photo_63",
                "Photo_64",
                "Photo_65",
                "Photo_67",
                "Photo_68",
                "Photo_77"   ],

  'winter': [
                "Photo_03",
                "Photo_09",
                "Photo_17",
                "Photo_20",
                "Photo_24",
                "Photo_26",
                "Photo_33",
                "Photo_37",
                "Photo_55",
                "Photo_56",
                "Photo_60"  ],

  'spring': [
                "Photo_01",
                "Photo_04",
                "Photo_07",
                "Photo_08",
                "Photo_21",
                "Photo_30",
                "Photo_31",
                "Photo_35",
                "Photo_38",
                "Photo_51",
                "Photo_53",
                "Photo_58",
                "Photo_59",
                "Photo_61",
                "Photo_66",
                "Photo_69",
                "Photo_70",
                "Photo_71",
                "Photo_72",
                "Photo_73",
                "Photo_74",
                "Photo_75",
                "Photo_76"  ]
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
    var thumb_path = "images-" + root + "/" + folder + "/thumb.jpg";

    // div with thumb and text
    var new_element = document.createElement('div');
    new_element.setAttribute('class', "three columns");
    new_element.setAttribute('id', folder+'-thumb');

    var new_element_href = document.createElement('a');
    new_element_href.setAttribute('href', '#'+root+'#'+folder);

    var new_element_image = document.createElement('img');
    new_element_image.setAttribute('id', folder);
    new_element_image.setAttribute('class', "thumb");
    new_element_image.setAttribute('onclick', "select_thumb(\'"+folder+"\')");
    new_element_image.setAttribute('width', "100%");

    // set the source, and append the image to the href, and that href to the div
    new_element_image.src = thumb_path;
    new_element_href.appendChild(new_element_image);
    new_element.appendChild(new_element_href);

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
    var full_path = "images-" + root + "/" + folder + "/full.jpg";
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

      // the image that sits inside the div
      var new_image_inside_div = document.createElement('img');
      new_image_inside_div.setAttribute('class', "full-image");
      new_image_inside_div.setAttribute('width', "100%");

      // set the source, and append the image to the div
      new_image_inside_div.src = imageSrc;
      new_image_div.appendChild(new_image_inside_div);

      // append the div to the row
      append_last('#'+folder+'-full .row.image-row', new_image_div);

      /* TEXT ROW */

      var new_row = document.createElement('div');
      new_row.setAttribute('class', "row text-row");

      append_last('#'+folder+'-full', new_row);

      var new_text_div = document.createElement('div');
      new_text_div.setAttribute('class', folder+"-full text-container ten columns");
      new_text_div.innerHTML = '\
        <center><p id='+text_id+' class="'+folder+'-full full-text"></p></center>\
      ';

      var prev_div = document.createElement('div');
      var prevHref, prevStatus, prevImage
      if(index == 0) {
        prevHref = "";
        prevStatus = "inactive"
        prevImage = "";
      }
      else {
        prevHref = "#"+root+"#"+folders[index-1];
        prevStatus = "";
        prevImage = 'select_thumb(\''+folders[index-1]+'\')';
      }
      prev_div.setAttribute('class', "one columns");
      var prev_link = document.createElement('a');
      prev_link.setAttribute('class', "prev-button "+prevStatus);
      if (prevImage != "") {
        prev_link.setAttribute('onclick', prevImage);
      }
      if (prevHref != "") {
        prev_link.setAttribute('href', prevHref);
      }
      prev_link.innerHTML = "prev";

      prev_div.appendChild(prev_link);

      var next_div = document.createElement('div');
      var nextHref, nextStatus, nextImage
      if(index == folders.length-1) {
        nextHref = "";
        nextStatus = "inactive"
        nextImage = "";
      }
      else {
        nextHref = "#"+root+"#"+folders[index+1];
        nextStatus = "";
        nextImage = 'select_thumb(\''+folders[index+1]+'\')';
      }
      next_div.setAttribute('class', "one columns");
      var next_link = document.createElement('a');
      next_link.setAttribute('class', "next-button "+nextStatus);
      if (nextImage != "") {
        next_link.setAttribute('onclick', nextImage);
      }
      if (nextHref != "") {
        next_link.setAttribute('href', nextHref);
      }
      next_link.innerHTML = "next";

      next_div.appendChild(next_link);

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
