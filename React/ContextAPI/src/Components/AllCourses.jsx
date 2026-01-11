import React from 'react'
import Course from './Course'
const AllCourses = ({courseData}) => {
  return (
    <div>
        <Course courseData={courseData} />
        <Course courseData={courseData} />
        <Course courseData={courseData} />
        <Course courseData={courseData} />
    </div>
  )
}

export default AllCourses