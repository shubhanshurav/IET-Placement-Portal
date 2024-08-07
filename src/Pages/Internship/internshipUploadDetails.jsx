import React from 'react';
import InternshipStudentForm from './InternshipStudentForm';
import Navbar from '../../components/Navbar';

function InternshipUploadDetails() {
  return (
    <div className="bg-gray-900 py-10 h-screen px-4">
      {/* <h1 className='text-2xl pt-6'>Placement Portal</h1> */}
      <div className='mt-[-50px] pb-6'>
       <Navbar ShowBtn = {false} />
      </div>
      <InternshipStudentForm />
    </div>
  );
}

export default InternshipUploadDetails;
