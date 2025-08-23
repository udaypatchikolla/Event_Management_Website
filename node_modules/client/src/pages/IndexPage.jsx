/* eslint-disable react/jsx-key */
import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { BsArrowRightShort } from "react-icons/bs";
import { BiLike } from "react-icons/bi";
// Using a high-quality curated image for the hero background
const heroUrl = "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1920&auto=format&fit=crop";
// import img from "./paduru.png";
import img from "../assets/create event.png";
export default function IndexPage() {
    const [events, setEvents] = useState([]);
   //! Fetch events from the server ---------------------------------------------------------------
    useEffect(() => {
      
      axios
        .get("/createEvent")
        .then((response) => {
          console.log(response.data);
          
          setEvents(response.data);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }, []);
    
  //! Like Functionality --------------------------------------------------------------
    const handleLike = (eventId) => {
      axios
        .post(`/event/${eventId}`)
        .then((response) => {
            setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event._id === eventId
                ? { ...event, likes: event.likes + 1 }
                : event
            )
          );
          console.log("done", response)
        })
        .catch((error) => {
          console.error("Error liking ", error);
        });
    };
  

    return (
      <>
      <div className="mt-4 flex flex-col">
        <div>
          <div
            className="w-full h-56 sm:h-64 lg:h-80 bg-gray-200 rounded-2xl bg-cover bg-center relative overflow-hidden"
            style={{ backgroundImage: `url(${heroUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />
            <div className="relative h-full w-full flex items-end p-6 sm:p-8">
              <div className="grid gap-3 text-white animate-fade-up">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight drop-shadow">Find your next event with Planora</h1>
                <p className="max-w-2xl text-xs sm:text-sm text-gray-100/90">Discover, create, and manage events seamlessly. Explore trending experiences or host your own in minutes.</p>
                <div className="flex gap-3 mt-1">
                  <Link to={"/"} className="hidden sm:block">
                    <button className="primary">
                      Explore Events
                    </button>
                  </Link>
                  <Link to={"/createEvent"}>
                    <button className="secondary">
                      Create Event
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primarydark">Discover Events</h1>
        </div>

        <div className="pb-8 grid gap-x-6 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        
        {/*-------------------------- Checking whether there is a event or not-------------------  */}
        {events.length > 0 && events.map((event) => {
          const eventDate = new Date(event.eventDate);
          const currentDate = new Date();
          
          //! Check the event date is passed or not --------------------------------------------------------------------------------------- 
          if (eventDate > currentDate || eventDate.toDateString() === currentDate.toDateString()){
            return (
              <div className="bg-white rounded-xl relative shadow-sm ring-1 ring-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200" key={event._id}>
                <div className='rounded-tl-[0.75rem] rounded-tr-[0.75rem] rounded-br-[0] rounded-bl-[0] overflow-hidden aspect-[16/9] bg-gray-50'>
                  <img
                    src={event.image 
                      ? (event.image.startsWith('uploads/') 
                        ? `http://localhost:4000/api/${event.image.replace('uploads/', '')}` 
                        : event.image)
                      : img}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span className="text-[11px] px-2 py-1 rounded-full bg-white/90 shadow-sm font-semibold text-primarydark">
                      {event.ticketPrice === 0 ? 'Free' : 'Paid'}
                    </span>
                    <button onClick={() => handleLike(event._id)} className="bg-white p-2 rounded-full shadow hover:text-primary transition-colors">
                      <BiLike className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="m-3 grid gap-2">
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold text-lg mt-1 truncate">{event.title}</h2>
                    <div className="flex gap-2 items-center mr-1 text-primarydark"> <BiLike /> {event.likes}</div>
                  </div>
                  <div className="flex text-sm flex-nowrap justify-between text-primarydark font-bold">
                    <div>{event.eventDate.split("T")[0]}, {event.eventTime}</div>
                    <div>{event.ticketPrice === 0? 'Free' : 'Rs. '+ event.ticketPrice}</div>
                  </div>
                  <div className="text-xs text-gray-600 truncate-text">{event.description}</div>
                  <div className="flex justify-between items-center my-2">
                    <div className="text-xs text-gray-600">Organized By: <span className="font-semibold text-gray-800">{event.organizedBy}</span></div>
                    <div className="text-xs text-gray-600">Created By: <span className="font-semibold text-gray-800">{event.owner.toUpperCase()}</span></div>
                  </div>
                  <Link to={'/event/'+event._id} className="flex justify-center">
                    <button className="primary flex items-center gap-2">Book Ticket< BsArrowRightShort className="w-6 h-6" /></button>
                  </Link>
                </div>
              </div>
            )
          }
          return null;
        }   
        )}
        </div>
      </div>
      </>
        
      )
  }
  