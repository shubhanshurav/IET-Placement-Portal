import React, { useState, useEffect } from 'react';
const BASE_URL = process.env.REACT_APP_BASE_URL;


function GateStudent() {
  const [gateStudent, setGateStudent] = useState([]);

  useEffect(() => {
    fetch(BASE_URL+'/gate')
      .then(response => response.json())
      .then(data => {
        // Assuming the structure is under responseDetails array
        if (data && data.responseDetails) {
            setGateStudent(data.responseDetails);
          console.log(data.responseDetails)

        } else {
          console.error('Invalid data structure from API');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="student-cards p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Gate Qualify Students</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {gateStudent.length > 0 ? (
          gateStudent.map(gateStudents => (
            <div key={gateStudents.id} className="bg-white shadow-lg p-6">
              <img
                src={gateStudents.image}
                alt={gateStudents.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-center">{gateStudents.name}</h3>
              <p className="text-gray-700 mb-2 text-center">Year: {gateStudents.year}</p>
              <p className="text-gray-700 mb-2 text-center">Department: {gateStudents.department}</p>
              <p className="text-gray-700 mb-2 text-center">Rank: {gateStudents.rank}</p>
              <p className="text-gray-700 mb-2 text-center">Score: {gateStudents.score}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No Students found</p>
        )}
      </div>
    </div>
  );
}

export default GateStudent;
