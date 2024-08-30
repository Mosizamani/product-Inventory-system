const apiUrl = 'http://localhost:5000/api/products'; // Replace with your actual backend API URL

// Function to fetch and display products
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();
        
        // Get the table body element
        const productTableBody = document.getElementById('productTableBody');
        productTableBody.innerHTML = ''; // Clear existing rows

        // Populate table rows with products
        products.forEach(product => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>$${product.price}</td>
                <td>${product.category}</td>
                <td>${product.stockQuantity}</td>
                <td><button onclick="deleteProduct('${product._id}')">Delete</button></td>
            `;

            productTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}


// Function to add a new product
async function addProduct(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const stockQuantity = document.getElementById('stockQuantity').value;

    const product = { name, description, price, category, stockQuantity };

    try {
        await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        fetchProducts();
        document.getElementById('productForm').reset();
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

// Function to delete a product
async function deleteProduct(id) {
    try {
        await fetch(`${apiUrl}/${id}`, {
            method: 'DELETE'
        });
        fetchProducts();
    } catch (error) {
        console.error('Error deleting product:', error);
    }
}

// Event listener for form submission
document.getElementById('productForm').addEventListener('submit', addProduct);

// Initial fetch of products on page load
fetchProducts();
