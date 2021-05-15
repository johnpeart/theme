var entriesRadios = document.getElementsByName("toggle-esc-entries");
var entries = document.getElementById("esc-entries");

for (i = 0; i < entriesRadios.length; i++) {
  entriesRadios[i].addEventListener("change", function() {
    let selected = this.value; // this == the clicked radio,
    entries.setAttribute("data-show", selected);
  });
}