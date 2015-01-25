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

// when the document has been loaded
document.addEventListener('DOMContentLoaded', function(){
  nav_content_switcher('home');
  imageMapResize("#landscape-nav-map");
});
