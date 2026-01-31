// import mongoose from 'mongoose';
// import dotenv from 'dotenv';
// import MenuItem from '../models/MenuItem.js';
// import Order from '../models/Order.js';

// dotenv.config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log('MongoDB Connected');
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// const menuItems = [
//   // Appetizers
//   {
//     name: 'Bruschetta',
//     description: 'Toasted bread topped with fresh tomatoes, garlic, basil, and olive oil',
//     category: 'Appetizer',
//     price: 8.99,
//     ingredients: ['Bread', 'Tomatoes', 'Garlic', 'Basil', 'Olive Oil'],
//     isAvailable: true,
//     preparationTime: 10,
//     imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f'
//   },
//   {
//     name: 'Mozzarella Sticks',
//     description: 'Crispy fried mozzarella with marinara sauce',
//     category: 'Appetizer',
//     price: 7.99,
//     ingredients: ['Mozzarella', 'Breadcrumbs', 'Marinara Sauce'],
//     isAvailable: true,
//     preparationTime: 12,
//     imageUrl: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7'
//   },
//   {
//     name: 'Caesar Salad',
//     description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
//     category: 'Appetizer',
//     price: 9.99,
//     ingredients: ['Romaine Lettuce', 'Caesar Dressing', 'Croutons', 'Parmesan'],
//     isAvailable: true,
//     preparationTime: 8,
//     imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1'
//   },
//   {
//     name: 'Buffalo Wings',
//     description: 'Spicy chicken wings with blue cheese dip',
//     category: 'Appetizer',
//     price: 11.99,
//     ingredients: ['Chicken Wings', 'Buffalo Sauce', 'Blue Cheese'],
//     isAvailable: true,
//     preparationTime: 15,
//     imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7'
//   },

//   // Main Courses
//   {
//     name: 'Margherita Pizza',
//     description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
//     category: 'Main Course',
//     price: 14.99,
//     ingredients: ['Pizza Dough', 'Tomato Sauce', 'Mozzarella', 'Basil'],
//     isAvailable: true,
//     preparationTime: 20,
//     imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002'
//   },
//   {
//     name: 'Grilled Salmon',
//     description: 'Fresh Atlantic salmon with lemon butter and seasonal vegetables',
//     category: 'Main Course',
//     price: 22.99,
//     ingredients: ['Salmon', 'Lemon', 'Butter', 'Vegetables'],
//     isAvailable: true,
//     preparationTime: 25,
//     imageUrl: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927'
//   },
//   {
//     name: 'Beef Burger',
//     description: 'Juicy beef patty with lettuce, tomato, cheese, and special sauce',
//     category: 'Main Course',
//     price: 13.99,
//     ingredients: ['Beef Patty', 'Bun', 'Lettuce', 'Tomato', 'Cheese', 'Special Sauce'],
//     isAvailable: true,
//     preparationTime: 18,
//     imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
//   },
//   {
//     name: 'Chicken Alfredo',
//     description: 'Fettuccine pasta with grilled chicken in creamy Alfredo sauce',
//     category: 'Main Course',
//     price: 16.99,
//     ingredients: ['Fettuccine', 'Chicken', 'Cream', 'Parmesan', 'Garlic'],
//     isAvailable: true,
//     preparationTime: 22,
//     imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a'
//   },
//   {
//     name: 'Vegetable Stir Fry',
//     description: 'Fresh vegetables wok-fried with ginger and soy sauce, served with rice',
//     category: 'Main Course',
//     price: 12.99,
//     ingredients: ['Mixed Vegetables', 'Ginger', 'Soy Sauce', 'Rice'],
//     isAvailable: false,
//     preparationTime: 15,
//     imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19'
//   },

//   // Desserts
//   {
//     name: 'Chocolate Lava Cake',
//     description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
//     category: 'Dessert',
//     price: 7.99,
//     ingredients: ['Chocolate', 'Flour', 'Eggs', 'Vanilla Ice Cream'],
//     isAvailable: true,
//     preparationTime: 14,
//     imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51'
//   },
//   {
//     name: 'Tiramisu',
//     description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
//     category: 'Dessert',
//     price: 6.99,
//     ingredients: ['Ladyfingers', 'Coffee', 'Mascarpone', 'Cocoa'],
//     isAvailable: true,
//     preparationTime: 10,
//     imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9'
//   },
//   {
//     name: 'Cheesecake',
//     description: 'New York style cheesecake with berry compote',
//     category: 'Dessert',
//     price: 6.49,
//     ingredients: ['Cream Cheese', 'Graham Crackers', 'Berries', 'Sugar'],
//     isAvailable: true,
//     preparationTime: 8,
//     imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad'
//   },

