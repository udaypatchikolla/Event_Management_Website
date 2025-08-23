import axios from 'axios';
import { useEffect, useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import bookingHeroUrl from '../assets/ordersummary.webp';
export default function OrderSummary() {
    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  
    useEffect(()=>{
      if(!id){
        return;
      }
      axios.get(`/event/${id}/ordersummary`).then(response => {
        setEvent(response.data)
      }).catch((error) => {
        console.error("Error fetching events:", error);
      });
    }, [id])
    
    //! Handle checkbox change
    const handleCheckboxChange = (e) => {
      setIsCheckboxChecked(e.target.checked)
    }
  
    if (!event) return '';
    // const bookingHeroUrl = "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1920&auto=format&fit=crop";

    return (
      <div className="flex flex-col">
        {/* Booking Hero */}
        <div
          className="w-full h-40 sm:h-48 lg:h-56 bg-cover bg-center rounded-2xl relative overflow-hidden"
          style={{ backgroundImage: `url(${bookingHeroUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />
          <div className="relative h-full w-full flex items-end p-4 sm:p-6">
            <div className="text-white">
              <h1 className="text-xl sm:text-2xl font-extrabold drop-shadow">Secure your seat</h1>
              <div className="text-xs sm:text-sm text-gray-100/90">{event.title}</div>
            </div>
            <Link to={'/event/'+event._id} className="ml-auto">
              <button className="secondary inline-flex items-center gap-2"><IoMdArrowBack/> Back to event</button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6'> 
          {/* Terms */}
          <div className="lg:col-span-2 bg-white rounded-xl ring-1 ring-gray-100 shadow-sm p-5">
            <h2 className='text-lg font-bold'>Terms & Conditions</h2>
            <ul className="custom-list mt-3 text-sm text-gray-700 space-y-2">
              <li>Refunds are allowed up to 14 days before the event date. After that, no refunds.</li>
              <li>Tickets are delivered via email as e-tickets. Show on mobile or print for entry.</li>
              <li>Each user may purchase up to 2 tickets for this event.</li>
              <li>If the event is canceled, you will be notified and refunded automatically.</li>
              <li>Postponed events are not refunded; your ticket remains valid for the new date.</li>
              <li>Your data is protected as per our privacy policy.</li>
              <li>Review and accept these terms before proceeding to payment.</li>
            </ul>
          </div>

          {/* Summary */}
          <div className="bg-white rounded-xl ring-1 ring-gray-100 shadow-sm p-5 h-max">
            <h2 className='text-lg font-bold'>Booking Summary</h2>
            <div className='text-sm flex justify-between mt-4'>
              <div className='text-left'>{event.title}</div>
              <div className='text-right'>₹. {event.ticketPrice}</div>
            </div>
            <hr className=" my-3 border-gray-200" />
            <div className='text-sm font-bold flex justify-between'>
              <div className='text-left'>SUB TOTAL</div>
              <div className='text-right'>₹. {event.ticketPrice}</div>
            </div>
            <div className='flex items-start gap-2 mt-4'>
              <input id="accept" className='mt-1 h-4 w-4' type='checkbox' onChange={handleCheckboxChange}/>
              <label htmlFor="accept" className='text-sm'>I have verified the event name, date and time and accept the terms and conditions.</label>
            </div>
            <div className='mt-5'>
              <Link to={'/event/'+event._id+ '/ordersummary'+'/paymentsummary'}>
                <button 
                  className={`primary w-full justify-center ${!isCheckboxChecked ? 'opacity-60 cursor-not-allowed' : ''}`}
                  disabled={!isCheckboxChecked}
                >
                  Proceed to Payment
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
}
