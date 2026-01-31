import React, { useState, useEffect } from 'react';
import { ordersAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import OrderCard from '../components/OrderCard';
import './OrdersDashboard.css';

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  const { showSuccess, showError } = useToast();
  const limit = 10;

  useEffect(() => {
    fetchOrders();
  }, [currentPage, statusFilter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const params = {
        page: currentPage,
        limit
      };
      if (statusFilter) params.status = statusFilter;

      const response = await ordersAPI.getAll(params);
      setOrders(response.data.data);
      setTotalPages(response.data.pages);
      setTotal(response.data.total);
    } catch (error) {
      showError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await ordersAPI.updateStatus(orderId, newStatus);
      showSuccess('Order status updated successfully');
      fetchOrders();
    } catch (error) {
      showError('Failed to update order status');
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="orders-dashboard">
      <div className="page-header">
        <h1>Orders Dashboard</h1>
        <div className="stats">
          <span className="stat-item">Total Orders: {total}</span>
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="filter-select"
          >
            <option value="">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="empty-state">
          <p>No orders found</p>
        </div>
      ) : (
        <>
          <div className="orders-list">
            {orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                onStatusUpdate={handleStatusUpdate}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>

              <div className="page-numbers">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`page-number ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                className="page-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default OrdersDashboard;