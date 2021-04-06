function toggleMenu() {
  var menu = document.getElementById("header-menu-toggle");
  menu.classList.toggle("open");
  menu.classList.toggle("closed");
  
  var menu = document.getElementById("header-menu-items");
  menu.classList.toggle("open");
  menu.classList.toggle("closed");
  if (menu.classList.contains("open")) {
    menu.setAttribute('aria-expanded', 'true')
  } else {
    menu.setAttribute('aria-expanded', 'false')
  }
}