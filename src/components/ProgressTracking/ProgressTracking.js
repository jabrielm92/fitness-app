import React, { useState, useEffect } from "react";
import { db, collection, addDoc, onSnapshot, getDoc, doc, orderBy, query, deleteDoc } from "../../firebase/firebase";
import { useAuth } from "../../contexts/AuthContext";
import "./ProgressTracking.css";

function ProgressTracking() {
  const [progressDate, setProgressDate] = useState("");
  const [completedExercises, setCompletedExercises] = useState([]);
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState("");
  const [workoutPlanExercises, setWorkoutPlanExercises] = useState([]);
  const [savedProgress, setSavedProgress] = useState([]);
  const [allExercises, setAllExercises] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const exercisesRef = collection(db, "users", currentUser.uid, "exercises");
      const unsubscribe = onSnapshot(exercisesRef, (snapshot) => {
        setAllExercises(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      });
  
      return () => unsubscribe();
    }
  }, [currentUser]);
  
  useEffect(() => {
    if (currentUser) {
      const workoutPlansRef = collection(db, "users", currentUser.uid, "workoutPlans");
      const unsubscribe = onSnapshot(workoutPlansRef, (snapshot) => {
        setWorkoutPlans(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      });

      const progressRef = collection(db, "users", currentUser.uid, "progress");
      const q = query(progressRef, orderBy("date", "desc"));
      const unsubscribeProgress = onSnapshot(q, (snapshot) => {
        setSavedProgress(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      });

      return () => {
        unsubscribe();
        unsubscribeProgress();
      };
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchWorkoutPlanExercises = async () => {
      if (selectedWorkoutPlan) {
        const workoutPlanDoc = await getDoc(
          doc(collection(db, "users", currentUser.uid, "workoutPlans"), selectedWorkoutPlan)
        );

        if (workoutPlanDoc.exists()) {
          const exerciseIds = workoutPlanDoc.data().exercises;
          const exerciseDocs = await Promise.all(
            exerciseIds.map((id) =>
              getDoc(doc(collection(db, "users", currentUser.uid, "exercises"), id))
            )
          );
          setWorkoutPlanExercises(
            exerciseDocs.map((exerciseDoc) => ({
              id: exerciseDoc.id,
              data: exerciseDoc.data(),
            }))
          );
        }
      }
    };

    fetchWorkoutPlanExercises();
  }, [currentUser, selectedWorkoutPlan]);

  const handleExerciseChange = (exerciseId) => {
    if (completedExercises.includes(exerciseId)) {
      setCompletedExercises(completedExercises.filter((id) => id !== exerciseId));
    } else {
      setCompletedExercises([...completedExercises, exerciseId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "users", currentUser.uid, "progress"), {
        date: progressDate,
        completedExercises,
      });
      setProgressDate("");
      setCompletedExercises([]);
    } catch (error) {
      console.error("Error tracking progress", error);
    }
  };

  const handleRemoveProgress = async (progressId) => {
    try {
      await deleteDoc(doc(db, "users", currentUser.uid, "progress", progressId));
    } catch (error) {
      console.error("Error removing progress", error);
    }
  };

  return (
    <div className="progressTracking">
      <h2>Track Progress</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          value={progressDate}
          onChange={(e) => setProgressDate(e.target.value)}
        />
        <div className="workoutPlanSelection">
          <label htmlFor="workoutPlan">Choose workout plan:</label>
          <br></br>
          <select
            id="workoutPlan"
            value={selectedWorkoutPlan}
            onChange={(e) => setSelectedWorkoutPlan(e.target.value)}
          >
            <option value="">Select a workout plan</option>
            {workoutPlans.map((workoutPlan) => (
              <option key={workoutPlan.id} value={workoutPlan.id}>
                {workoutPlan.data.name}
              </option>
            ))}
          </select>
        </div>
        <div className="completedExercises">
          {workoutPlanExercises.map((exercise) => (
            <div key={exercise.id}>
              <input
                type="checkbox"
                id={exercise.id}
                checked={completedExercises.includes(exercise.id)}
                onChange={() => handleExerciseChange(exercise.id)}
              />
              <label htmlFor={exercise.id}>{exercise.data.name}</label>
            </div>
          ))}
        </div>
        <button type="submit">Save Progress</button>
      </form>
      <div className="savedProgress">
        <h3>Saved Progress</h3>
        {savedProgress.map((progress) => (
  <div key={progress.id} className="progressEntry">
    <p>Date: {new Date(progress.data.date).toLocaleDateString()}</p>
    <ul>
      {progress.data.completedExercises.map((exerciseId) => {
        const exercise = allExercises.find(
          (exercise) => exercise.id === exerciseId
        );
        return <li key={exerciseId}>{exercise?.data.name}</li>;
      })}
    </ul>
    <button onClick={() => handleRemoveProgress(progress.id)}>Remove</button>
  </div>
))}
      </div>
    </div>
  );
}

export default ProgressTracking;