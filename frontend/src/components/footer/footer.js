document.addEventListener("DOMContentLoaded", function () {
    // Fetch footer.html content
    fetch('/frontend/src/components/footer/footer.html')
      .then(response => response.text())
      .then(html => {
        // Inject the footer content into the placeholder
        document.getElementById('footer').innerHTML = html;
      })
      .catch(error => console.error('Error fetching footer:', error));
  });