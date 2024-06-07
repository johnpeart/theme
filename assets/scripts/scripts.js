// Header menu
const header = document.getElementById("site-navigation");
const menu = document.getElementById("header-menu--items");
const menuButton = document.getElementById("header-menu--toggle");

menuButton.addEventListener("click", function() {
	header.classList.toggle("open");
	header.classList.toggle("closed");
    menu.classList.toggle("hidden");
});
