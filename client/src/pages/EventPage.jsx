import axios from "axios";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { AiFillCalendar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { FaCopy, FaWhatsappSquare, FaFacebook } from "react-icons/fa";

export default function EventPage() {
  const {id} = useParams();
  const [event, setEvent] = useState(null);

  //! Fetching the event data from server by ID ------------------------------------------
  useEffect(()=>{
    if(!id){
      return;
    }
    axios.get(`/event/${id}`).then(response => {
      setEvent(response.data)
    }).catch((error) => {
      console.error("Error fetching events:", error);
    });
  }, [id])

  //! Copy Functionalities -----------------------------------------------
  const handleCopyLink = () => {
    const linkToShare = window.location.href;
    navigator.clipboard.writeText(linkToShare).then(() => {
      alert('Link copied to clipboard!');
    });
  };

  const handleWhatsAppShare = () => {
    const linkToShare = window.location.href;
    const whatsappMessage = encodeURIComponent(`${linkToShare}`);
    window.open(`whatsapp://send?text=${whatsappMessage}`);
  };

  const handleFacebookShare = () => {
    const linkToShare = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(linkToShare)}`;
    window.open(facebookShareUrl);
  };
  
if (!event) return '';

  const imageUrl = event.image
    ? event.image.startsWith('uploads/')
      ? `http://localhost:4000/api/${event.image.replace('uploads/', '')}`
      : event.image
    : "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1920&auto=format&fit=crop";

  return (
    <div className="flex flex-col flex-grow">
      {/* Hero with event image */}
      <div
        className="w-full h-56 sm:h-64 lg:h-80 bg-cover bg-center relative rounded-2xl overflow-hidden"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />
        <div className="relative h-full w-full flex items-end p-6 sm:p-8">
          <div className="text-white">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold drop-shadow leading-tight">{event.title}</h1>
            <div className="mt-2 text-sm md:text-base font-semibold text-gray-100/90">{event.eventDate.split("T")[0]} • {event.eventTime}</div>
          </div>
          <div className="ml-auto">
            <Link to={'/event/'+event._id+ '/ordersummary'}>
              <button className="primary text-lg px-6 py-3">Book Ticket</button>
            </Link>
          </div>
        </div>
      </div>

      {/* Event Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Event Info Card */}
          <div className="bg-white rounded-xl ring-1 ring-gray-100 shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">{event.title}</h1>
              <div className="text-right">
                <div className="text-2xl font-bold text-primarydark">{event.ticketPrice === 0? 'Free' : '₹. '+ event.ticketPrice}</div>
                <div className="text-sm text-gray-500">per ticket</div>
              </div>
            </div>
            <div className="text-gray-700 leading-relaxed">{event.description}</div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="text-sm text-gray-600">Organized by <span className="font-semibold text-gray-800">{event.organizedBy}</span></div>
            </div>
          </div>

          {/* When and Where Card */}
          <div className="bg-white rounded-xl ring-1 ring-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">When and Where</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <AiFillCalendar className="w-6 h-6 text-primarydark" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Date and Time</h3>
                  <div className="text-gray-700 mt-1">
                    <div className="font-medium">{event.eventDate.split("T")[0]}</div>
                    <div className="text-sm text-gray-500">{event.eventTime}</div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MdLocationPin className="w-6 h-6 text-primarydark" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <div className="text-gray-700 mt-1">{event.location}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Share Card */}
          <div className="bg-white rounded-xl ring-1 ring-gray-100 shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Share with friends</h2>
            <div className="flex gap-4">
              <button onClick={handleCopyLink} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <FaCopy className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={handleWhatsAppShare} className="p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                <FaWhatsappSquare className="w-5 h-5 text-green-600" />
              </button>
              <button onClick={handleFacebookShare} className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <FaFacebook className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl ring-1 ring-gray-100 shadow-sm p-6 sticky top-24">
            <h3 className="text-lg font-bold mb-4">Ready to attend?</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ticket Price</span>
                <span className="font-semibold">{event.ticketPrice === 0? 'Free' : '₹. '+ event.ticketPrice}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Event Date</span>
                <span className="font-semibold">{event.eventDate.split("T")[0]}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Event Time</span>
                <span className="font-semibold">{event.eventTime}</span>
              </div>
            </div>
            <Link to={'/event/'+event._id+ '/ordersummary'} className="block">
              <button className="primary w-full text-center py-3 text-lg">Book Ticket Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
