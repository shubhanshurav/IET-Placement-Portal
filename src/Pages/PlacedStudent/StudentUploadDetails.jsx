import React from 'react';
import StudentForm from './StudentForm';
import Navbar from '../../components/Navbar';

function StudentUploadDetails() {
  return (
    <div className="bg-gray-900 py-10 h-fit px-4">
      {/* <h1 className='text-2xl pt-6'>Placement Portal</h1> */}
      <div className='mt-[-50px] pb-6'>
       <Navbar ShowBtn = {false}/>
     </div>
      <StudentForm />
    </div>
  );
}

export default StudentUploadDetails;
