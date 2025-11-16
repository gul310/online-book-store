// DOM Elements
const books = document.querySelectorAll('.book');
const categorySections = document.getElementById('categories');
const cartSection = document.getElementById('cart');
const miniCartSection = document.getElementById('miniCart');
const notAvailable = document.getElementById('notAvailable');

const miniCartItems = document.getElementById('miniCartItems');
const miniTotalPriceEl = document.getElementById('miniTotalPrice');
const miniTotalItemsEl = document.getElementById('miniTotalItems');

const cartItems = document.getElementById('cartItems');
const totalPriceEl = document.getElementById('totalPrice');

const navCategories = document.querySelectorAll('.nav-category');
const navCart = document.getElementById('nav-cart');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

let totalPrice = 0;
let totalItems = 0;

// Show books by category
function showCategory(category) {
    categorySections.style.display = 'block';
    cartSection.style.display = 'none';
    miniCartSection.style.display = 'block';
    let found = false;
    books.forEach(book => {
        if(category === 'All' || book.getAttribute('data-category') === category) {
            book.style.display = 'block';
            found = true;
        } else {
            book.style.display = 'none';
        }
    });
    notAvailable.style.display = found ? 'none' : 'block';
}

// Show Full Cart
function showCart() {
    categorySections.style.display = 'none';
    miniCartSection.style.display = 'none';
    cartSection.style.display = 'block';
}

// Search Functionality
searchBtn.addEventListener('click', () => {
    categorySections.style.display = 'block';
    cartSection.style.display = 'none';
    miniCartSection.style.display = 'block';
    const query = searchInput.value.toLowerCase();
    let found = false;
    books.forEach(book => {
        const title = book.querySelector('.title').textContent.toLowerCase();
        const author = book.querySelector('.author').textContent.toLowerCase();
        if(title.includes(query) || author.includes(query)){
            book.style.display = 'block';
            found = true;
        } else {
            book.style.display = 'none';
        }
    });
    notAvailable.style.display = found ? 'none' : 'block';
});

// Add to Cart (update miniCart + full Cart)
books.forEach(book => {
    book.querySelector('.add-cart').addEventListener('click', () => {
        const title = book.querySelector('.title').textContent;
        const author = book.querySelector('.author').textContent;
        const price = parseFloat(book.querySelector('.price').textContent.replace('$',''));

        // Mini Cart
        const miniLi = document.createElement('li');
        miniLi.textContent = `${title} - $${price}`;
        miniCartItems.appendChild(miniLi);
        totalItems++;
        miniTotalItemsEl.textContent = totalItems;
        totalPrice += price;
        miniTotalPriceEl.textContent = totalPrice.toFixed(2);

        // Full Cart
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Title:</strong> ${title} <br>
            <strong>Author:</strong> ${author} <br>
            <strong>Price:</strong> $${price.toFixed(2)}
        `;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            cartItems.removeChild(li);

            // Update mini cart too
            const miniChildren = Array.from(miniCartItems.children);
            const index = miniChildren.indexOf(miniLi);
            if(index > -1){
                miniCartItems.removeChild(miniLi);
            }

            totalItems--;
            miniTotalItemsEl.textContent = totalItems;
            totalPrice -= price;
            totalPriceEl.textContent = totalPrice.toFixed(2);
            miniTotalPriceEl.textContent = totalPrice.toFixed(2);
        });

        li.appendChild(removeBtn);
        cartItems.appendChild(li);
        totalPriceEl.textContent = totalPrice.toFixed(2);

        // Auto show mini cart
        categorySections.style.display = 'block';
        miniCartSection.style.display = 'block';
        cartSection.style.display = 'none';
    });
});

// Dropdown Category Click
navCategories.forEach(nav => {
    nav.addEventListener('click', e => {
        e.preventDefault();
        const category = nav.getAttribute('data-category');
        showCategory(category);
    });
});

// Cart Icon Click
navCart.addEventListener('click', e => {
    e.preventDefault();
    showCart();
});
