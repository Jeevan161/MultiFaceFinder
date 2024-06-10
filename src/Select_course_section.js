import React, { useState, useEffect } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Button, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function App() {
  const classes = useStyles();
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState('');
  const [studentDetails, setStudentDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch course data from the API endpoint
    fetch('https://gzr9dtpdc9.execute-api.us-east-1.amazonaws.com/DEV/get_course_details')
      .then(response => response.json())
      .then(data => {
        // Extract course names and sections from the API response
        const extractedCourses = Object.values(data).map(course => ({
          courseName: course.course_name,
          sections: course.section
        }));
        setCourses(extractedCourses);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Handler function to update sections when a course is selected
  const handleCourseChange = (event) => {
    const selectedCourseName = event.target.value;
    setSelectedCourse(selectedCourseName);
    const selectedCourseSections = courses.find(course => course.courseName === selectedCourseName)?.sections || [];
    setSections(selectedCourseSections);
  };

  // Handler function to update selected section
  const handleSectionChange = (event) => {
    const selectedSection = event.target.value;
    setSelectedSection(selectedSection);
  };

  // Handler function for form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Prepare payload
    const payload = {
      section_number: sections
    };

    // Send POST request to API endpoint
    fetch('https://gzr9dtpdc9.execute-api.us-east-1.amazonaws.com/DEV/get_student_details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      if (data.students && data.students.length > 0) {
        setStudentDetails(data.students);
      } else {
        // No students present in the section
        setStudentDetails([]);
      }
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching student details:', error);
      setLoading(false);
    });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" gutterBottom>Course Selection</Typography>
      <form onSubmit={handleSubmit}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="courseSelectLabel">Select Course</InputLabel>
          <Select
            labelId="courseSelectLabel"
            id="courseSelect"
            value={selectedCourse}
            onChange={handleCourseChange}
            label="Select Course"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {courses.map((course, index) => (
              <MenuItem key={index} value={course.courseName}>{course.courseName}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel id="sectionSelectLabel">Select Section</InputLabel>
          <Select
            labelId="sectionSelectLabel"
            id="sectionSelect"
            multiple
            value={sections}
            onChange={(e) => setSections(Array.from(e.target.selectedOptions, option => option.value))}
            label="Select Section"
          >
            {sections.map((section, index) => (
              <MenuItem key={index} value={section}>{section}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <Button variant="contained" color="primary" className={classes.button} type="submit">
          Submit
        </Button>
      </form>

      {loading ? (
        <CircularProgress />
      ) : (
        studentDetails.length > 0 && (
          <div>
            <Typography variant="h4" gutterBottom>Student Details</Typography>
            <List>
              {studentDetails.map((student, index) => (
                <ListItem key={index}>
                  <ListItemText primary={`Name: ${student.name}, ID: ${student.id}`} />
                </ListItem>
              ))}
            </List>
          </div>
        )
      )}
    </Container>
  );
}

export default App;
