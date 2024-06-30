import React from 'react';

const Certificates = ({ imageUrl, name, description }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-2">
      <img className="w-full" src={imageUrl} alt="Certificate" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Certificates;
