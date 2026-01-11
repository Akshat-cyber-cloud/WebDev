import React from 'react'
import AllCourses from './AllCourses'

const Section2 = ({courseData}) => {
  console.log(courseData)
  return (
    <div>
        Section2
        <AllCourses courseData={courseData} />
    </div>
  )
}

export default Section2