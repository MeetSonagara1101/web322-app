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
const fs = require('fs').promises;
const path = require('path');

let items = [];

async function initialize() {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data/items.json'), 'utf8');
    items = JSON.parse(data);
    console.log('Items loaded successfully.');
  } catch (err) {
    console.error('Failed to load items:', err);
    throw err;
  }
}

async function getAllItems() {
  await initialize(); 
  return items;
}

async function getPublishedItems() {
  await initialize(); 
  return items.filter(item => item.published);
}

async function getCategories() {
  await initialize(); 
  const categories = new Set();
  items.forEach(item => {
    categories.add(item.category);
  });
  return Array.from(categories);
}

async function addItem(itemData) {
  return new Promise(async (resolve, reject) => {
    try {
      // Ensure the items are initialized
      await initialize();
      
      // Set the published property
      itemData.published = itemData.published !== undefined ? itemData.published : false;

      // Set the id property
      itemData.id = items.length + 1;

      // Push the new item into the items array
      items.push(itemData);

      // Save the updated items array to the JSON file
      await fs.writeFile(path.join(__dirname, 'data/items.json'), JSON.stringify(items, null, 2), 'utf8');

      // Resolve the promise with the new item data
      resolve(itemData);
    } catch (error) {
      reject(error);
    }
  });
}

async function getItemsByCategory(category) {
  return new Promise(async (resolve, reject) => {
    try {
      await initialize();
      const filteredItems = items.filter(item => item.category == category);
      if (filteredItems.length > 0) {
        resolve(filteredItems);
      } else {
        reject('no results returned');
      }
    } catch (error) {
      reject(error);
    }
  });
}

async function getItemsByMinDate(minDateStr) {
  return new Promise(async (resolve, reject) => {
    try {
      await initialize();
      const filteredItems = items.filter(item => new Date(item.postDate) >= new Date(minDateStr));
      if (filteredItems.length > 0) {
        resolve(filteredItems);
      } else {
        reject('no results returned');
      }
    } catch (error) {
      reject(error);
    }
  });
}

async function getItemById(id) {
  return new Promise(async (resolve, reject) => {
    try {
      await initialize();
      const item = items.find(item => item.id == id);
      if (item) {
        resolve(item);
      } else {
        reject('no result returned');
      }
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  initialize,
  getAllItems,
  getPublishedItems,
  getCategories,
  addItem,
  getItemsByCategory,
  getItemsByMinDate,
  getItemById
};
