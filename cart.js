
function updateTotal() {
    const items = document.querySelectorAll('.cart-item');
    let total = 0;

    items.forEach(item => {
        const price = parseFloat(item.getAttribute('data-price'));
        const quantity = parseInt(item.getAttribute('data-quantity')) || 1;
        total += price * quantity;
    });

    document.getElementById('total-price').textContent = total.toFixed(2);
}

document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const item = e.target.closest('.cart-item');
        item.remove();
        updateTotal();
    });
});


document.querySelectorAll('.increase-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const item = e.target.closest('.cart-item');
        const quantitySpan = item.querySelector('.quantity');
        let quantity = parseInt(quantitySpan.textContent) || 1;
        quantity += 1;
        quantitySpan.textContent = quantity;
        item.setAttribute('data-quantity', quantity);
        updateTotal();
    });
});

document.getElementById('add-item-btn').addEventListener('click', () => {
    const itemName = document.getElementById('new-item-name').value;
    const itemPrice = parseFloat(document.getElementById('new-item-price').value);

    if (!itemName || isNaN(itemPrice) || itemPrice <= 0) {
        alert("Please provide valid item details.");
        return;
    }

    const cart = document.querySelector('.cart');

    const newItem = document.createElement('div');
    newItem.classList.add('cart-item');
    newItem.setAttribute('data-price', itemPrice);
    newItem.setAttribute('data-quantity', 1);

    newItem.innerHTML = `
        <img src="Assets/media/images/default.jpg" alt="${itemName}">
        <div class="item-details">
            <h3>${itemName}</h3>
            <p>Price: $${itemPrice}</p>
            <p>Quantity: <span class="quantity">1</span></p>
            <button class="increase-btn">Increase Quantity</button>
            <button class="remove-btn">Remove</button>
        </div>
    `;

    cart.appendChild(newItem);
    newItem.querySelector('.remove-btn').addEventListener('click', (e) => {
        newItem.remove();
        updateTotal();
    });

    newItem.querySelector('.increase-btn').addEventListener('click', () => {
        const quantitySpan = newItem.querySelector('.quantity');
        let quantity = parseInt(quantitySpan.textContent) || 1;
        quantity += 1;
        quantitySpan.textContent = quantity;
        newItem.setAttribute('data-quantity', quantity);
        updateTotal();
    });

    // Clear input fields
    document.getElementById('new-item-name').value = '';
    document.getElementById('new-item-price').value = '';

    updateTotal();
});

// Initial total calculation
updateTotal();
