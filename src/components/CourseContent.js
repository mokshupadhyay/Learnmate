import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { MdOutlineOndemandVideo } from 'react-icons/md';


const CourseContentContainer = styled.div`
  background-color: #ffffff;
  max-width: 700px;
`;

const CourseSection = styled.div`
  background-color: #f7f9fa;
  border: 1px solid #ccc;
  margin: -1px;
`;

const SectionTitle = styled.h2`
  margin: 14px 0;
  margin-left: 25px;
  color: #2d2f31;
  font-family: var(--font-stack-heading);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02rem;
  font-size: 1.11rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ArrowIcon = styled.span`
  margin-right: 15px;
  transform-origin: middle;

  ${(props) =>
    props.isOpen &&
    `
    animation: none;
    transform: rotate(180deg);
  `}
`;

const LectureContainer = styled.div`
  background-color: white;
  border-top: 1px solid #ccc;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LectureItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;


const LectureDuration = styled.p`
  font-size: 12.5px;
  margin: 5px 0;
  color: #666;
  font-family: 'Arial', sans-serif; /* Apply a font-family for LectureDuration */
`;

const LectureTitle = styled.h3`
  font-weight: 400;
  line-height: 1;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 0.5em;
  margin: 10px 0;
  margin-left: 45px;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: auto;
  text-align: left;
  letter-spacing: 0.4px;
  white-space: normal;
  font-family: 'Roboto'; /* Apply a font-family for LectureTitle */
  color: rgba(0, 0, 0, 0.67);
`;


function CourseContent({ courseId }) {
  const [sections, setSections] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [openSections, setOpenSections] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSections(courseId);
    fetchLectures(courseId);
  }, [courseId]);

  const fetchSections = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/courses/${courseId}/sections`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSections(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sections:', error);
      setError(error);
      setLoading(false);
    }
  };

  const fetchLectures = async (courseId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/courses/${courseId}/lectures`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setLectures(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching lectures:', error);
      setError(error);
      setLoading(false);
    }
  };

  const toggleSection = (sectionId) => {
    setOpenSections((prevState) => ({
      ...prevState,
      [sectionId]: !prevState[sectionId],
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: Unable to fetch course content</div>;
  }

  return (
    <CourseContentContainer>
      {sections.map((section, index) => (
        <CourseSection key={`section-${index}`}>
          <SectionTitle onClick={() => toggleSection(section.section_id)}>
            <ArrowIcon isOpen={openSections[section.section_id]}>⌄</ArrowIcon>
            {section.section_name}
          </SectionTitle>
          {openSections[section.section_id] && (
            <LectureContainer>
              {lectures
                .filter((lecture) => lecture.section_id === section.section_id)
                .map((lecture, index) => (
                  <LectureItem key={`lecture-${index}`}>
                    <Link className="linkcourse" to={`/lectures/${lecture.lecture_id}`}>
                      <LectureTitle>
                        <MdOutlineOndemandVideo size={20} style={{ marginRight: '10px' }} />
                        <p>{lecture.lecture_name}</p>
                      </LectureTitle>
                    </Link>

                    <LectureDuration>
                      Duration: {lecture.lecture_duration}
                    </LectureDuration>
                  </LectureItem>
                ))}
            </LectureContainer>
          )}
        </CourseSection>
      ))}
    </CourseContentContainer>
  );
}

export default CourseContent;


