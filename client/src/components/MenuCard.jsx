import React from 'react';
import './MenuCard.css';

const MenuCard = ({ item, onEdit, onDelete, onToggleAvailability }) => {
  return (
    <div className={`menu-card ${!item.isAvailable ? 'unavailable' : ''}`}>
      {item.imageUrl && (
        <div className="menu-card-image">
          <img src={item.imageUrl} alt={item.name} />
          {!item.isAvailable && (
            <div className="unavailable-overlay">Unavailable</div>
          )}
        </div>
      )}
      
      <div className="menu-card-content">
        <div className="menu-card-header">
          <h3>{item.name}</h3>
          <span className={`category-badge ${item.category.toLowerCase().replace(' ', '-')}`}>
            {item.category}
          </span>
        </div>
        
        <p className="description">{item.description}</p>
        
        {item.ingredients && item.ingredients.length > 0 && (
          <div className="ingredients">
            <strong>Ingredients:</strong> {item.ingredients.join(', ')}
          </div>
        )}
        
        <div className="menu-card-footer">
          <div className="price-section">
            <span className="price">${item.price.toFixed(2)}</span>
            {item.preparationTime && (
              <span className="prep-time">⏱ {item.preparationTime} min</span>
            )}
          </div>
          
          <div className="actions">
            <button
              className={`btn-availability ${item.isAvailable ? 'available' : 'unavailable'}`}
              onClick={() => onToggleAvailability(item._id, item.isAvailable)}
              title={item.isAvailable ? 'Mark as Unavailable' : 'Mark as Available'}
            >
              {item.isAvailable ? '✓' : '✗'}
            </button>
            <button className="btn-edit" onClick={() => onEdit(item)}>
              Edit
            </button>
            <button className="btn-delete" onClick={() => onDelete(item._id)}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;