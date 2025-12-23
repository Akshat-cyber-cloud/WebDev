import React from 'react'
import Card from './Components/Card'

const App = () => {
  const jobs = [
    {
      id: 1,
      company: "Amazon",
      days: "5 days ago",
      role: "Senior UI/UX Designer",
      type: "Part-Time",
      level: "Senior Level",
      salary: "$120/hr",
      location: "Mumbai, India",
      logo:
        "https://imgs.search.brave.com/REe0R4SMVRktnZaPCnB14N7BvtuBma7k6Vw1VjtT_5o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG40/Lmljb25maW5kZXIu/Y29tL2RhdGEvaWNv/bnMvY2lyY2xlLXBh/eW1lbnQvMzIvcGF5/bWVudF8wMDYtYW1h/em9uLTEyOC5wbmc",
    },

    {
      id: 2,
      company: "Google",
      days: "2 days ago",
      role: "Product Designers",
      type: "Full Time",
      level: "Mid Level",
      salary: "$100/hr",
      location: "Bangalore, India",
      logo:
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
    },

    {
      id: 3,
      company: "Microsoft",
      days: "1 week ago",
      role: "UX Researcher",
      type: "Remote",
      level: "Senior Level",
      salary: "$110/hr",
      location: "Hyderabad, India",
      logo:
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
  ]


  return (
    <div className='bg-black min-h-screen flex items-center justify-center' >
      <div className='flex flex-row flex-nowrap justify-center items-start gap-8'>
        {jobs.map((job,index) => (
          <Card 
          key={job.id}
          company={job.company}
          days={job.days}
          role={job.role}
          type={job.type}
          level={job.level}
          salary={job.salary}
          location={job.location}
          logo={job.logo}
          /> 
        ))}
      </div>
    </div>
  )
}

export default App