//   // Beverages
//   {
//     name: 'Fresh Lemonade',
//     description: 'Homemade lemonade with fresh lemons and mint',
//     category: 'Beverage',
//     price: 3.99,
//     ingredients: ['Lemons', 'Sugar', 'Mint', 'Water'],
//     isAvailable: true,
//     preparationTime: 5,
//     imageUrl: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9f'
//   },
//   {
//     name: 'Cappuccino',
//     description: 'Espresso with steamed milk and foam',
//     category: 'Beverage',
//     price: 4.49,
//     ingredients: ['Espresso', 'Milk'],
//     isAvailable: true,
//     preparationTime: 6,
//     imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d'
//   },
//   {
//     name: 'Iced Tea',
//     description: 'Refreshing iced tea with lemon',
//     category: 'Beverage',
//     price: 2.99,
//     ingredients: ['Tea', 'Lemon', 'Ice', 'Sugar'],
//     isAvailable: true,
//     preparationTime: 3,
//     imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc'
//   }
// ];

// const seedData = async () => {
//   try {
//     await connectDB();

//     await MenuItem.deleteMany();
//     await Order.deleteMany();
//     console.log('Data cleared');

//     const createdMenuItems = await MenuItem.insertMany(menuItems);
//     console.log(`${createdMenuItems.length} menu items created`);

//     const statuses = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];
//     const customerNames = ['John Doe', 'Jane Smith', 'Bob Johnson', 'Alice Williams', 'Charlie Brown'];

//     const sampleOrders = [];

//     for (let i = 0; i < 10; i++) {
//       const numItems = Math.floor(Math.random() * 3) + 1;
//       let totalAmount = 0;
//       const orderItems = [];

//       for (let j = 0; j < numItems; j++) {
//         const randomItem = createdMenuItems[Math.floor(Math.random() * createdMenuItems.length)];
//         const quantity = Math.floor(Math.random() * 3) + 1;

//         orderItems.push({
//           menuItem: randomItem._id,
//           quantity,
//           price: randomItem.price
//         });

//         totalAmount += randomItem.price * quantity;
//       }

//       sampleOrders.push({
//         items: orderItems,
//         totalAmount,
//         status: statuses[Math.floor(Math.random() * statuses.length)],
//         customerName: customerNames[Math.floor(Math.random() * customerNames.length)],
//         tableNumber: Math.floor(Math.random() * 20) + 1
//       });
//     }

//     const createdOrders = await Order.insertMany(sampleOrders);
//     console.log(`${createdOrders.length} orders created`);

//     console.log('Database seeded successfully!');
//     process.exit(0);
//   } catch (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
// };

