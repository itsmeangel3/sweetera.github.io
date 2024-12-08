const products = [
  { name: "Dark Chocolate", category: "Chocolate", price: "₱184.00", img: "images/dark.jpg" },
  { name: "Dubai Bar", category: "Chocolate", price: "₱350.00", img: "images/dubai.jpg" },
  { name: "Ferrero", category: "Chocolate", price: "₱200.00", img: "images/ferrero.jpg" },
  { name: "Ruby Chocolate", category: "Chocolate", price: "₱320.00", img: "images/ruby.jpg" },
  { name: "Toblerone", category: "Chocolate", price: "₱100.00", img: "images/toblerone.jpg" },
  { name: "White Chocolate", category: "Chocolate", price: "₱120.00", img: "images/white.jpg" },
  { name: "Kitkat", category: "Chocolate", price: "₱90.00", img: "images/kitkat.jpg" },
  { name: "Twix", category: "Chocolate", price: "₱50.00", img: "images/twix.jpg" },
  { name: "Dairy Milk", category: "Chocolate", price: "₱150.00", img: "images/dairy.jpg" },
  { name: "Reese", category: "Chocolate", price: "₱80.00", img: "images/reese.jpg" },
  { name: "Mars", category: "Chocolate", price: "₱75.00", img: "images/mars.jpg" },
  { name: "M&M's", category: "Chocolate", price: "₱90.00", img: "images/m&m.jpg" },
  { name: "Snikers", category: "Chocolate", price: "₱99.00", img: "images/snickers.jpg" },
  { name: "Goya", category: "Chocolate", price: "₱55.00", img: "images/goya.jpg" },
  { name: "Hazelnut Chocolate Bar ", category: "Chocolate", price: "₱200.00", img: "images/hazel.jpg" },
  { name: "Bournville Bar", category: "Chocolate", price: "₱110.00", img: "images/bournville.jpg" },
];

const carouselTrack = document.querySelector('.carousel-track');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const cartSidebar = document.querySelector('#cart-sidebar');
const cartItemsContainer = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const proceedToCheckoutBtn = document.querySelector('#proceed-to-checkout');
const cartIcon = document.querySelector('.cart-icon');

let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
let currentIndex = 0;

// Function to update cart sidebar
function updateCartSidebar() {
  cartItemsContainer.innerHTML = ''; // Clear current items
  let total = 0;
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cart.forEach((item, index) => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      cartItem.innerHTML = `
        <span>${item.name}</span>
        <div class="quantity-container">
          <button class="decrease-btn" data-index="${index}">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="increase-btn" data-index="${index}">+</button>
        </div>
        <span>₱${(parseFloat(item.price.slice(1)) * item.quantity).toFixed(2)}</span> <!-- Change $ to ₱ -->
        <button data-index="${index}" class="remove-btn">Remove</button>
      `;
      cartItemsContainer.appendChild(cartItem);
      total += parseFloat(item.price.slice(1)) * item.quantity; // Calculate total
    });
  }
  cartTotal.textContent = `₱${total.toFixed(2)}`;  // Show total in ₱
  localStorage.setItem('cartItems', JSON.stringify(cart)); // Save updated cart to localStorage
  localStorage.setItem('totalPrice', total.toFixed(2));
}

// Add event listeners to dynamically generated Add to Cart buttons
function addCartListeners() {
  document.querySelectorAll('.add-to-cart').forEach((button, index) => {
    button.addEventListener('click', () => {
      const selectedProduct = products[index];
      // Check if product already exists in cart
      const existingProduct = cart.find(item => item.name === selectedProduct.name);
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push({ ...selectedProduct, quantity: 1 });
      }
      alert(`${selectedProduct.name} has been added to your cart!`);
      updateCartSidebar();
      cartSidebar.classList.remove('hidden'); // Show the cart sidebar
    });
  });
}

// Handle the quantity increase or decrease
cartItemsContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('decrease-btn')) {
    const index = e.target.getAttribute('data-index');
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
      updateCartSidebar();
    }
  } else if (e.target.classList.contains('increase-btn')) {
    const index = e.target.getAttribute('data-index');
    cart[index].quantity++;
    updateCartSidebar();
  } else if (e.target.classList.contains('remove-btn')) {
    const index = e.target.getAttribute('data-index');
    cart.splice(index, 1); // Remove item
    updateCartSidebar();
  }
});

// Generate product cards dynamically
products.forEach((product, index) => {
  const card = document.createElement('div');
  card.classList.add('product-card');
  card.innerHTML = `
    <img src="${product.img}" alt="${product.name}">
    <h3>${product.name}</h3>
    <p class="price">${product.price}</p> <!-- Change $ to ₱ -->
    <button class="add-to-cart" data-index="${index}">Add to Cart</button>
  `;
  carouselTrack.appendChild(card);
});

// Proceed to checkout
proceedToCheckoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    localStorage.setItem('checkoutItems', JSON.stringify(cart));
    window.location.href = 'checkout.html'; // Redirect to checkout page
  }
});

// Toggle sidebar visibility using the hidden class
cartIcon.addEventListener('click', () => {
  cartSidebar.classList.toggle('hidden'); // Toggle the 'hidden' class
  updateCartSidebar(); // Update the cart items when toggled
});

// Slide functionality for the carousel
function updateCarousel() {
  const itemWidth = 270; // Width of one product card
  carouselTrack.style.transition = 'transform 0.3s ease-in-out'; // Add smooth transition
  carouselTrack.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < products.length - 4) currentIndex++;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) currentIndex--;
  updateCarousel();
});

// Initialize
updateCartSidebar();
addCartListeners();
updateCarousel();

// Smooth scroll to the products section when "Shop Now" is clicked
document.addEventListener("DOMContentLoaded", () => {
  const shopNowButton = document.getElementById("shop-now-btn");
  const productSection = document.getElementById("products");
  shopNowButton.addEventListener("click", () => {
    productSection.scrollIntoView({ behavior: "smooth" });
  });
});
