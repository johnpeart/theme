// Header menu
const header = document.getElementById("site-navigation");
const menuButton = document.getElementById("header-menu--toggle");

menuButton.addEventListener("click", function() {
	header.classList.toggle("open");
	header.classList.toggle("closed");
});
