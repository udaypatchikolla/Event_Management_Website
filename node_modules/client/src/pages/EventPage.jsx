import axios from "axios";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { AiFillCalendar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md";
import { FaCopy, FaWhatsappSquare, FaFacebook } from "react-icons/fa";
import hero from "../assets/hero.jpg";

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
    : hero;

  return (
    <div className="flex flex-col flex-grow">
      {/* Hero with event image */}
      <div
        className="w-full h-56 sm:h-64 lg:h-80 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative h-full w-full flex items-end px-6 md:px-10 xl:px-32 pb-4">
          <div className="text-white">
            <h1 className="text-2xl md:text-4xl font-extrabold drop-shadow">{event.title}</h1>
            <div className="mt-2 text-sm md:text-base font-semibold">{event.eventDate.split("T")[0]} • {event.eventTime}</div>
          </div>
          <div className="ml-auto">
            <Link to={'/event/'+event._id+ '/ordersummary'}>
              <button className="primary">Book Ticket</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-8 mx-5 xl:mx-32 md:mx-10">
          <h1 className="text-3xl md:text-5xl font-extrabold">{event.title.toUpperCase()}</h1>
          <Link to={'/event/'+event._id+ '/ordersummary'}>
            <button className="primary">Book Ticket</button>  
          </Link>
      </div>
      <div className="mx-5 xl:mx-32 md:mx-10">
          <h2 className="text-md md:text-xl font-bold mt-3 text-primarydark">{event.ticketPrice === 0? 'Free' : '₹. '+ event.ticketPrice}</h2>
      </div>
      <div className="mx-5 xl:mx-32 md:mx-10 mt-5 text-md md:text-lg truncate-3-lines">
        {event.description}
      </div>
      <div className="mx-5 xl:mx-32 md:mx-10 mt-5 text-md md:text-xl font-bold text-primarydark">
        Organized By {event.organizedBy}
        
      </div>
      <div className="mx-5 xl:mx-32 md:mx-10 mt-5">
        <h1 className="text-md md:text-xl font-extrabold">When and Where </h1>
        <div className="sm:mx-5 lg:mx-32 mt-6 flex flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <AiFillCalendar className="w-auto h-5 text-primarydark "/>
            <div className="flex flex-col gap-1">
              
              <h1 className="text-md md:text-lg font-extrabold">Date and Time</h1>
              <div className="text-sm md:text-lg">
              Date: {event.eventDate.split("T")[0]} <br />Time: {event.eventTime}
              </div>
            </div>
            
          </div>
          <div className="">
            <div className="flex items-center gap-4">
            <MdLocationPin className="w-auto h-5 text-primarydark "/>
            <div className="flex flex-col gap-1">
              
              <h1 className="text-md md:text-lg font-extrabold">Location</h1>
              <div className="text-sm md:text-lg">
                {event.location}
              </div>
            </div>
            
          </div>
          </div>
        </div>
            
      </div>
      <div className="mx-5 xl:mx-32 md:mx-10 mt-5 text-md md:text-xl font-extrabold">
        Share with friends
        <div className="mt-10 flex gap-5 mx-10 md:mx-32 ">
        <button onClick={handleCopyLink}>
            <FaCopy className="w-auto h-6" />
          </button>

          <button onClick={handleWhatsAppShare}>
            <FaWhatsappSquare className="w-auto h-6" />
          </button>

          <button onClick={handleFacebookShare}>
            <FaFacebook className="w-auto h-6" />
          </button>

        </div>
      </div>


    </div>
  )
}
