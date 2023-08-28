var details = [...document.querySelectorAll('.details-menu')];
document.addEventListener('click', function(e){
  if(details.some(f => f.contains(e.target)).length != 0){
    details.forEach(f => f.removeAttribute('open'));
  }
})