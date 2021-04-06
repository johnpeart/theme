function togglePurchased() {
  var purchasedItems = document.getElementsByClassName("item-purchased");
  var n;
  for (n = 0; n < purchasedItems.length; n++) {
    purchasedItems[n].classList.toggle("hidden");
  }
}