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
    image1.innerHTML = `<img src="${product.product_details_img_url_1}" alt="Product Image 1" onclick="changeActiveImage('${product.product_details_img_url_1}')">`;
    image2.innerHTML = `<img src="${product.product_details_img_url_2}" alt="Product Image 2" onclick="changeActiveImage('${product.product_details_img_url_2}')">`;
    image3.innerHTML = `<img src="${product.product_details_img_url_3}" alt="Product Image 3" onclick="changeActiveImage('${product.product_details_img_url_3}')">`;
    image4.innerHTML = `<img src="${product.product_details_img_url_4}" alt="Product Image 4" onclick="changeActiveImage('${product.product_details_img_url_4}')">`;
}

function changeActiveImage(imageUrl) {
    const activeImage = document.getElementById('activeProductDetailsImage');
    activeImage.innerHTML = `<img src="${imageUrl}" alt="Active Product Image">`;
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');

        if (!productId) {
            console.error('Product ID not provided in the URL');
            return;
        }

        const response = await fetch(`http://localhost:5600/api/product/${productId}`);
        const product = await response.json();

        // Update the DOM elements with the fetched product details
        document.getElementById('productName').textContent = product.product_name;

        // Render product rating
        const ratingElement = document.getElementById('productRating');
        ratingElement.innerHTML = '';

        ratingElement.textContent = `Rating: ${product.rating}`;
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

        document.getElementById('productDescription').textContent = product.description;
        document.getElementById('pricePerMeasure').textContent = `Price: ${product.price} per ${product.measure}`;

        // Render product images
        renderProductImages(product);

        // Update other elements as needed
    } catch (error) {
        console.error(`Error fetching product details:`, error);
    }
});
