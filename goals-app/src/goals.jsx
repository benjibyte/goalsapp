import React, { useState } from 'react';
import { Card, CardContent, CardActions, Typography, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

// Goal Card, (not the goal itself)
const GoalCard = ({ goal, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [progress, setProgress] = userState(goal.progress);
  const [notes, setNotes] = useState(goal.notes || '');
  
  const handleSave() => {
    // Double check input before saving, to prevent user 
    // from entering more than max. I plan on changing this later, but 100 should do for now
    const maxInput = 100;
    const safeProgress = Math.min(maxInput, Math.max(0, parseInt(progress) || 0));
    onUpdate(goal.id, { progress })
  }
} 