// seedData();

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MenuItem from '../models/MenuItem.js';
import Order from '../models/Order.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const menuItems = [
  // Appetizers
  {
    name: 'Bruschetta',
    description: 'Toasted bread topped with fresh tomatoes, garlic, basil, and olive oil',
    category: 'Appetizer',
    price: 8.99,
    ingredients: ['Bread', 'Tomatoes', 'Garlic', 'Basil', 'Olive Oil'],
    isAvailable: true,
    preparationTime: 10,
    imageUrl: 'https://images.unsplash.com/photo-1572695157366-5e585ab2b69f'
  },
  {
    name: 'Mozzarella Sticks',
    description: 'Crispy fried mozzarella with marinara sauce',
    category: 'Appetizer',
    price: 7.99,
    ingredients: ['Mozzarella', 'Breadcrumbs', 'Marinara Sauce'],
    isAvailable: true,
    preparationTime: 12,
    imageUrl: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7'
  },
  {
    name: 'Caesar Salad',
    description: 'Fresh romaine lettuce with Caesar dressing, croutons, and parmesan',
    category: 'Appetizer',
    price: 9.99,
    ingredients: ['Romaine Lettuce', 'Caesar Dressing', 'Croutons', 'Parmesan'],
    isAvailable: true,
    preparationTime: 8,
    imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1'
  },
  {
    name: 'Buffalo Wings',
    description: 'Spicy chicken wings with blue cheese dip',
    category: 'Appetizer',
    price: 11.99,
    ingredients: ['Chicken Wings', 'Buffalo Sauce', 'Blue Cheese'],
    isAvailable: true,
    preparationTime: 15,
    imageUrl: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7'
  },
  
  // Main Courses
  {
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    category: 'Main Course',
    price: 14.99,
    ingredients: ['Pizza Dough', 'Tomato Sauce', 'Mozzarella', 'Basil'],
    isAvailable: true,
    preparationTime: 20,
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002'
  },
  {
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon butter and seasonal vegetables',
    category: 'Main Course',
    price: 22.99,
    ingredients: ['Salmon', 'Lemon', 'Butter', 'Vegetables'],
    isAvailable: true,
    preparationTime: 25,
    imageUrl: 'https://images.unsplash.com/photo-1485921325833-c519f76c4927'
  },
  {
    name: 'Beef Burger',
    description: 'Juicy beef patty with lettuce, tomato, cheese, and special sauce',
    category: 'Main Course',
    price: 13.99,
    ingredients: ['Beef Patty', 'Bun', 'Lettuce', 'Tomato', 'Cheese', 'Special Sauce'],
    isAvailable: true,
    preparationTime: 18,
    imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd'
  },
  {
    name: 'Chicken Alfredo',
    description: 'Fettuccine pasta with grilled chicken in creamy Alfredo sauce',
    category: 'Main Course',
    price: 16.99,
    ingredients: ['Fettuccine', 'Chicken', 'Cream', 'Parmesan', 'Garlic'],
    isAvailable: true,
    preparationTime: 22,
    imageUrl: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a'
  },
  {
    name: 'Vegetable Stir Fry',
    description: 'Fresh vegetables wok-fried with ginger and soy sauce, served with rice',
    category: 'Main Course',
    price: 12.99,
    ingredients: ['Mixed Vegetables', 'Ginger', 'Soy Sauce', 'Rice'],
    isAvailable: false,
    preparationTime: 15,
    imageUrl: 'https://images.unsplash.com/photo-1512058564366-18510be2db19'
  },
  
  // Desserts
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center, served with vanilla ice cream',
    category: 'Dessert',
    price: 7.99,
    ingredients: ['Chocolate', 'Flour', 'Eggs', 'Vanilla Ice Cream'],
    isAvailable: true,
    preparationTime: 14,
    imageUrl: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51'
  },
  {
    name: 'Tiramisu',
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone',
    category: 'Dessert',
    price: 6.99,
    ingredients: ['Ladyfingers', 'Coffee', 'Mascarpone', 'Cocoa'],
    isAvailable: true,
    preparationTime: 10,
    imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9'
  },
  {
    name: 'Cheesecake',
    description: 'New York style cheesecake with berry compote',
    category: 'Dessert',
    price: 6.49,
    ingredients: ['Cream Cheese', 'Graham Crackers', 'Berries', 'Sugar'],
    isAvailable: true,
    preparationTime: 8,
    imageUrl: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad'
  },
  
  // Beverages
  {
    name: 'Fresh Lemonade',
    description: 'Homemade lemonade with fresh lemons and mint',
    category: 'Beverage',
    price: 3.99,
    ingredients: ['Lemons', 'Sugar', 'Mint', 'Water'],
    isAvailable: true,
    preparationTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9f'
  },
  {
    name: 'Cappuccino',
    description: 'Espresso with steamed milk and foam',
    category: 'Beverage',
    price: 4.49,
    ingredients: ['Espresso', 'Milk'],
    isAvailable: true,
    preparationTime: 6,
    imageUrl: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d'
  },
  {
    name: 'Iced Tea',
    description: 'Refreshing iced tea with lemon',
    category: 'Beverage',
    price: 2.99,
    ingredients: ['Tea', 'Lemon', 'Ice', 'Sugar'],
    isAvailable: true,
    preparationTime: 3,
    imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc'
  }
];

