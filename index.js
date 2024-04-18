// Import necessary modules
import express from "express"; // Express framework
import { dirname } from "path"; // dirname function from path module
import { fileURLToPath } from "url"; // fileURLToPath function from url module
import bodyParser from "body-parser"; // bodyParser middleware for parsing request bodies

// Define __dirname using dirname and fileURLToPath functions
const __dirname = dirname(fileURLToPath(import.meta.url));

// Create an Express application instance
const app = express();

// Define the port number
const port = 3000;

// Use bodyParser middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({extended: true}));

// Define route for serving the index.html file
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

// Define route for handling form submission and authenticate
app.post("/check", auth, (req, res) => {
    // If authentication passed, serve the secret.html file
    res.sendFile(__dirname + "/public/secret.html");
});

// Authentication middleware
function auth(req, res, next) {
    // Check if the password submitted matches the expected password
    if (req.body.password === "ILoveProgramming") {
        // If authentication passed, proceed to the next middleware or route handler
        next();
    } else {
        // If authentication fails, send the index.html file
        res.sendFile(__dirname + "/public/index.html");
    }
}

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
