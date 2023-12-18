document.addEventListener("DOMContentLoaded", function () {
    // Fetch hero.html content
    fetch('/frontend/src/components/hero/hero.html')
      .then(response => response.text())
      .then(html => {
        // Inject the header content into the placeholder
        document.getElementById('hero').innerHTML = html;
  
        // Load Material Icons stylesheet dynamically
        const materialIconsLink = document.createElement('link');
        materialIconsLink.rel = 'stylesheet';
        materialIconsLink.href = 'https://fonts.googleapis.com/icon?family=Material+Icons';
        document.head.appendChild(materialIconsLink);
      })
      .catch(error => console.error('Error fetching hero:', error));
  });