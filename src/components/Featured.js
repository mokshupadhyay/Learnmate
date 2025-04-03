


import React, { useEffect, useState } from 'react';
import CourseSection from '../components/Courses1';
function Featured() {
  const [courses, setCourses] = useState([]);
  const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    fetchAllCourses();
  }, []);

  

  const fetchAllCourses = () => {
    fetch("http://localhost:3001/api/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        console.log(data);
        setSearchResults(data);
      })
      .catch((error) => console.error("Error fetching course data:", error));
  };

  return (
    <div>
      <CourseSection
        sectionName="Featured Section"
        initialVisibleCourses={4}
        loadMoreIncrement={8}
        fetchDataEffect={fetchAllCourses} // Pass the fetch function directly
        courses={courses}
        listclass={false}

        showSearchBar={false}
        colindex={4}

        // searchResults={searchResults}
      />
    </div>
  );
}

export default Featured;
