document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products-container');

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('product-card');
                productCard.innerHTML = `
                    <img src="${product.image}" alt="${product.title}" />
                    <h3>${product.title}</h3>
                    <p><strong>Price:</strong> $${product.price}</p>
                    <p><strong>Description:</strong> ${product.description}</p>
                    <p><strong>Category:</strong> ${product.category}</p>
                    <p><strong>Rating:</strong> ${product.rating.rate} (from ${product.rating.count} reviews)</p>
                    <button class="buy-button" data-id="${product.id}">Buy Now</button>
                `;
                productsContainer.appendChild(productCard);
            });

            // Add click event for the buy buttons
            const buyButtons = document.querySelectorAll('.buy-button');
            buyButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const productId = e.target.getAttribute('data-id');
                    window.location.href = `/cart/${productId}`; // Redirect to the cart page
                });
            });
        })
        .catch(error => console.error('Error fetching products:', error));
});
