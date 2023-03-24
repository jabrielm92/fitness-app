import React from 'react';
import './ExerciseCard.css';

const ExerciseCard = ({ exercise }) => {
  return (
    <div className="exercise-card">
      <h3>{exercise.name}</h3>
      <p>Type: {exercise.type}</p>
      <p>Muscle: {exercise.muscle}</p>
      <p>Equipment: {exercise.equipment}</p>
      <p>Difficulty: {exercise.difficulty}</p>
      <p>Instructions: {exercise.instructions}</p>
    </div>
  );
};

export default ExerciseCard;