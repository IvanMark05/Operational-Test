import React from 'react'

export default function DeleteModal({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: '#464646',
          padding: '20px',
          borderRadius: '10px',
          width: '300px',
          textAlign: 'center',
        }}
      >
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete <strong>{itemName}</strong>?</p>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '5px',
              color: '#000000',
              backgroundColor: '#ccc',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '8px 16px',
              borderRadius: '5px',
              backgroundColor: '#f87171',
              color: '#000000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}