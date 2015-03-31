// hover functions for home navigation
winterHover = function() {
  document.querySelector("#landscape-nav-image").setAttribute("src", "images/winter_nav.png");
}
fallHover = function() {
  document.querySelector("#landscape-nav-image").setAttribute("src", "images/fall_nav.png");
}
springHover = function() {
  document.querySelector("#landscape-nav-image").setAttribute("src", "images/spring_nav.png");
}
defaultHover = function() {
  document.querySelector("#landscape-nav-image").setAttribute("src", "images/default_nav.png");
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

// when a navigation link has been clicked
function nav_content_switcher(type) {

  // bold the only section header
  var menus = document.getElementsByClassName('menu-button');
  Array.prototype.forEach.call(menus, function(e) {
    e.style.fontWeight = "normal";
  });

  if (type == 'home') {
    // hide the unimportant sections
    set_selector_display(".thumbs.row", 'none');
    set_selector_display(".full-images", 'none');
    set_selector_display("#about-me-container", 'none');
    set_selector_display("#shows-container", 'none');
    set_selector_display("#purchase-container", 'none');

    // show the important sections
    set_selector_display("#landscape-nav", '');

    // bold the section header
    document.getElementById('home-button').style.fontWeight = "bold";

  }
  else if (type == 'about-me') {
    // hide the unimportant sections
    set_selector_display(".thumbs.row", 'none');
    set_selector_display(".full-images", 'none');
    set_selector_display("#landscape-nav", 'none');
    set_selector_display("#shows-container", 'none');
    set_selector_display("#purchase-container", 'none');

    // show the important sections
    set_selector_display("#about-me-container", '');

    // bold the section header
    document.getElementById('about-me-button').style.fontWeight = "bold";
  }
  else if (type == 'shows') {
    // hide the unimportant sections
    set_selector_display(".thumbs.row", 'none');
    set_selector_display(".full-images", 'none');
    set_selector_display("#landscape-nav", 'none');
    set_selector_display("#about-me-container", 'none');
    set_selector_display("#purchase-container", 'none');

    // show the important sections
    set_selector_display("#shows-container", '');

    // bold the section header
    document.getElementById('shows-button').style.fontWeight = "bold";
  }
  else if (type == 'purchase') {
    // hide the unimportant sections
    set_selector_display(".thumbs.row", 'none');
    set_selector_display(".full-images", 'none');
    set_selector_display("#landscape-nav", 'none');
    set_selector_display("#shows-container", 'none');
    set_selector_display("#about-me-container", 'none');

    // show the important sections
    set_selector_display("#purchase-container", '');

    // bold the section header
    document.getElementById('purchase-button').style.fontWeight = "bold";
  }
  else {
    // hide the unimportant sections
    set_selector_display("#about-me-container", 'none');
    set_selector_display("#shows-container", 'none');
    set_selector_display("#purchase-container", 'none');
    set_selector_display("#landscape-nav", 'none');
    set_selector_display(".thumbs.row", 'none');
    set_selector_display(".full-images", 'none');

    // show the important sections
    set_selector_display( ".thumbs.row."+type , '');

    // bold the section header
    document.getElementById('home-button').style.fontWeight = "bold";
  }
}

// function that takes a URL and navigates to a page
function URL_Navigator(locationHash) {

  // function to tell us if any one element from a list is in another
  // return the index of the secondList which matched the firstList
  function elementSearch(firstList, secondList) {
    var secondListIndex, i;

    for (i=0; i<firstList.length; i++) {
      secondListIndex = secondList.indexOf(firstList[i]);
      if (secondListIndex != -1) {
        break;
      }
    }
    return secondListIndex;
  }

  // look for element that points to 'fall', 'winter' or 'spring'
  var splitURL, folderURLIndex, folderURLTitle, imageURLTitle;
  splitURL = locationHash.split("#");
  if (splitURL.length == 1) {
    nav_content_switcher('home');
  }
  folderURLIndex = elementSearch(['home', 'about-me', 'shows', 'purchase',
                                  'fall', 'winter', 'spring'], splitURL);

  // if we found a folder in the url
  if (folderURLIndex != -1) {
    folderURLTitle = splitURL[folderURLIndex];
    nav_content_switcher(folderURLTitle);

    // check if that was the last element
    // (otherwise we need to point to a specific element)
    if (folderURLIndex != splitURL.length-1) {
      imageURLTitle = splitURL[folderURLIndex+1];
      document.querySelector("img#"+imageURLTitle).click();

      // update the next and prev keybindings
      var imageDiv = document.getElementById(imageURLTitle+"-full");
      var prevLink = imageDiv.getElementsByClassName("prev-button")[0];
      var nextLink = imageDiv.getElementsByClassName("next-button")[0];

      document.onkeyup = function(event) {
        if (event.keyCode == 37) {
          prevLink.click();
        }
        else if (event.keyCode == 39) {
          nextLink.click();
        }
      };
    }
  }

}

window.onhashchange = function(args) {
  URL_Navigator(location.hash);
}

// load any of the text pages
function text_loader(file, divId) {
  var file_loader = new XMLHttpRequest();
  file_loader.open("GET", file, true);
  file_loader.send();

  // load and prepare text
  file_loader.onreadystatechange = function() {
    if (this.readyState== 4 && this.status == 200){
      ele = document.querySelector(divId);
      ele.innerHTML = this.responseText;
    }
  }
}

// when the document has been loaded
document.addEventListener('DOMContentLoaded', function(){
  text_loader("text-content/about-me.txt", "div#p-about-me");
  text_loader("text-content/shows.txt", "div#p-shows");
  text_loader("text-content/purchase.txt", "div#p-purchase");

  nav_content_switcher('home');
  URL_Navigator(location.hash);
});
