import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const BASE_URL = process.env.REACT_APP_BASE_URL;


function Internship() {
  const [internship, setInternship] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(BASE_URL+'/internship')
      .then(response => response.json())
      .then(data => {
        // Assuming the structure is under responseDetails array
        if (data && data.responseDetails) {
            setInternship(data.responseDetails);
            // console.log(data.responseDetails)

        } else {
          console.error('Invalid data structure from API');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="student-cards bg-gray-900 p-4">
      <p className="text text-white m-auto w-fit font-bold text-lg my-5 cursor-pointer border-2 border-white p-2 rounded-md" onClick={()=>{navigate('/uploadInternshipDetails');}}>Add Internship Students</p>
      <h2 className="text-3xl font-bold text-white mb-8 text-center">Internship Students</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {internship.length > 0 ? (
          internship.map(internships => (
            <div key={internships.id} className="bg-white shadow-lg p-6">
              <img
                src={internships.image}
                alt={internships.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-center">{internships.name}</h3>
              <p className="text-gray-700 mb-2 text-center">Year: {internships.year}</p>
              <p className="text-gray-700 mb-2 text-center">Department: {internships.department}</p>
              <p className="text-gray-700 mb-2 text-center">Stipend: {internships.stipend}</p>
              <p className="text-gray-700 mb-2 text-center">Company Name: {internships.companyName}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No Students found</p>
        )}
      </div>
    </div>
  );
}

export default Internship;
