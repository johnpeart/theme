var toggleItems = document.getElementsByName("toggle-purchased");
var purchasedItems = document.getElementsByClassName("item-purchased");

for (i = 0; i < toggleItems.length; i++) {
  toggleItems[i].addEventListener("change", function () {
    var n;
    for (n = 0; n < purchasedItems.length; n++) {
      purchasedItems[n].classList.toggle("hidden");
    }
  });
}