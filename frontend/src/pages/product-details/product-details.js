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

// Define renderProductImages and changeActiveImage outside the DOMContentLoaded callback
function renderProductImages(product) {
    const image1 = document.getElementById('productDetailsImage1');
    const image2 = document.getElementById('productDetailsImage2');
    const image3 = document.getElementById('productDetailsImage3');
    const image4 = document.getElementById('productDetailsImage4');
    const activeImage = document.getElementById('activeProductDetailsImage');

    // Set default active image
    activeImage.innerHTML = `<img src="${product.product_details_img_url_1}" alt="Active Product Image">`;

    // Set images for placeholders
    image1.innerHTML = `<img src="${product.product_details_img_url_1}" alt="Product Image 1" onclick="changeActiveImage('${product.product_details_img_url_1}', this)" style="border: 1px solid #ff8c00;">`;
    image2.innerHTML = `<img src="${product.product_details_img_url_2}" alt="Product Image 2" onclick="changeActiveImage('${product.product_details_img_url_2}', this)" style="border: 1px solid transparent;">`;
    image3.innerHTML = `<img src="${product.product_details_img_url_3}" alt="Product Image 3" onclick="changeActiveImage('${product.product_details_img_url_3}', this)" style="border: 1px solid transparent;">`;
    image4.innerHTML = `<img src="${product.product_details_img_url_4}" alt="Product Image 4" onclick="changeActiveImage('${product.product_details_img_url_4}', this)" style="border: 1px solid transparent;">`;
}

function changeActiveImage(imageUrl, clickedImage) {
    const activeImage = document.getElementById('activeProductDetailsImage');

    // Set the clicked image as the active one
    activeImage.innerHTML = `<img src="${imageUrl}" alt="Active Product Image">`;

    // Reset border styles for all images
    const allImages = document.querySelectorAll('.product-details-page-images img');
    allImages.forEach(img => img.style.border = '1px solid transparent');

    // Set border style for the clicked image
    clickedImage.style.border = '1px solid #ff8c00'; // Adjust border style as needed
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const vendorId = urlParams.get('vendor_id');

        if (!productId || !vendorId) {
            console.error('Product ID or Vendor ID not provided in the URL');
            return;
        }

        // Fetch product details by ID from the database
        const response = await fetch(`http://localhost:5600/api/product/${productId}`);
        const product = await response.json();

        // Update the DOM elements with the fetched product details
        document.getElementById('productName').textContent = product.product_name;

        // Render product rating
        const ratingElement = document.getElementById('productRating');
        ratingElement.innerHTML = '';

        ratingElement.textContent = product.rating;
        const rating = product.rating;
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
            emptyStarIcon.classList.add('far', 'fa-star');
            ratingElement.appendChild(emptyStarIcon);
        }

        document.getElementById('productDescription').textContent = product.product_description;
        document.getElementById('pricePerMeasure').textContent = `Price: #${product.price} per ${product.measure}`;

        // Render product images
        renderProductImages(product);

        // Get the value element
        const valueElement = document.getElementById('value');

        // Get the plus and minus elements
        const valuePlus = document.getElementById('valuePlus');
        const valueMinus = document.getElementById('valueMinus');

        // Set the initial value
        let value = 1;
        valueElement.textContent = value;

        // Add event listener for the plus button
        valuePlus.addEventListener('click', function () {
            // Increment the value
            value++;
            // Update the displayed value
            valueElement.textContent = value;
        });

        // Add event listener for the minus button
        valueMinus.addEventListener('click', function () {
            // Ensure the value is never less than 1
            value = Math.max(1, value - 1);
            // Update the displayed value
            valueElement.textContent = value;
        });

        // Render same vendor products
        await renderSameVendorProducts(vendorId);

        // Update other elements as needed
    } catch (error) {
        console.error(`Error fetching product details:`, error);
    }
});

async function fetchSameVendorProducts(vendorId) {
    try {
        const response = await fetch(`http://localhost:5600/api/products-by-vendor/${vendorId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching same vendor products:', error);
        return [];
    }
}

async function renderSameVendorProducts(vendorId) {
    const sameVendorProductsPlaceholder = document.getElementById('sameVendorCarousel');

    // Fetch top-selling products
    const sameVendorProducts = await fetchSameVendorProducts(vendorId);

    // Load product card template
    const productCardTemplate = await loadProductCard();

    // Clear existing content in the placeholder
    sameVendorCarousel.innerHTML = '';

    // Render products in the placeholder
    sameVendorProducts.forEach(product => {
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
            emptyStarIcon.classList.add('far', 'fa-star'); // Using 'far' for an empty star
            ratingElement.appendChild(emptyStarIcon);
        }

        // Set vendor location
        productCard.querySelector('.vendor-location').textContent = `Location: ${product.vendor_location}`;

        // Add a click event listener to the product card
        productCard.addEventListener('click', () => {
            // Redirect to the product details page with the product ID and vendor ID
            window.location.href = `/frontend/src/pages/product-details/product-details.html?id=${product.product_id}&vendor_id=${product.vendor_id}`;
            console.log(`Product card for ${product.product_name} clicked!`);
        });

        // Append the product card to the placeholder
        sameVendorProductsPlaceholder.appendChild(productCard);
    });

    // Get the total number of slides in the carousel
    const totalSlides = sameVendorProducts.length;

    // Initialize Slick Carousel
    $(sameVendorProductsPlaceholder).slick({
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
    $(sameVendorProductsPlaceholder).on('setPosition', function (event, slick) {
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
