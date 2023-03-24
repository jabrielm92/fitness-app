import React, { useState, useEffect } from "react";
import { db, collection, addDoc, onSnapshot, doc, deleteDoc } from "../../firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";
import "./WorkoutPlan.css";

function WorkoutPlan() {
  const [workoutName, setWorkoutName] = useState("");
  const [days, setDays] = useState([]);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [savedExercises, setSavedExercises] = useState([]);
  const { currentUser } = useAuth();
  const [workoutPlans, setWorkoutPlans] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const workoutPlansRef = collection(db, "users", currentUser.uid, "workoutPlans");
      const unsubscribe = onSnapshot(workoutPlansRef, (snapshot) => {
        setWorkoutPlans(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      });
  
      return () => unsubscribe();
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      const exercisesRef = collection(db, "users", currentUser.uid, "exercises");
      const unsubscribe = onSnapshot(exercisesRef, (snapshot) => {
        setSavedExercises(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleDayChange = (day) => {
    if (days.includes(day)) {
      setDays(days.filter((d) => d !== day));
    } else {
      setDays([...days, day]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    console.log("Submitting the form"); // Debugging statement
  
    try {
      const docRef = await addDoc(collection(db, "users", currentUser.uid, "workoutPlans"), {
        name: workoutName,
        days,
        exercises: selectedExercises,
      });
      console.log("Workout plan created with ID: ", docRef.id); // Debugging statement
  
      setWorkoutName("");
      setDays([]);
      setSelectedExercises([]);
  
    } catch (error) {
      console.error("Error creating workout plan", error);
    }
  };  

  const handleExerciseChange = (exerciseId) => {
    if (selectedExercises.includes(exerciseId)) {
      setSelectedExercises(selectedExercises.filter((id) => id !== exerciseId));
    } else {
      setSelectedExercises([...selectedExercises, exerciseId]);
    }
  };

  const handleRemoveWorkoutPlan = async (workoutPlanId) => {
    try {
      await deleteDoc(doc(db, "users", currentUser.uid, "workoutPlans", workoutPlanId));
      console.log("Workout plan removed successfully");
    } catch (error) {
      console.error("Error removing workout plan", error);
    }
  };  

  return (
    <div className="workoutPlan">
      <h2>Create Workout Plan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Workout Plan Name"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
        />
        <div className="selectionContainer">
          <div className="daysSelection">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
              <div key={day}>
                <input
                  type="checkbox"
                  id={day}
                  checked={days.includes(day)}
                  onChange={() => handleDayChange(day)}
                />
                <label htmlFor={day}>{day}</label>
              </div>
            ))}
          </div>
          <div className="exercisesSelection">
            <label>Choose exercises:</label>
            <div>
              {savedExercises.map((exercise) => (
                <div key={exercise.id}>
                  <input
                    type="checkbox"
                    id={exercise.id}
                    checked={selectedExercises.includes(exercise.id)}
                    onChange={() => handleExerciseChange(exercise.id)}
                  />
                  <label htmlFor={exercise.id}>{exercise.data.name}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type="submit">Create</button>
      </form>
      <div className="workoutPlansContainer">
          <h2>Workout Plans</h2>
          {workoutPlans.map((workoutPlan) => (
            <div key={workoutPlan.id} className="profileWorkoutPlan">
              <p>{workoutPlan.data.name}</p>
              <button onClick={() => handleRemoveWorkoutPlan(workoutPlan.id)}>Remove</button>
            </div>
          ))}
        </div>
    </div>
  );
}

export default WorkoutPlan;


