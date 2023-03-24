import React, { useState, useEffect } from 'react';
import { db, collection, onSnapshot, deleteDoc, doc } from '../../firebase/firebase';
import { useAuth } from '../../contexts/AuthContext';
import './SavedExercises.css';
import ExerciseCard from '../ExerciseCard/ExerciseCard';
import ExerciseGif from '../ExerciseGif/ExerciseGif';

function SavedExercises() {
  const [savedExercises, setSavedExercises] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const exercisesRef = collection(db, 'users', currentUser.uid, 'exercises');
      const unsubscribe = onSnapshot(exercisesRef, (snapshot) => {
        setSavedExercises(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleRemove = async (exerciseId) => {
    try {
      await deleteDoc(doc(db, 'users', currentUser.uid, 'exercises', exerciseId));
    } catch (error) {
      console.error('Error removing exercise', error);
    }
  };

  return (
    <div className="savedExercises">
      <h2>Saved Exercises</h2>
      <div className="exercise-card-container">
        {savedExercises.map((exercise) => (
          <div key={exercise.id} className="exerciseItem">
            <ExerciseCard exercise={exercise.data} />
            <ExerciseGif exerciseName={exercise.data.name} />
            <button onClick={() => handleRemove(exercise.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SavedExercises;


