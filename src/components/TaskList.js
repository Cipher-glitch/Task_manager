// src/components/TaskList.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, deleteTask, updateTask } from '../store/taskSlice';
import {
  Box, Card, Typography, Chip, IconButton, Dialog,
  TextField, Select, MenuItem, Button, FormControl,
  InputLabel
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.items);
  const status = useSelector(state => state.tasks.status);
  const [editTask, setEditTask] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(id));
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
    setOpenDialog(true);
  };

  const handleUpdate = () => {
    dispatch(updateTask({ id: editTask.id, taskData: editTask }));
    setOpenDialog(false);
    setEditTask(null);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Tasks
      </Typography>
      {tasks.map((task) => (
        <Card key={task.id} sx={{ mb: 2, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h6">{task.title}</Typography>
              <Typography color="textSecondary">{task.description}</Typography>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <Chip 
                  label={task.status} 
                  color={task.status === 'completed' ? 'success' : 'warning'} 
                />
                <Chip label={task.priority} />
              </Box>
            </Box>
            <Box>
              <IconButton onClick={() => handleEdit(task)}>
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
            </Box>
          </Box>
        </Card>
      ))}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <Box sx={{ p: 3, minWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            Edit Task
          </Typography>
          {editTask && (
            <>
              <TextField
                fullWidth
                label="Title"
                value={editTask.title}
                onChange={(e) => setEditTask({...editTask, title: e.target.value})}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                value={editTask.description}
                onChange={(e) => setEditTask({...editTask, description: e.target.value})}
                margin="normal"
                multiline
                rows={3}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select
                  value={editTask.status}
                  onChange={(e) => setEditTask({...editTask, status: e.target.value})}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="in_progress">In Progress</MenuItem>
                  <MenuItem value="completed">Completed</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel>Priority</InputLabel>
                <Select
                  value={editTask.priority}
                  onChange={(e) => setEditTask({...editTask, priority: e.target.value})}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                <Button variant="contained" onClick={handleUpdate}>Save</Button>
              </Box>
            </>
          )}
        </Box>
      </Dialog>
    </Box>
  );
}

export default TaskList;