import React, { useState, useEffect } from "react";
import axios from "axios";

function ExerciseGif({ exerciseName }) {
  const [gifUrl, setGifUrl] = useState(null);

  useEffect(() => {
    const fetchGif = async () => {
      try {
        const encodedExerciseName = exerciseName.replace(/ /g, "+");
        const response = await axios.get(
          `https://api.giphy.com/v1/stickers/search?api_key=${process.env.REACT_APP_GIPHY_API_KEY}&q=${encodedExerciseName}&limit=1&offset=0&rating=g&lang=en`
        );
        if (response.data.data.length > 0) {
          setGifUrl(response.data.data[0].images.original.url);
        }
      } catch (error) {
        console.error("Error fetching exercise GIF", error);
      }
    };

    fetchGif();
  }, [exerciseName]);

  return (
    <div>
      {gifUrl ? (
        <img src={gifUrl} alt={`${exerciseName} gif`} />
      ) : (
        <p>No GIF found for {exerciseName}</p>
      )}
    </div>
  );
}

export default ExerciseGif;

