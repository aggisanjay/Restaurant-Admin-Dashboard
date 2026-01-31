// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema(
//   {
//     orderNumber: {
//       type: String,
//       unique: true
//     },
//     items: [
//       {
//         menuItem: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'MenuItem',
//           required: true
//         },
//         quantity: {
//           type: Number,
//           required: true,
//           min: [1, 'Quantity must be at least 1']
//         },
//         price: {
//           type: Number,
//           required: true,
//           min: [0, 'Price cannot be negative']
//         }
//       }
//     ],
//     totalAmount: {
//       type: Number,
//       required: true,
//       min: [0, 'Total amount cannot be negative']
//     },
//     status: {
//       type: String,
//       required: true,
//       enum: {
//         values: ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'],
//         message: '{VALUE} is not a valid status'
//       },
//       default: 'Pending'
//     },
//     customerName: {
//       type: String,
//       required: [true, 'Customer name is required'],
//       trim: true
//     },
//     tableNumber: {
//       type: Number,
//       required: [true, 'Table number is required'],
//       min: [1, 'Table number must be positive']
//     }
//   },
//   {
//     timestamps: true
//   }
// );

// // Generate order number before saving
// orderSchema.pre('save', async function (next) {
//   if (this.isNew && !this.orderNumber) {
//     const date = new Date();
//     const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
//     const count = await mongoose.model('Order').countDocuments();
//     this.orderNumber = `ORD-${dateStr}-${String(count + 1).padStart(4, '0')}`;
//   }
//   next();
// });

// const Order = mongoose.model('Order', orderSchema);

// export default Order;

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      sparse: true // Allows multiple docs without this field during creation
    },
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'MenuItem',
          required: true
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1']
        },
        price: {
          type: Number,
          required: true,
          min: [0, 'Price cannot be negative']
        }
      }
    ],
    totalAmount: {
      type: Number,
      required: true,
      min: [0, 'Total amount cannot be negative']
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'],
        message: '{VALUE} is not a valid status'
      },
      default: 'Pending'
    },
    customerName: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true
    },
    tableNumber: {
      type: Number,
      required: [true, 'Table number is required'],
      min: [1, 'Table number must be positive']
    }
  },
  {
    timestamps: true
  }
);

// Generate order number before saving
orderSchema.pre('save', async function () {
  if (this.isNew && !this.orderNumber) {
    const date = new Date();
    const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD-${dateStr}-${String(count + 1).padStart(4, '0')}`;
  }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
