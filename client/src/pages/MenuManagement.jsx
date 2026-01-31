import React, { useState, useEffect } from 'react';
import { menuAPI } from '../services/api';
import useDebounce from '../hooks/useDebounce';
import { useToast } from '../context/ToastContext';
import MenuCard from '../components/MenuCard';
import MenuForm from '../components/MenuForm';
import './MenuManagement.css';

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searching, setSearching] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 300);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    fetchMenuItems();
  }, [categoryFilter, availabilityFilter]);

  useEffect(() => {
    if (debouncedSearch) {
      handleSearch();
    } else if (!debouncedSearch && searchQuery === '') {
      fetchMenuItems();
    }
  }, [debouncedSearch]);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const params = {};
      if (categoryFilter) params.category = categoryFilter;
      if (availabilityFilter) params.availability = availabilityFilter;

      const response = await menuAPI.getAll(params);
      setMenuItems(response.data.data);
    } catch (error) {
      showError('Failed to fetch menu items');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setSearching(true);
      const response = await menuAPI.search(debouncedSearch);
      setMenuItems(response.data.data);
    } catch (error) {
      showError('Search failed');
    } finally {
      setSearching(false);
    }
  };

  const handleAddItem = () => {
    setEditingItem(null);
    setShowModal(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowModal(true);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editingItem) {
        await menuAPI.update(editingItem._id, formData);
        showSuccess('Menu item updated successfully');
      } else {
        await menuAPI.create(formData);
        showSuccess('Menu item created successfully');
      }
      setShowModal(false);
      setEditingItem(null);
      fetchMenuItems();
    } catch (error) {
      showError(error.response?.data?.error || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      await menuAPI.delete(id);
      showSuccess('Menu item deleted successfully');
      fetchMenuItems();
    } catch (error) {
      showError('Failed to delete menu item');
    }
  };

  const handleToggleAvailability = async (id, currentAvailability) => {
    // Optimistic UI update
    setMenuItems(prev =>
      prev.map(item =>
        item._id === id ? { ...item, isAvailable: !currentAvailability } : item
      )
    );

    try {
      await menuAPI.toggleAvailability(id);
      showSuccess(
        `Menu item marked as ${!currentAvailability ? 'available' : 'unavailable'}`
      );
    } catch (error) {
      // Rollback on error
      setMenuItems(prev =>
        prev.map(item =>
          item._id === id ? { ...item, isAvailable: currentAvailability } : item
        )
      );
      showError('Failed to update availability');
    }
  };

  return (
    <div className="menu-management">
      <div className="page-header">
        <h1>Menu Management</h1>
        <button className="btn-add" onClick={handleAddItem}>
          + Add Menu Item
        </button>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          {searching && <span className="search-loading">Searching...</span>}
        </div>

        <div className="filters">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Categories</option>
            <option value="Appetizer">Appetizer</option>
            <option value="Main Course">Main Course</option>
            <option value="Dessert">Dessert</option>
            <option value="Beverage">Beverage</option>
          </select>

          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="filter-select"
          >
            <option value="">All Items</option>
            <option value="true">Available Only</option>
            <option value="false">Unavailable Only</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading menu items...</div>
      ) : menuItems.length === 0 ? (
        <div className="empty-state">
          <p>No menu items found</p>
        </div>
      ) : (
        <div className="menu-grid">
          {menuItems.map((item) => (
            <MenuCard
              key={item._id}
              item={item}
              onEdit={handleEditItem}
              onDelete={handleDelete}
              onToggleAvailability={handleToggleAvailability}
            />
          ))}
        </div>
      )}

      {showModal && (
        <MenuForm
          item={editingItem}
          onSubmit={handleSubmit}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
        />
      )}
    </div>
  );
};

export default MenuManagement;