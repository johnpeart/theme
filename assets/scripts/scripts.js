var details = [...document.querySelectorAll('details')];

// Collapses the <details> items when you click another <details> item on the page.
details.forEach((detail) => {
  detail.addEventListener('click', (e) => {
    const active = details.find(d => d.open)
      if (!e.currentTarget.open && active) {
      active.open = false
    }
  })
})
