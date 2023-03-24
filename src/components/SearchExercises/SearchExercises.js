import React, { useState } from 'react';
import axios from 'axios';
import './SearchExercises.css';
import { db, collection, addDoc } from '../../firebase/firebase';
import { useAuth } from '../../contexts/AuthContext';
import ExerciseCard from '../ExerciseCard/ExerciseCard';

function SearchExercises() {
  const [exercises, setExercises] = useState([]);

  const muscleGroups = [
    'abdominals',
    'abductors',
    'adductors',
    'biceps',
    'calves',
    'chest',
    'forearms',
    'glutes',
    'hamstrings',
    'lats',
    'lower_back',
    'middle_back',
    'neck',
    'quadriceps',
    'traps',
    'triceps',
  ];

  const searchExercises = async (muscleGroup) => {
    try {
      const url = `https://api.api-ninjas.com/v1/exercises?muscle=${muscleGroup}`;
      const headers = {
        'X-Api-Key': process.env.REACT_APP_API_KEY,
      };
      const response = await axios.get(url, { headers });
      setExercises(response.data);
    } catch (error) {
      console.error('Error searching exercises', error.toJSON());
    }
  };

  const { currentUser } = useAuth();

  const saveExercise = async (exercise) => {
    try {
      await addDoc(collection(db, 'users', currentUser.uid, 'exercises'), exercise);
    } catch (error) {
      console.error('Error saving exercise', error);
    }
  };

  return (
    <div className="searchExercises">
      <h2>Search Exercises</h2>
      <div className="muscleGroupButtons">
        {muscleGroups.map((muscleGroup) => (
          <button
            key={muscleGroup}
            onClick={() => searchExercises(muscleGroup)}
          >
            {muscleGroup}
          </button>
        ))}
      </div>
      <div className="exerciseList">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="exerciseItem">
            <ExerciseCard exercise={exercise} />
            <button onClick={() => saveExercise(exercise)}>Save</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchExercises;

