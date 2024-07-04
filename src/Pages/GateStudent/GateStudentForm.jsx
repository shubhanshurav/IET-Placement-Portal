import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const BASE_URL = process.env.REACT_APP_BASE_URL;

const GateStudentForm = () => {
  const [name, setName] = useState('');
  const [year, setYear] = useState('');
  const [department, setDepartment] = useState('');
  const [rank, setRank] = useState('');
  const [score, setScore] = useState('');
  const [image, setImage] = useState(null);

    // Function to reset the form fields
    const resetForm = () => {
      setName('');
      setYear('');
      setDepartment('');
      setRank('');
      setScore('');
      setImage(null);
    };
  

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('year', year);
    formData.append('department', department);
    formData.append('rank', rank);
    formData.append('score', score);
    formData.append('image', image);

    try {
      const res = await axios.post(BASE_URL+'/gate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    //   console.log(res.data.success);
      if (res.data.success) {
        toast.success('gate score details added successfully');
        resetForm();
      } else {
        toast.error('Failed to add gate score details');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while adding the gate score details');
    }
  };

  return (
    <div className="mx-auto p-4 bg-gray-100 rounded-lg shadow-md md:w-[60%] w-fit ">
      <h1 className="text-xl md:text-3xl font-bold text-black border-b-4 border-black w-fit m-auto mb-4">Student Placement Form</h1>
      <form onSubmit={onSubmit} className=''>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Year</label>
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Department</label>
          <input
            type="text"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Rank</label>
          <input
            type="text"
            value={rank}
            onChange={(e) => setRank(e.target.value)}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Score</label>
          <input
            type="text"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
          />
        </div>
      
        <div className="mb-4">
          <label className="block text-gray-700">Gate Score Card Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="w-full px-3 py-1 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default GateStudentForm;
