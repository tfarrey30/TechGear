let cart = document.querySelector('.cart-items');
let addToCart = document.querySelector('.btn');
let productPrices = document.querySelectorAll('#product-price');
let subTotal = document.querySelector('#subtotal');
let taxQuery = document.querySelector('#tax');
let grandQuery = document.querySelector('#grand');
let quantityQuery = document.querySelectorAll('.quantity-input');
let discount = document.querySelector('.discount-input');
let shipping = document.querySelector('#shipping');
let discountOff = document.querySelector('#total-discount');
let emailInput = document.querySelector('#email');
let passwordInput = document.querySelector('#password');


let count = 0;
let taxRate = 0.05;
let findDiscount = 0;
let grandTotal = 0;

let discountCodes = ['FREESHIPPING', '20OFF', 'BLACKFRIDAY'];

// Helper Functions
function twoDecimals(num) {
    return Math.floor(num * 100) / 100;
}

function formatPrice(price) {
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}

function calculateTotals() {
    let subtotal = 0;
    let shippingNum = 0;
    document.querySelectorAll('tbody tr').forEach((row) => {
        let priceElement = row.querySelector('#product-price');
        let quantityInput = row.querySelector('.quantity-input');

        let priceValue = parseFloat(priceElement.textContent.replace('$', ''));
        let quantity = parseInt(quantityInput.value, 10);
        shippingNum = parseFloat(shipping.textContent.replace('$', ''));
        if (!isNaN(priceValue) && !isNaN(quantity) && !isNaN(shippingNum)) {
            subtotal += priceValue * quantity;
        }
    });


    let tax = twoDecimals(subtotal * taxRate);
    grandTotal = (subtotal + tax + shippingNum) - findDiscount;


    subTotal.textContent = formatPrice(subtotal);
    taxQuery.textContent = formatPrice(tax);
    grandQuery.textContent = formatPrice(grandTotal);
}

function checkDiscount() {
    if (discountCodes.includes(discount.value)) {
        if (discount.value === "FREESHIPPING") {
            shipping.innerHTML = "$0.00";
            calculateTotals();
        }
        if (discount.value === "20OFF") {
            findDiscount = grandTotal * .20;
            discountOff.textContent = '$' + findDiscount.toFixed(2);
            calculateTotals();
        }
        if (discount.value === "BLACKFRIDAY") {
            findDiscount = grandTotal * .30;
            discountOff.textContent = '$' + findDiscount.toFixed(2);
            calculateTotals();
        }
    } else {
        // Maybe do something?
    }
}

// Event Listensers
quantityQuery.forEach((input) => {
    input.addEventListener('input', () => {
        calculateTotals();
    })
})

discount.addEventListener('input', () => {
    checkDiscount();
})



calculateTotals();
