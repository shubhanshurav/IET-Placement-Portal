import React from 'react';
import GateStudentForm from './GateStudentForm';
import Navbar from '../../components/Navbar';

function GateStudentUploadDetails() {
  return (
    <div className="bg-gray-900 py-10 h-screen px-4">
      {/* <h1 className='text-2xl pt-6'>Placement Portal</h1> */}
      <div className='mt-[-50px] pb-6'>
       <Navbar ShowBtn = {true}/>
    </div>
      <GateStudentForm />
    </div>
  );
}

export default GateStudentUploadDetails;
