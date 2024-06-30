import React from 'react';
import Certificates from './Certificates';
import { certificates } from '../data/certificates';

const CertificationSection = () => {
  
  return (
    <div className="container mx-auto px-2 py-8 bg-slate-950">
      <h2 className="text-3xl font-bold mb-6 text-center">Certifications</h2>
      <div className="flex flex-wrap justify-center">
        {certificates.map((cert, index) => (
          <Certificates
            key={index}
            imageUrl={cert.imageUrl}
            title={cert.name}
            description={cert.description}
          />
        ))}
      </div>
    </div>
  );
};

export default CertificationSection;
