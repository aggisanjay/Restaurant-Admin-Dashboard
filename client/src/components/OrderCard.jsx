import React, { useState } from 'react';
import './OrderCard.css';

const OrderCard = ({ order, onStatusUpdate }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(order.status);

  const statusOptions = ['Pending', 'Preparing', 'Ready', 'Delivered', 'Cancelled'];

  const handleStatusChange = async (newStatus) => {
    setSelectedStatus(newStatus);
    await onStatusUpdate(order._id, newStatus);
  };

  const getStatusClass = (status) => {
    return status.toLowerCase().replace(' ', '-');
  };

  return (
    <div className="order-card">
      <div className="order-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="order-info">
          <h3>Order #{order.orderNumber}</h3>
          <p className="customer-info">
            {order.customerName} - Table {order.tableNumber}
          </p>
          <p className="order-date">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>
        
        <div className="order-summary">
          <span className={`status-badge ${getStatusClass(order.status)}`}>
            {order.status}
          </span>
          <span className="total-amount">${order.totalAmount.toFixed(2)}</span>
          <button className="expand-btn">
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="order-details">
          <div className="order-items">
            <h4>Order Items</h4>
            {order.items.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-info">
                  <span className="item-name">
                    {item.menuItem?.name || 'Unknown Item'}
                  </span>
                  <span className="item-category">
                    {item.menuItem?.category}
                  </span>
                </div>
                <div className="item-quantity">
                  <span>Qty: {item.quantity}</span>
                  <span className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="status-update">
            <label>Update Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => handleStatusChange(e.target.value)}
              className={`status-select ${getStatusClass(selectedStatus)}`}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;