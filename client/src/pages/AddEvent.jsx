import { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext';
import hero from "../assets/hero.jpg";

export default function AddEvent() {
  const {user} = useContext(UserContext);
  const [formData, setFormData] = useState({

    owner: user? user.name : "",
    title: "",
    optional:"",
    description: "",
    organizedBy: "",
    eventDate: "",
    eventTime: "",
    location: "",
    ticketPrice: 0,
    image: '',
    likes: 0
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({ ...prevState, image: file }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/createEvent", formData)
      .then((response) => {
        console.log("Event posted successfully:", response.data);
        
      })
      .catch((error) => {
        console.error("Error posting event:", error);
      });
  };

  return (
    <div className='flex flex-col items-center mt-0'>
      <div
        className='w-full h-40 sm:h-52 lg:h-60 bg-cover bg-center relative'
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className='absolute inset-0 bg-black/30' />
        <div className='relative h-full flex items-end px-6 sm:px-10 pb-4'>
          <h1 className='text-white text-xl sm:text-2xl font-bold'>Create an Event</h1>
        </div>
      </div>
      <div className='w-full max-w-3xl bg-white rounded-xl shadow-sm ring-1 ring-gray-100 p-6 -mt-6 sm:-mt-8 mx-4'>
        <h1 className='font-bold text-2xl mb-6 text-primarydark'>Event Details</h1>
      
      <form onSubmit={handleSubmit} className='flex flex-col'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
        <label className='flex flex-col'>
          Title:
          <input
            type="text"
            name="title"
            className=' rounded mt-2 pl-5 px-4 ring-1 ring-gray-200 h-10 focus:ring-primary outline-none'
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Optional:
          <input
            type="text"
            name="optional"
            className=' rounded mt-2 pl-5 px-4 ring-1 ring-gray-200 h-10 focus:ring-primary outline-none'
            value={formData.optional}
            onChange={handleChange}
          />
        </label >
        <label className='flex flex-col'>
          Description:
          <textarea
            name="description"
            className=' rounded mt-2 pl-5 px-4 py-2 ring-1 ring-gray-200 h-24 focus:ring-primary outline-none'
            value={formData.description}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Organized By:
          <input
            type="text"
            className=' rounded mt-2 pl-5 px-4 ring-1 ring-gray-200 h-10 focus:ring-primary outline-none'
            name="organizedBy"
            value={formData.organizedBy}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Event Date:
          <input
            type="date"
            className=' rounded mt-2 pl-5 px-4 ring-1 ring-gray-200 h-10 focus:ring-primary outline-none'
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Event Time:
          <input
            type="time"
            name="eventTime"
            className=' rounded mt-2 pl-5 px-4 ring-1 ring-gray-200 h-10 focus:ring-primary outline-none'
            value={formData.eventTime}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Location:
          <input
            type="text"
            name="location"
            className=' rounded mt-2 pl-5 px-4 ring-1 ring-gray-200 h-10 focus:ring-primary outline-none'
            value={formData.location}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Ticket Price:
          <input
            type="number"
            name="ticketPrice"
            className=' rounded mt-2 pl-5 px-4 ring-1 ring-gray-200 h-10 focus:ring-primary outline-none'
            value={formData.ticketPrice}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Image:
          <input
            type="file"
            name="image"
            
            className=' rounded mt-2 pl-5 px-4 py-2 ring-1 ring-gray-200 h-10 focus:ring-primary outline-none'
            onChange={handleImageUpload}
          />
        </label >
        <div className='sm:col-span-2 flex justify-end'>
          <button className='primary' type="submit">Create</button>
        </div>
        </div>
        
      </form>
      </div>
    </div>
  );
}
