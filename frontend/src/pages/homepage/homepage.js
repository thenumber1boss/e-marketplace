// homepage.js

// Function to load the content of product-card.html into the placeholder
async function loadProductCard() {
    try {
        const response = await fetch('/frontend/src/components/product-card/product-card.html');
        const content = await response.text();
        return content;
    } catch (error) {
        console.error('Error loading product card:', error);
        return '';
    }
}

async function fetchTopSellingProducts() {
    try {
        const response = await fetch('http://localhost:5500/api/top-selling-products'); // API endpoint for top selling products communication
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching top-selling products:', error);
        return [];
    }
}


async function renderTopSellingProducts() {
    const topSellingProductsPlaceholder = document.getElementById('topSellingProductsPlaceholder');

    // Fetch top-selling products
    const topSellingProducts = await fetchTopSellingProducts();

    // Load product card template
    const productCardTemplate = await loadProductCard();

    // Clear existing content in the placeholder
    topSellingProductsPlaceholder.innerHTML = '';

    // Render products in the placeholder
    topSellingProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = productCardTemplate;

        // Set product details
        productCard.querySelector('.product-image').src = product.image_url;
        productCard.querySelector('.product-name').textContent = product.product_name;
        
        // Convert numerical rating to Font Awesome stars
        const ratingElement = productCard.querySelector('.product-rating');

        ratingElement.innerHTML = '';
        
        ratingElement.textContent = `Rating: ${product.rating}`;
        const rating = product.rating; // Use the actual rating without rounding
        const fullStars = Math.floor(rating);
        const remainder = rating % 1;
        const halfStar = remainder >= 0.01 && remainder <= 0.9;

       

        // Render full stars
        for (let i = 0; i < fullStars; i++) {
            const starIcon = document.createElement('i');
            starIcon.classList.add('fas', 'fa-star');
            ratingElement.appendChild(starIcon);
        }

        // Render half star if applicable
        if (halfStar) {
            const halfStarIcon = document.createElement('i');
            halfStarIcon.classList.add('fas', 'fa-star-half-alt');
            ratingElement.appendChild(halfStarIcon);
        }

        // Calculate the number of empty stars needed
        const emptyStars = 5 - Math.ceil(rating);

        // Render empty stars
        for (let i = 0; i < emptyStars; i++) {
            const emptyStarIcon = document.createElement('i');
            emptyStarIcon.classList.add('far', 'fa-star'); // Using 'far' for empty star
            ratingElement.appendChild(emptyStarIcon);
        }

        // Set vendor location
        productCard.querySelector('.vendor-location').textContent = `Location: ${product.vendor_location}`;

        // Add click event listener to the product card
        productCard.addEventListener('click', () => {
            // Perform action when the card is clicked
            console.log(`Product card for ${product.product_name} clicked!`);
        })

        // Append product card to the placeholder
        topSellingProductsPlaceholder.appendChild(productCard);
    });

    // Get the total number of slides in the carousel
    const totalSlides = topSellingProducts.length;

    // Initialize Slick Carousel
$(topSellingProductsPlaceholder).slick({
    slidesToShow: 4.5, // Display 4.5 items at a time
    slidesToScroll: 3, // Scroll 3 items at a time
    infinite: false,
    arrows: true,
    prevArrow: '<i class="fas fa-chevron-circle-left custom-prev-button"></i>',
        nextArrow: '<i class="fas fa-chevron-circle-right custom-next-button"></i>',
    responsive: [
        {
            breakpoint: 992, // Responsive settings for smaller screens
            settings: {
                slidesToShow: 2.5, 
                slidesToScroll: 2,
                arrows: false,
            }
        },

        {
            breakpoint: 576, // Responsive settings for smaller screens
            settings: {
                slidesToShow: 1.5, 
                slidesToScroll: 1,
                arrows: false,
            }
        }
    ]
});

// Event listener for Slick's setPosition event
$(topSellingProductsPlaceholder).on('setPosition', function (event, slick) {
    // Get the current slide index
    const currentSlide = slick.slickCurrentSlide();

    // Show or hide the custom prev button based on the current slide
    if (currentSlide === 0) {
        $('.custom-prev-button').hide();
    } else {
        $('.custom-prev-button').show();
    }

    // Show or hide the custom next button based on the current slide and total slides
    if (currentSlide + 4 >= slick.slideCount) {
        $('.custom-next-button').hide();
    } else {
        $('.custom-next-button').show();
    }
});

}

// Call the rendering function when the page loads
document.addEventListener('DOMContentLoaded', renderTopSellingProducts);


// Function to fetch top-selling products from the database
//async function fetchTopSellingProducts() {
//    try {
//        // Replace this with your API endpoint for fetching top-selling products
//        const response = await fetch('/api/top-selling-products');
//        const data = await response.json();
//        return data;
//    } catch (error) {
//        console.error('Error fetching top-selling products:', error);
//        return [];
//    }
//}

// Function to create a product card based on the fetched data
//function createProductCard(product, productCardTemplate) {
//    const card = document.createElement('div');
//    card.classList.add('product-card');

//    card.innerHTML = productCardTemplate; // Use the product-card.html content

//    card.querySelector('.product-image').src = product.image_url;
//    card.querySelector('.product-name').innerText = product.product_name;
//    card.querySelector('.product-rating').innerText = `Rating: ${product.rating}`;
//    card.querySelector('.vendor-location').innerText = `Location: ${product.vendor.location}`;

//    return card;
//}

// Function to render top-selling products in the carousel
//async function renderTopSellingProducts() {
//    const topSellingProducts = await fetchTopSellingProducts();
//    const carousel = document.getElementById('topSellingProductsPlaceholder');
//    const carouselInner = document.createElement('div');
//    carouselInner.classList.add('carousel-inner');
//    carousel.appendChild(carouselInner);

    // Load the product-card.html content
//    const productCardTemplate = await loadProductCard();

    // Iterate through top-selling products and insert into the carousel
//    topSellingProducts.forEach((product) => {
//        const card = createProductCard(product, productCardTemplate);
//        carouselInner.appendChild(card);
//    });

    // Optional: Add navigation buttons for the carousel
//    const prevButton = document.createElement('div');
//    prevButton.classList.add('carousel-prev');
//    prevButton.innerHTML = '&lt;';
//    prevButton.addEventListener('click', () => slideCarousel(-1));

//    const nextButton = document.createElement('div');
//    nextButton.classList.add('carousel-next');
//    nextButton.innerHTML = '&gt;';
//    nextButton.addEventListener('click', () => slideCarousel(1));

//    carousel.appendChild(prevButton);
//    carousel.appendChild(nextButton);

//    let currentIndex = 0;

//    function slideCarousel(direction) {
//        const cardWidth = carouselInner.clientWidth;
//        currentIndex = Math.max(0, Math.min(currentIndex + direction, carouselInner.children.length - 1));
//        const translateX = -currentIndex * cardWidth;
//        carouselInner.style.transform = `translateX(${translateX}px)`;
//    }
//}

// document.addEventListener('DOMContentLoaded', function () {
//    renderTopSellingProducts();
// });
