// header.js

// function to handle menu on smaller screen
function toggleMobileMenu() {
    var mobileMenu = document.getElementById('mobileMenu');
    
    // Toggle the visibility of the mobile menu
    if (mobileMenu.style.display === 'flex') {
        mobileMenu.style.display = 'none';
    } else {
        mobileMenu.style.display = 'flex';
    }
}


document.addEventListener("DOMContentLoaded", function () {
    // Fetch header.html content
    fetch('/frontend/src/components/header/header.html')
      .then(response => response.text())
      .then(html => {
        // Inject the header content into the placeholder
        document.getElementById('header').innerHTML = html;
      })
      .catch(error => console.error('Error fetching header:', error));
  });
  