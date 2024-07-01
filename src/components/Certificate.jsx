import React, { useState, useEffect } from 'react';
const BASE_URL = process.env.REACT_APP_BASE_URL;


function Certificate() {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    fetch(BASE_URL+'/certificates')
      .then(response => response.json())
      .then(data => {
        // Assuming the structure is under responseDetails array
        if (data && data.responseDetails) {
            setCertificates(data.responseDetails);
          console.log(data.responseDetails)

        } else {
          console.error('Invalid data structure from API');
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="student-cards p-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Students Certificates</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {certificates.length > 0 ? (
          certificates.map(certificate => (
            <div key={certificate.id} className="bg-white shadow-lg p-6">
              <img
                src={certificate.image}
                alt={certificate.name}
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2 text-center">{certificate.name}</h3>
              <p className="text-gray-700 mb-2 text-center">Certificate Name: {certificate.certificateName}</p>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full">No Certificates found</p>
        )}
      </div>
    </div>
  );
}

export default Certificate;
