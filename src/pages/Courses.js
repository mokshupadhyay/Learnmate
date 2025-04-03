import React, { useEffect, useState } from 'react';
import CourseSection from '../components/Courses1';
import { Footer1 } from '../components/Footer1';
function Courses() {
  const [courses, setCourses] = useState([]);
  // const [searchResults, setSearchResults] = useState([]);


  useEffect(() => {
    fetchAllCourses();
  }, []);

  

  const fetchAllCourses = () => {
    fetch("http://localhost:3001/api/courses")
      .then((response) => response.json())
      .then((data) => {
        setCourses(data);
        console.log(data);
        // setSearchResults(data);
      })
      .catch((error) => console.error("Error fetching course data:", error));
  };

  return (
    <div>
      <CourseSection
        sectionName="Course Section"
        initialVisibleCourses={20}
        loadMoreIncrement={15}
        fetchDataEffect={fetchAllCourses} // Pass the fetch function directly
        courses={courses}
        listclass={true}
        showSearchBar={true}
        // colindex={5}
        // searchResults={searchResults}
      />
      <Footer1/>
    </div>
  );
}

export default Courses;



// import React, { useEffect, useState } from 'react';
// import CourseSection from '../components/Courses1';

// function Courses() {
//   const [courses, setCourses] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     fetchAllCourses();
//   }, []);

//   const fetchAllCourses = () => {
//     fetch("http://localhost:3001/api/courses")
//       .then((response) => response.json())
//       .then((data) => {
//         setCourses(data);
//         setSearchResults(data);
//       })
//       .catch((error) => console.error("Error fetching course data:", error));
//   };

//   return (
//     <div>
//       <CourseSection
//         sectionName="Bestseller Courses"
//         initialCourses={courses}
//         initialSearchResults={searchResults}
//         loadMoreIncrement={4}
//       />
//     </div>
//   );
// }

// export default Courses;
