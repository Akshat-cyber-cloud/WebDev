import React from 'react'
import Section1 from './Section1'
import Section2 from './Section2'

const AllSection = ({courseData}) => {
  console.log(courseData);
  return (
    <div>
        <Section1 />
        <Section2 courseData={courseData} />
    </div>
  )
}

export default AllSection