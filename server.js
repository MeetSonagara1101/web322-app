/*********************************************************************************
WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca Academic Policy.  
No part of this assignment has been copied manually or electronically from any other source 
(including 3rd party web sites) or distributed to other students.

Name: Meet Hitesh Sonagara 
Student ID: 122208226 
Date: 08/10/2024
Cyclic Web App URL: 
GitHub Repository URL: 
********************************************************************************/
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;
const storeService = require('./store-service');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/index.html');
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/about.html'));
});

app.get('/shop', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/shop.html'));
});

app.get('/items', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/items.html'));
});

app.get('/categories', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/categories.html'));
});

app.get('/add', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/add.html'));
});

app.get('/api/shop', async (req, res) => {
  try {
    const items = await storeService.getPublishedItems();
    res.json(items);
  } catch (err) {
    console.error('Error fetching published items:', err);
    res.status(500).json({ message: 'Failed to fetch published items' });
  }
});

app.get('/api/items', async (req, res) => {
  try {
    const items = await storeService.getAllItems();
    res.json(items);
  } catch (err) {
    console.error('Error fetching all items:', err);
    res.status(500).json({ message: 'Failed to fetch all items' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await storeService.getCategories();
    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
});

app.use((req, res) => {
  res.status(404).send('Page Not Found');
});

storeService.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Express http server listening on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to initialize store service:', error);
  });
