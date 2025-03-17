import express from 'express';  // Importing the Express library
import path from 'path';  // Importing the path module for working with file paths
import { fileURLToPath } from 'url';  // Importing the fileURLToPath function from the 'url' module
import { dirname } from 'path';  // Importing the dirname function from the 'path' module

// Set up __dirname in ES Module context
const __filename = fileURLToPath(import.meta.url);  // Get the current file's absolute path
const __dirname = dirname(__filename);  // Get the directory name of the current file

// Create an Express application
const app = express();

// Set up static file serving from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Define the route for the root ('/') path
app.get('/', (req, res) => {
  // Send the index.html file when the root route is accessed
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Set the port for the app to listen on (use environment variable or default to 3000)
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
