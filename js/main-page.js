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
  if (type == 'home') {
    set_selector_display(".thumbs.row", 'none');
    set_selector_display(".full-images", 'none');
    set_selector_display("#about-me", 'none');

    set_selector_display("#landscape-nav", '');
    imageMapResize("#landscape-nav-map");
  }
  else if (type == 'about-me') {
    set_selector_display(".thumbs.row", 'none');
    set_selector_display(".full-images", 'none');
    set_selector_display("#landscape-nav", 'none');

    set_selector_display("#about-me", '');
  }
  else if (type == 'shows') {
    set_selector_display(".thumbs.row", 'none');
    set_selector_display(".full-images", 'none');
    set_selector_display("#landscape-nav", 'none');

    set_selector_display("#about-me", '');
  }
  else if (type == 'purchasing') {
    set_selector_display(".thumbs.row", 'none');
    set_selector_display(".full-images", 'none');
    set_selector_display("#landscape-nav", 'none');

    set_selector_display("#about-me", '');
  }
  else {
    set_selector_display("#about-me", 'none');
    set_selector_display("#landscape-nav", 'none');
    set_selector_display(".thumbs.row", 'none');
    set_selector_display(".full-images", 'none');

    set_selector_display( ".thumbs.row."+type , '');
  }
}

// function that takes a URL and navigates to a page
function URL_Navigator(urlString) {

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
  splitURL = urlString.split("#");
  if (splitURL.length == 1) {
    nav_content_switcher('home');
  }
  folderURLIndex = elementSearch(['home', 'about-me', 'shows', 'purchasing',
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
    }
  }

}

window.onhashchange = function(args) {
  URL_Navigator(args.newURL);
}

// load the about_me text
function load_about_me() {
  var about_me_loader = new XMLHttpRequest();
  about_me_loader.open("GET", "text-content/about-me.txt",true);
  about_me_loader.send();

  // load and prepare full text for multiple images
  about_me_loader.onreadystatechange = function() {
    if (this.readyState== 4 && this.status == 200){
      ele = document.querySelector("div#p-about-me");
      ele.innerHTML = this.responseText;
    }
  }
}

// when the document has been loaded
document.addEventListener('DOMContentLoaded', function(){
  load_about_me();
  nav_content_switcher('home');
  imageMapResize("#landscape-nav-map");
  URL_Navigator(document.URL);
});
