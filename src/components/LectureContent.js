// LectureContent.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './LectureContent.css'; // Import the CSS file for styles
// ... (existing imports)

const LectureContent = () => {
  const { lectureId } = useParams();
  const [lecture, setLecture] = useState(null);
  const [videoLink, setVideoLink] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLectureDetails();
  }, [lectureId]);

  const fetchLectureDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/lectures/${lectureId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLecture(data);
      fetchVideoLink(data);
    } catch (error) {
      console.error('Error fetching lecture details:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchVideoLink = async (lectureDetails) => {
    try {
      const response = await fetch(`http://localhost:3001/api/lectures/${lectureDetails.lecture_id}/video`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setVideoLink(data.videoLink);
    } catch (error) {
      console.error('Error fetching video link:', error);
      setError(error);
    }
  };

  const goToPreviousLecture = () => {
    // Assuming lectures have sequential IDs
    const previousLectureId = parseInt(lectureId, 10) - 1;
    // Redirect to the previous lecture
    // You can use React Router to navigate to the previous lecture
    // Replace this line with your actual navigation logic
    window.location.href = `/lectures/${previousLectureId}`;
  };

  const goToNextLecture = () => {
    // Assuming lectures have sequential IDs
    const nextLectureId = parseInt(lectureId, 10) + 1;
    // Redirect to the next lecture
    // You can use React Router to navigate to the next lecture
    // Replace this line with your actual navigation logic
    window.location.href = `/lectures/${nextLectureId}`;
  };

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error || !lecture || !videoLink) {
    return <div className="error-message">Error: Lecture details not found</div>;
  }

  return (
    <div className='lecturepage'>
      <div className="lecture-content">
        <div className="video-container">
          <h2 className="lecture-name">{lecture.lecture_name}</h2>
          <p className="lecture-timing">Duration: {lecture.lecture_duration}</p>
          <div dangerouslySetInnerHTML={{ __html: videoLink }} />
        </div>
        <div className="navigation-buttons">
          <button onClick={goToPreviousLecture}>Previous Lecture</button>
          <button onClick={goToNextLecture}>Next Lecture</button>
        </div>
      </div>
    </div>
  );
};

export default LectureContent;
