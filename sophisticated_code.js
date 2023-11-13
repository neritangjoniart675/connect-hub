/*
    Filename: sophisticated_code.js
    
    Description: This code demonstrates a complex and interactive online shopping website implemented using JavaScript.
*/

// Global variables
let cart = [];
let products = [
    { id: 1, name: "iPhone 12", price: 999 },
    { id: 2, name: "Samsung Galaxy S21", price: 899 },
    { id: 3, name: "Google Pixel 5", price: 799 },
    // ... more products ...
];

// Function to display products on the console
function displayProducts() {
    console.log("Available products:");
    for (let product of products) {
        console.log(`${product.id}. ${product.name} - $${product.price}`);
    }
}

// Function to add a product to the cart
function addToCart(productId) {
    let product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        console.log(`${product.name} added to cart.`);
    } else {
        console.log("Product not found.");
    }
}

// Function to calculate the total price of items in the cart
function calculateTotalPrice() {
    let total = 0;
    for (let product of cart) {
        total += product.price;
    }
    return total;
}

// Function to remove an item from the cart
function removeFromCart(productId) {
    let index = cart.findIndex(p => p.id === productId);
    if (index !== -1) {
        let removedProduct = cart.splice(index, 1)[0];
        console.log(`${removedProduct.name} removed from cart.`);
    } else {
        console.log("Product not found in cart.");
    }
}

// Function to place an order
function placeOrder() {
    let totalPrice = calculateTotalPrice();
    console.log("Order placed successfully!");
    console.log(`Total price: $${totalPrice}`);
    cart = [];
}

// Main program logic
displayProducts();
console.log();

addToCart(1); // Add iPhone 12 to cart
addToCart(2); // Add Samsung Galaxy S21 to cart
console.log();

console.log("Current cart contents:");
for (let product of cart) {
    console.log(`${product.name} - $${product.price}`);
}
console.log();

removeFromCart(1); // Remove iPhone 12 from cart
console.log();

displayProducts();
console.log();

addToCart(3); // Add Google Pixel 5 to cart
console.log();

console.log("Current cart contents:");
for (let product of cart) {
    console.log(`${product.name} - $${product.price}`);
}
console.log();

placeOrder(); // Place the order
console.log();

console.log("Updated cart contents:");
for (let product of cart) {
    console.log(`${product.name} - $${product.price}`);
}
console.log();