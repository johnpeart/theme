var menuToggle = document.getElementById("header-menu-toggle");
var menuItems = document.getElementById("header-menu-items");

menuToggle.addEventListener("click", function() {
  
  this.classList.toggle("open");
  this.classList.toggle("closed");
  
  if (this.classList.contains("open")) {
    this.setAttribute("aria-expanded", "true");
  } else {
    this.setAttribute("aria-expanded", "false");
  }
  
  menuItems.classList.toggle("open");
  menuItems.classList.toggle("closed");
  
});

// function toggleMenu() {
//   var menu = document.getElementById("header-menu-toggle");
//   menu.classList.toggle("open");
//   menu.classList.toggle("closed");
//   
//   var menu = document.getElementById("header-menu-items");
//   menu.classList.toggle("open");
//   menu.classList.toggle("closed");
// }