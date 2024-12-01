// Function to generate a unique tracking number
function generateTrackingNumber() {
    const trackingNumber = 'TRACK-' + Math.floor(Math.random() * 1000000); // Example: TRACK-123456
    console.log(`Generated Tracking Number: ${trackingNumber}`); // Debugging log
    return trackingNumber;
}

document.addEventListener("DOMContentLoaded", function () {
    // Update greeting based on time of day
    const greetingElement = document.getElementById("dynamic-greeting");
    if (greetingElement) {
        const currentHour = new Date().getHours();
        let greeting;

        if (currentHour < 12) {
            greeting = "Good Morning! Welcome to Bite Express";
        } else if (currentHour < 18) {
            greeting = "Good Afternoon! Welcome to Bite Express";
        } else {
            greeting = "Good Evening! Welcome to Bite Express";
        }

        greetingElement.textContent = greeting;
    }

    // Order tracking functionality
    const trackOrderButton = document.getElementById("track-order-btn");
    if (trackOrderButton) {
        trackOrderButton.addEventListener("click", function () {
            const orderId = document.getElementById("order-id").value;
            const statusDiv = document.getElementById("order-status");

            if (orderId) {
                // Check localStorage for tracking data
                const cart = JSON.parse(localStorage.getItem("cart")) || [];
                const order = cart.find((item) => item.trackingNumber === orderId);

                if (order) {
                    statusDiv.innerHTML = `<p>Your order #${orderId} is <strong>${order.status}</strong>.</p>`;
                } else {
                    statusDiv.innerHTML = `<p>Order ID not found.</p>`;
                }
            } else {
                statusDiv.innerHTML = `<p>Please enter a valid Order ID.</p>`;
            }
        });
    }

    // Add to Cart functionality
    const buttons = document.querySelectorAll(".add-to-cart");
    const cartCounter = document.getElementById("cart-counter");

    // Load existing cart or initialize it
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cartCounter) {
        cartCounter.textContent = cart.length;
    }

    // Add event listeners to buttons
    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            const itemName = this.getAttribute("data-item");
            const itemPrice = parseFloat(this.getAttribute("data-price"));
            const trackingNumber = generateTrackingNumber(); // Generate tracking number

            console.log(`Adding item: ${itemName}, Price: ${itemPrice}, Tracking Number: ${trackingNumber}`); // Debugging log

            // Add item to cart with tracking number
            const order = {
                name: itemName,
                price: itemPrice,
                trackingNumber: trackingNumber,
                status: 'In Progress',
            };

            cart.push(order);
            localStorage.setItem("cart", JSON.stringify(cart));

            // Update cart counter
            if (cartCounter) {
                cartCounter.textContent = cart.length;
            }

            alert(`${itemName} added to your cart with Tracking Number: ${trackingNumber}`);
        });
    });
});
