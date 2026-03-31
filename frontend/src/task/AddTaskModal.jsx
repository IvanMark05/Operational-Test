import React, { useState } from 'react'

export default function AddTaskModal({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSubmit = () => {
    if (!title.trim()) {
      setError('Title is required')
      return
    }

    onSubmit({ title: title.trim(), description: description.trim() })
    setTitle('')
    setDescription('')
    setError('')
    onClose()
  }

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
          width: '350px',
          textAlign: 'center',
        }}
      >
        <h2>Add Task</h2>

        <div style={{ marginTop: '15px', textAlign: 'left', color: '#fff' }}>
          <label style={{ fontWeight: 'bold' }}>Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '95%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
            placeholder="Enter task title"
          />
        </div>

        <div style={{ marginTop: '15px', textAlign: 'left', color: '#fff' }}>
          <label style={{ fontWeight: 'bold' }}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: '95%',
              padding: '8px',
              marginTop: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              minHeight: '60px',
            }}
            placeholder="Enter task description (optional)"
          />
        </div>

        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

        <div
          style={{
            marginTop: '20px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '5px',
              backgroundColor: '#ccc',
              color: '#000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: '8px 16px',
              borderRadius: '5px',
              backgroundColor: '#4ade80',
              color: '#000',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}