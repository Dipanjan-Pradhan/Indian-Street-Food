require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-very-secure-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 } // 1 hour
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/Supplier/static', express.static(path.join(__dirname, '../Supplier/static')));
app.use('/Vendor/LandPage', express.static(path.join(__dirname, '../Vendor/LandPage')));
app.use('/Vendor/SupplierInfo', express.static(path.join(__dirname, '../Vendor/SupplierInfo')));
app.use(express.static(path.join(__dirname, '../'))); // For index.html, styles.css, etc.

// Authentication middleware
function requireAuth(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/Supplier/login');
    }
}

// --- ROUTES ---
// Public pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
app.get('/Supplier/login', (req, res) => res.sendFile(path.join(__dirname, '../Supplier/login.html')));
app.get('/Supplier/welcome', (req, res) => res.sendFile(path.join(__dirname, '../Supplier/welcome.html')));
app.get('/Vendor/LandPage/vendor', (req, res) => res.sendFile(path.join(__dirname, '../Vendor/LandPage/vendor.html')));
app.get('/Supplier/items', (req, res) => res.sendFile(path.join(__dirname, '../Supplier/items.html')));
app.get('/Supplier/profile', (req, res) => res.sendFile(path.join(__dirname, '../Supplier/profile.html')));

// Example: API endpoint for login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    // TODO: Replace with real user lookup and password check
    if (email === 'supplier@example.com' && password === 'password123') {
        req.session.user = { email };
        return res.json({ success: true });
    }
    res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Example: API endpoint for logout
app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

// Example: API endpoint for registration (stub)
app.post('/api/register', (req, res) => {
    // TODO: Implement registration logic and user storage
    res.json({ success: true, message: 'Registration successful (stub)' });
});

// API routes
app.use('/api/supplier', require('./routes/supplier'));
app.use('/api/supplieritem', require('./routes/supplieritem'));
app.use('/api/user', require('./routes/user'));
app.use('/api/vender', require('./routes/vender'));

// Catch-all for 404
app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
