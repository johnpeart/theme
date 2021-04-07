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