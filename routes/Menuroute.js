const express = require('express');
const router = express.Router();
const Menu = require('./../Models/menu.js'); // Menu model import
// const User = require('./../Models/user'); // Assuming there is a User model for login
const { jwtAuthMiddleware, generateToken } = require('./../jwt'); // JWT utilities
const MenuItem = Menu.MenuItem;
 
// POST API - Add Menu Item
router.post('/', async (req, res) => {
  try {
    const menuItemData = req.body; // Menu data from request body
    const menuItem = new MenuItem(menuItemData);
    const savedMenuItem = await menuItem.save();
    console.log('Menu item saved successfully');

    const payload = {
      id: savedMenuItem._id, // Ensure correct ID field (_id for MongoDB)
      username: savedMenuItem.username, // Assuming `username` is part of menu item data
    };

    const token = generateToken(payload);
    console.log('Generated token:', token);

    res.status(200).json({ savedMenuItem, token }); // Send both menu item and token in response
  } catch (err) {
    console.error('Error saving menu item:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST API - User Login
router.post('/login', async (req, res) => {
  try {

    
    const { username, password } = req.body;

    // Find user by username
    const user = await MenuItem.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check if the password is correct (Assuming comparePassword is a method on the User model)
    const isPasswordValid = await MenuItem.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const payload = {
      id: user._id, // Use the correct field name for the user's ID
      username: user.username,
    };

    const token = generateToken(payload);
    res.status(200).json({ token }); // Send the token in the response
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET API - Get All Menu Items
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    console.log('Fetched menu items successfully');
    res.status(200).json(menuItems);
  } catch (err) {
    console.error('Error fetching menu items:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;