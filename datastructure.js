// Initialize product list
let products = [];

// Helper function to generate unique IDs
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Function to add a new product
function addProduct(name, category, price, quantity) {
    const product = {
        id: generateId(),
        name,
        category,
        price,
        quantity
    };
    products.push(product);
    console.log(`Product ${name} added successfully!`);
}

// Function to update product information by ID
function updateProduct(id, updatedInfo) {
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedInfo };
        console.log(`Product with ID ${id} updated successfully!`);
    } else {
        console.log(`Product with ID ${id} not found.`);
    }
}

// Binary search function to find a product by name or ID
function binarySearch(arr, key, value) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid][key] === value) {
            return mid;
        } else if (arr[mid][key] < value) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return -1; // Not found
}

// Function to search for products by name or ID
function searchProduct(searchTerm, searchBy = 'name') {
    // Ensure the list is sorted for binary search
    products.sort((a, b) => a[searchBy].localeCompare(b[searchBy]));

    const index = binarySearch(products, searchBy, searchTerm);
    if (index !== -1) {
        console.log('Product found:', products[index]);
    } else {
        console.log(`Product with ${searchBy} "${searchTerm}" not found.`);
    }
}

// Merge sort algorithm for sorting products
function mergeSort(arr, key) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left, key), mergeSort(right, key), key);
}

function merge(left, right, key) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex][key] < right[rightIndex][key]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}

// Function to sort products by name, price, or category
function sortProducts(sortBy) {
    products = mergeSort(products, sortBy);
    console.log(`Products sorted by ${sortBy}:`, products);
}

// Function to filter products by ID
function filterProductById(id) {
    const product = products.find(product => product.id === id);
    if (product) {
        console.log('Filtered Product:', product);
    } else {
        console.log(`Product with ID ${id} not found.`);
    }
}

// Example Usage

// Adding products
addProduct('Laptop', 'Electronics', 1000, 10);
addProduct('Shirt', 'Clothing', 50, 100);
addProduct('Refrigerator', 'Home Appliances', 500, 5);
addProduct('Smartphone', 'Electronics', 700, 50);

// Updating a product
updateProduct(products[0].id, { price: 950, quantity: 8 });

// Searching for products
searchProduct('Laptop');
searchProduct(products[0].id, 'id');

// Sorting products
sortProducts('name');
sortProducts('price');

// Filtering a product by ID
filterProductById(products[2].id);
