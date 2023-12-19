const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = 5500; // You can change the port as needed

// Use CORS middleware
app.use(cors());

// MySQL Connection Configuration
const dbConfig = {
    host: 'localhost', // Change this to your MySQL server host
    user: 'root',      // Change this to your MySQL username
    password: '',      // Change this to your MySQL password
    database: 'farmers_market', // Change this to your database name
    port: 3306
};

// Create a MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Test the MySQL connection
pool.getConnection()
    .then(connection => {
        console.log('Connected to the MySQL database on port 3306');
        connection.release();
    })
    .catch(error => {
        console.error('Error connecting to the MySQL database:', error);
    });

// API endpoint to fetch randomly ordered top-selling products
app.get('/api/top-selling-products', async (req, res) => {
    try {
        // Fetch top-selling products from the database
        const connection = await pool.getConnection();
        const [results] = await connection.query('SELECT * FROM top_selling_products');
        connection.release();

        // Shuffle the array of top-selling products
        const shuffledProducts = shuffleArray(results);

        // Log success message
        console.log('Successfully fetched and shuffled top-selling products');

        res.json(shuffledProducts);
    } catch (error) {
        console.error('Error fetching top-selling products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}




// API endpoint to fetch products by category
app.get('/api/products-by-category/:categoryId', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;

        // Fetch products by category from the database (limit to 10 for now)
        const connection = await pool.getConnection();
        const [results] = await connection.query('SELECT * FROM products WHERE category_id = ? ORDER BY RAND() LIMIT 10', [categoryId]);
        connection.release();

        // Log success message
        console.log(`Successfully fetched products for category ${categoryId}`);

        res.json(results);
    } catch (error) {
        console.error(`Error fetching products for category ${categoryId}:`, error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
