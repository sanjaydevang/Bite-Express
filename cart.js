// document.addEventListener("DOMContentLoaded", function () {
//     const cart = JSON.parse(localStorage.getItem("cart")) || [];
//     const cartContainer = document.getElementById("cart-items");
//     const totalContainer = document.getElementById("cart-total");
//     const taxRate = 0.1; // 10% tax rate

//     if (cart.length === 0) {
//         cartContainer.innerHTML = "<p>Your cart is empty!</p>";
//         totalContainer.innerHTML = "";
//     } else {
//         // Display cart items
//         cartContainer.innerHTML = cart
//             .map(
//                 (item, index) =>
//                     `<div class="cart-item">
//                         <p><strong>${item.name}</strong> - $${item.price.toFixed(2)}</p>
//                         <p>Tracking Number: ${item.trackingNumber}</p>
//                         <button class="remove-item" data-index="${index}">Remove</button>
//                     </div>`
//             )
//             .join("");

//         // Calculate totals
//         const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
//         const tax = subtotal * taxRate;
//         const total = subtotal + tax;

//         // Display totals
//         totalContainer.innerHTML = `
//             <p>Subtotal: $${subtotal.toFixed(2)}</p>
//             <p>Tax (10%): $${tax.toFixed(2)}</p>
//             <p><strong>Total: $${total.toFixed(2)}</strong></p>
//         `;

//         // Attach event listeners to remove buttons
//         const removeButtons = document.querySelectorAll(".remove-item");
//         removeButtons.forEach((button) => {
//             button.addEventListener("click", function () {
//                 const index = parseInt(this.getAttribute("data-index"));
//                 removeItemFromCart(index);
//             });
//         });
//     }

//     /**
//      * Function to remove an item from the cart
//      * @param {number} index - Index of the item to remove
//      */
//     function removeItemFromCart(index) {
//         cart.splice(index, 1); // Remove the item
//         localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
//         location.reload(); // Refresh the cart page
//     }
// });



document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");
    const taxRate = 0.18; // 18% tax rate

    // Generate a single tracking number for the entire order
    let trackingNumber = localStorage.getItem("trackingNumber");
    if (!trackingNumber && cart.length > 0) {
        trackingNumber = `TRACK-${Math.floor(Math.random() * 1000000)}`;
        localStorage.setItem("trackingNumber", trackingNumber);
    }

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty!</p>";
        totalContainer.innerHTML = "";
        localStorage.removeItem("trackingNumber"); // Clear the tracking number if cart is empty
    } else {
        // Display cart items
        cartContainer.innerHTML = cart
            .map(
                (item, index) =>
                    `<div class="cart-item">
                        <p><strong>${item.name}</strong> - $${item.price.toFixed(2)}</p>
                        <button class="remove-item" data-index="${index}">Remove</button>
                    </div>`
            )
            .join("");

        // Calculate totals
        const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
        const tax = subtotal * taxRate;
        const total = subtotal + tax;

        // Display totals and tracking number
        totalContainer.innerHTML = `
            <p>Tracking Number: <strong>${trackingNumber}</strong></p>
            <p>Subtotal: $${subtotal.toFixed(2)}</p>
            <p>Tax (18%): $${tax.toFixed(2)}</p>
            <p><strong>Total: $${total.toFixed(2)}</strong></p>
            <label for="tips">Tips: </label>
            <select id="tips">
                <option value="0">No Tip</option>
                <option value="0.1">10%</option>
                <option value="0.15">15%</option>
                <option value="0.2">20%</option>
            </select>
            <p><strong id="final-total"></strong></p>
            <button id="pay-button">Pay</button>
        `;

        // Update total dynamically with tips
        const tipsDropdown = document.getElementById("tips");
        const finalTotalDisplay = document.getElementById("final-total");

        function updateFinalTotal() {
            const tipRate = parseFloat(tipsDropdown.value);
            const tips = subtotal * tipRate;
            const finalTotal = subtotal + tax + tips;
            finalTotalDisplay.textContent = `Final Total: $${finalTotal.toFixed(2)}`;
        }

        // Set initial final total and listen for changes in tips
        updateFinalTotal();
        tipsDropdown.addEventListener("change", updateFinalTotal);

        // Remove items from the cart
        const removeButtons = document.querySelectorAll(".remove-item");
        removeButtons.forEach((button) => {
            button.addEventListener("click", function () {
                const index = parseInt(this.getAttribute("data-index"));
                removeItemFromCart(index);
            });
        });

        // Handle pay button click
        const payButton = document.getElementById("pay-button");
        payButton.addEventListener("click", function () {
            const tipRate = parseFloat(tipsDropdown.value);
            const tips = subtotal * tipRate;
            const finalTotal = subtotal + tax + tips;

            alert(`Payment successful! You paid $${finalTotal.toFixed(2)}. Tracking Number: ${trackingNumber}`);
            localStorage.removeItem("cart"); // Clear the cart
            localStorage.removeItem("trackingNumber"); // Clear the tracking number
            location.reload(); // Refresh the page
        });
    }

    /**
     * Function to remove an item from the cart
     * @param {number} index - Index of the item to remove
     */
    function removeItemFromCart(index) {
        cart.splice(index, 1); // Remove the item
        localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
        location.reload(); // Refresh the cart page
    }
});
