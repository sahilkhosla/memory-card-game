import { Box, Button, List, Paper, Stack } from '@mui/material';
import React, { useState } from 'react';
import { TodoListItem } from './TodoListItem';

export const TodoList = ({ tasks, updateTask, deleteTask, toggleTask }) => {

  const [filter, setFilter] = useState('active');

  const onButtonClick = (filterName) => () => {
    setFilter(filterName)
  }
  
  return (
    <Paper
      square={true}
      sx={{ marginTop: 2 }}
    >
      <List>
        {
          tasks.filter((task) => {
            return (filter === 'active' && !task.deleted)
              || (filter === 'deleted'&& task.deleted)
              || (filter === 'completed' && task.done)
              || (filter) === 'all'              
          }).map(task => (
              <TodoListItem 
                key={task.id}
                id={task.id}
                done={task.done}
                description={task.description}
                updateTask={updateTask}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
              />
            )
          )
        }
      </List>
      <Box sx={{ padding: 1 }}>
        <Stack direction="row" justifyContent="center">
          <Button
            onClick={onButtonClick('all')}
            variant={filter === 'all' ? 'outlined' : 'text'}
          >
            All
          </Button>
          <Button
            onClick={onButtonClick('active')}
            variant={filter === 'active' ? 'outlined' : 'text'}
          >
            Active
          </Button>
          <Button 
            onClick={onButtonClick('deleted')}
            variant={filter === 'deleted' ? 'outlined' : 'text'}
          >
            Deleted
          </Button>
          <Button 
            onClick={onButtonClick('completed')}
            variant={filter === 'completed' ? 'outlined' : 'text'}
          >
            Completed
          </Button>
        </Stack>
      </Box>
    </Paper>
  )
}