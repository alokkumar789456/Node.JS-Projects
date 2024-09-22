document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.querySelector('.products-container');
    const isLoggedIn = true; // Replace with actual login check

    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            data.forEach(product => {
                const productCard = document.createElement('div');
                productCard.classList.add('bg-white', 'shadow-md', 'rounded-lg', 'p-4', 'm-4', 'w-full', 'md:w-1/4', 'transition', 'transform', 'hover:scale-105');

                productCard.innerHTML = `
                   <img class="w-48 h-48 object-cover rounded-t-lg" src="${product.image}" alt="${product.title}" />
                    <div class="mt-4">
                        <h3 class="text-lg font-semibold">${product.title}</h3>
                        <p class="text-gray-700"><strong>Price:</strong> $${product.price}</p>
                        <p class="description text-gray-600 line-clamp-3">${product.description}</p>
                        <button class="view-more text-blue-500 hover:underline">View More</button>
                        <p class="full-description hidden text-gray-600">${product.description}</p>
                        <p class="text-gray-500"><strong>Category:</strong> ${product.category}</p>
                        <p class="text-gray-400"><strong>Rating:</strong> ${product.rating.rate} (from ${product.rating.count} reviews)</p>
                        ${isLoggedIn ? `
                            <button class="buy-button bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600" data-id="${product.id}">Buy Now</button>
                            <form action="/cart/add-to-cart" method="POST" class="mt-2">
                                <input type="hidden" name="productId" value="${product.id}" />
                                <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add to My Cart</button>
                            </form>
                        ` : ''}
                    </div>
                `;

                productsContainer.appendChild(productCard);

                // Add event listener for "View More" button
                const viewMoreButton = productCard.querySelector('.view-more');
                const fullDescription = productCard.querySelector('.full-description');
                viewMoreButton.addEventListener('click', () => {
                    fullDescription.classList.toggle('hidden');
                    viewMoreButton.textContent = fullDescription.classList.contains('hidden') ? 'View More' : 'View Less';
                });
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

const emailLink = document.getElementById('emailLink');
const profileSection = document.getElementById('profileSection');

// Toggle the visibility of the profile section when the email is clicked
emailLink.addEventListener('click', function(event) {
    event.preventDefault();
    profileSection.style.display = profileSection.style.display === 'none' ? 'block' : 'none';
});