const sampleOrders = [
  // Order 1 - Pending - Table 5
  {
    customerName: 'John Smith',
    tableNumber: 5,
    status: 'Pending',
    items: [
      { quantity: 2, itemName: 'Bruschetta' },
      { quantity: 1, itemName: 'Margherita Pizza' },
      { quantity: 2, itemName: 'Fresh Lemonade' }
    ]
  },
  // Order 2 - Preparing - Table 8
  {
    customerName: 'Sarah Johnson',
    tableNumber: 8,
    status: 'Preparing',
    items: [
      { quantity: 1, itemName: 'Caesar Salad' },
      { quantity: 2, itemName: 'Grilled Salmon' },
      { quantity: 1, itemName: 'Chocolate Lava Cake' },
      { quantity: 2, itemName: 'Cappuccino' }
    ]
  },
  // Order 3 - Ready - Table 3
  {
    customerName: 'Michael Brown',
    tableNumber: 3,
    status: 'Ready',
    items: [
      { quantity: 3, itemName: 'Buffalo Wings' },
      { quantity: 3, itemName: 'Beef Burger' },
      { quantity: 3, itemName: 'Iced Tea' }
    ]
  },
  // Order 4 - Delivered - Table 12
  {
    customerName: 'Emily Davis',
    tableNumber: 12,
    status: 'Delivered',
    items: [
      { quantity: 1, itemName: 'Mozzarella Sticks' },
      { quantity: 1, itemName: 'Chicken Alfredo' },
      { quantity: 1, itemName: 'Tiramisu' },
      { quantity: 1, itemName: 'Cappuccino' }
    ]
  },
  // Order 5 - Pending - Table 7
  {
    customerName: 'David Wilson',
    tableNumber: 7,
    status: 'Pending',
    items: [
      { quantity: 2, itemName: 'Caesar Salad' },
      { quantity: 2, itemName: 'Margherita Pizza' },
      { quantity: 2, itemName: 'Fresh Lemonade' }
    ]
  },
  // Order 6 - Preparing - Table 15
  {
    customerName: 'Jennifer Martinez',
    tableNumber: 15,
    status: 'Preparing',
    items: [
      { quantity: 1, itemName: 'Bruschetta' },
      { quantity: 1, itemName: 'Grilled Salmon' },
      { quantity: 1, itemName: 'Cheesecake' }
    ]
  },
  // Order 7 - Ready - Table 4
  {
    customerName: 'Robert Garcia',
    tableNumber: 4,
    status: 'Ready',
    items: [
      { quantity: 4, itemName: 'Beef Burger' },
      { quantity: 2, itemName: 'Buffalo Wings' },
      { quantity: 4, itemName: 'Iced Tea' }
    ]
  },
  // Order 8 - Delivered - Table 10
  {
    customerName: 'Lisa Anderson',
    tableNumber: 10,
    status: 'Delivered',
    items: [
      { quantity: 1, itemName: 'Vegetable Stir Fry' },
      { quantity: 1, itemName: 'Fresh Lemonade' }
    ]
  },
  // Order 9 - Cancelled - Table 6
  {
    customerName: 'James Taylor',
    tableNumber: 6,
    status: 'Cancelled',
    items: [
      { quantity: 2, itemName: 'Margherita Pizza' },
      { quantity: 2, itemName: 'Chocolate Lava Cake' }
    ]
  },
  // Order 10 - Preparing - Table 9
  {
    customerName: 'Maria Rodriguez',
    tableNumber: 9,
    status: 'Preparing',
    items: [
      { quantity: 1, itemName: 'Mozzarella Sticks' },
      { quantity: 2, itemName: 'Chicken Alfredo' },
      { quantity: 1, itemName: 'Tiramisu' },
      { quantity: 2, itemName: 'Cappuccino' }
    ]
  },
  // Order 11 - Pending - Table 2
  {
    customerName: 'Christopher Lee',
    tableNumber: 2,
    status: 'Pending',
    items: [
      { quantity: 1, itemName: 'Buffalo Wings' },
      { quantity: 1, itemName: 'Beef Burger' },
      { quantity: 1, itemName: 'Iced Tea' }
    ]
  },
  // Order 12 - Ready - Table 14
  {
    customerName: 'Amanda White',
    tableNumber: 14,
    status: 'Ready',
    items: [
      { quantity: 2, itemName: 'Bruschetta' },
      { quantity: 2, itemName: 'Grilled Salmon' },
      { quantity: 2, itemName: 'Cheesecake' },
      { quantity: 2, itemName: 'Fresh Lemonade' }
    ]
  }
];

const seedData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await MenuItem.deleteMany();
    await Order.deleteMany();
    
    console.log('Data cleared');
    
    // Insert menu items
    const createdMenuItems = await MenuItem.insertMany(menuItems);
    console.log(`${createdMenuItems.length} menu items created`);
    
    // Create a map for easy menu item lookup
    const menuItemMap = {};
    createdMenuItems.forEach(item => {
      menuItemMap[item.name] = item;
    });
    
    // Create orders with proper structure (one by one to trigger pre-save hook)
    const createdOrders = [];
    
    for (const orderData of sampleOrders) {
      const orderItems = [];
      let totalAmount = 0;
      
      for (const item of orderData.items) {
        const menuItem = menuItemMap[item.itemName];
        
        if (menuItem) {
          orderItems.push({
            menuItem: menuItem._id,
            quantity: item.quantity,
            price: menuItem.price
          });
          
          totalAmount += menuItem.price * item.quantity;
        }
      }
      
      // Create and save each order individually to trigger pre-save hook
      const order = new Order({
        items: orderItems,
        totalAmount: parseFloat(totalAmount.toFixed(2)),
        status: orderData.status,
        customerName: orderData.customerName,
        tableNumber: orderData.tableNumber
      });
      
      const savedOrder = await order.save();
      createdOrders.push(savedOrder);
    }
    
    console.log(`${createdOrders.length} orders created`);
    
    // Display summary
    console.log('\n=== Seed Data Summary ===');
    console.log(`Menu Items: ${createdMenuItems.length}`);
    console.log('  - Appetizers: 4');
    console.log('  - Main Courses: 5');
    console.log('  - Desserts: 3');
    console.log('  - Beverages: 3');
    console.log(`\nOrders: ${createdOrders.length}`);
    
    const statusCounts = {};
    createdOrders.forEach(order => {
      statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    });
    
    Object.keys(statusCounts).forEach(status => {
      console.log(`  - ${status}: ${statusCounts[status]}`);
    });
    
    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();