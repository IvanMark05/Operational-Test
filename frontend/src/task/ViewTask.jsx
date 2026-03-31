import React, { useState } from 'react'
import { createTask, deleteTask, getTask, updateTask } from '../api/api'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import DeleteModal from './DeleteTaskModal'
import AddTaskModal from './AddTaskModal'
import UpdateTaskModal from './UpdateTaskModal'

export default function ViewTask() {
  const [modalOpen, setModalOpen] = useState(false)
  const [addTaskModal, setAddTaskModal] = useState(false)
  const [updateTaskModal, setUpdateTaskModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState(null)
  const [apiError, setApiError] = useState('')
  const queryClient = useQueryClient()

  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTask,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })

  const handleToggle = async (id, currentStatus) => {
  try {
    await updateTask(id, { completed: currentStatus })
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
    setApiError('')
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) setApiError('Task not found (404)')
      else if (error.response.status === 500) setApiError('Server error (500)')
      else setApiError(`Error: ${error.response.status}`)
    } else {
      setApiError('Network error or server not reachable')
    }
    console.error('Failed to update task', error)
  }
}

    const handleDeleteClick = (task) => {
    setSelectedTask(task)
    setModalOpen(true)
  }

  const handleUpdateClick = (task) => {
    setSelectedTask(task)
    setUpdateTaskModal(true)
  }

    const handleConfirmDelete = async () => {
  try {
    await deleteTask(selectedTask.id)
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
    setApiError('')
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) setApiError('Task not found (404)')
      else if (error.response.status === 500) setApiError('Server error (500)')
      else setApiError(`Error: ${error.response.status}`)
    } else {
      setApiError('Network error or server not reachable')
    }
    console.error('Failed to delete task', error)
  } finally {
    setModalOpen(false)
    setSelectedTask(null)
  }
}

    const handleAddTask = async (task) => {
  try {
    await createTask(task)
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
    setApiError('') // clear previous error
  } catch (error) {
    if (error.response) {
      // Axios error with response
      if (error.response.status === 404) setApiError('API not found (404)')
      else if (error.response.status === 500) setApiError('Server error (500)')
      else setApiError(`Error: ${error.response.status}`)
    } else {
      setApiError('Network error or server not reachable')
    }
    console.error('Failed to create task', error)
  }
}

    const handleUpdate = async (updatedTask) => {
  try {
    await updateTask(updatedTask.id, {
      title: updatedTask.title,
      description: updatedTask.description,
    })
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
    setApiError('')
  } catch (error) {
    if (error.response) {
      if (error.response.status === 404) setApiError('Task not found (404)')
      else if (error.response.status === 500) setApiError('Server error (500)')
      else setApiError(`Error: ${error.response.status}`)
    } else {
      setApiError('Network error or server not reachable')
    }
    console.error('Failed to update task', error)
  }
}

    const columns = ['Id', 'Title', 'Description', 'Completed', 'Options']

    if (isLoading) return <p>Loading tasks...</p>
    if (error) return <p>Error fetching tasks</p>

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: '1fr 2fr 3fr 1fr 1fr',
        alignItems: 'center',
    }

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {apiError && (
            <p style={{ color: 'red', margin: '10px 0', fontWeight: 'bold' }}>{apiError}</p>
            )}
            <h1>Task List</h1>
            <button onClick={() => setAddTaskModal(true)} 
            style={{ padding: '10px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#FFFDEB', color: '#000', fontSize: 16 }} >
              Add Task +
            </button>
            <AddTaskModal
                isOpen={addTaskModal}
                onClose={() => setAddTaskModal(false)}
                onSubmit={handleAddTask}
            />
        </div>
      <div style={{ ...gridStyle, backgroundColor: '#E8DBB3', color: '#000' }}>
      {columns.map((col) => (
        <div key={col} style={{ padding: '10px' }}>
          <strong>{col}</strong>
        </div>
      ))}
    </div>
      {data?.length === 0 && <p style={{ margin: '10px 0' }}>No tasks found</p>}
      {data?.map((task) => (
      <div key={task.id} style={{ ...gridStyle, borderBottom: '1px solid #ccc', padding: '10px 0' }}>
        <div>{task.id}</div>
        <div>{task.title}</div>
        <div>{task.description}</div>
        <div style={{ margin: 'auto' }}>
        <div style={{ position: 'relative', width: '40px', height: '20px', cursor: 'pointer' }}>
        <div
            style={{
            width: '100%',
            height: '100%',
            borderRadius: '30px',
            backgroundColor: task.completed ? '#4ade80' : '#f87171',
            position: 'absolute',
            }}
        />
        <div
            onClick={() => handleToggle(task.id, !task.completed)}
            style={{
            height: '16px',
            width: '16px',
            borderRadius: '50%',
            backgroundColor: '#fff',
            transform: task.completed ? 'translateX(20px)' : 'translateX(0)',
            transition: 'transform 0.3s',
            position: 'absolute',
            top: '2px',
            left: '2px',
            }}
        />
        </div>
        </div>
        <div>
          <button onClick={() => handleUpdateClick(task)} style={{ marginRight: '10px', cursor: 'pointer' }}>Edit</button>
          <button onClick={() => handleDeleteClick(task)} style={{ cursor: 'pointer' }}>Delete</button>
        </div>
        <UpdateTaskModal
            isOpen={updateTaskModal}
            onClose={() => setUpdateTaskModal(false)}
            onSubmit={handleUpdate}
            task={selectedTask}
        />
        <DeleteModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleConfirmDelete}
            itemName={selectedTask?.title}
        />
      </div>
    ))}
    
      
    </div>
  )
}