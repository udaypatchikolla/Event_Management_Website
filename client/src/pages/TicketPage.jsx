import { Link } from "react-router-dom";
import {IoMdArrowBack} from 'react-icons/io'
import {RiDeleteBinLine} from 'react-icons/ri'
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function TicketPage() {
    const {user} = useContext(UserContext);
  
    const [userTickets, setUserTickets] = useState([]);
    const [balance, setBalance] = useState(0);
    const [amount, setAmount] = useState(1000);
  
    useEffect(() => {
      if (user) {
        fetchTickets();
        fetchWallet();
      }
    }, [user]);
  
    const fetchTickets = async()=>{
      axios.get(`/tickets/user/${user._id}`)
          .then(response => {
            setUserTickets(response.data);
          })
          .catch(error => {
            console.error('Error fetching user tickets:', error);
          })
    }

    const fetchWallet = async () => {
      try {
        const { data } = await axios.get(`/wallet/${user._id}`);
        setBalance(data?.balance || 0);
      } catch (err) {
        console.error('Error fetching wallet:', err);
      }
    };

    const updateWallet = async (delta) => {
      try {
        const { data } = await axios.post(`/wallet/${user._id}`, { amount: delta });
        setBalance(data.balance || 0);
      } catch (err) {
        console.error('Error updating wallet:', err);
      }
    };
  
    const deleteTicket = async(ticketId) => {
      try {
        await axios.delete(`/tickets/${ticketId}`); 
        
        fetchTickets();
        alert('Ticket Deleted');
      } catch (error) {
        console.error('Error deleting ticket:', error);
      }
    }
  
    return (
      <div className="flex flex-col flex-grow">
      <div className="mb-5 flex justify-between place-items-center">
        <div>
          <Link to='/'>
            <button 
                // onClick={handleBackClick}
                className='
                inline-flex 
                mt-12
                gap-2
                p-3 
                ml-12
                bg-gray-100
                justify-center 
                items-center 
                text-blue-700
                font-bold
                rounded-md'
                >
              <IoMdArrowBack 
              className='
              font-bold
              w-6
              h-6
              gap-2'/> 
              Back
            </button>
          </Link>
        </div>
        <div className="mr-12">
          <div className="bg-white ring-1 ring-gray-100 rounded-lg px-4 py-2 shadow-sm flex items-center gap-4">
            <div>
              <div className="text-xs text-gray-500">Wallet Balance</div>
              <div className="text-lg font-bold text-primarydark">₹ {balance.toFixed(2)}</div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateWallet(amount)} className="secondary flex items-center gap-2"><FaPlus /> Add</button>
              <button onClick={() => updateWallet(-amount)} className="secondary flex items-center gap-2"><FaMinus /> Withdraw</button>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-2 justify-end">
            <label className="text-xs text-gray-500">Amount</label>
            <input type="number" value={amount} onChange={(e)=>setAmount(Number(e.target.value))} className="w-28 text-sm py-1 px-2 ring-1 ring-gray-200 rounded" />
          </div>
        </div>
        <div className=" place-item-center hidden">
          
            <RiDeleteBinLine className="h-6 w-10 text-red-700 "/>
          
        </div>
        
        </div>
         <div className="mx-12 grid grid-cols-1 xl:grid-cols-2 gap-5">
          
        {userTickets.map(ticket => (
          
        <div key={ticket._id} >
          <div className="">
            
            <div className="h-48 mt-2 gap-2 p-5 bg-gray-100 font-bold rounded-md relative">
              <button onClick={()=>deleteTicket(ticket._id)} className="absolute cursor-pointer right-0 mr-2">
                <RiDeleteBinLine className=" h-6 w-10 text-red-700 "/>
              </button>
              <div className="flex justify-start place-items-center text-sm md:text-base font-normal">
                
                <div className=" h-148 w-148">
                  <img src={ticket.ticketDetails.qr} alt="QRCode" className="aspect-square object-fill "/>
                </div>
                <div className="ml-6 grid grid-cols-2 gap-x-6 gap-y-2">
                  <div className="">
                    Event Name : <br /><span className=" font-extrabold text-primarydark">{ticket.ticketDetails.eventname.toUpperCase()}</span>
                  </div>
                  
                  <div>
                    Date & Time:<br /> <span className="font-extrabold text-primarydark">{ticket.ticketDetails.eventdate.toUpperCase().split("T")[0]}, {ticket.ticketDetails.eventtime}</span>
                  </div>
                  <div>
                    Name: <span className="font-extrabold text-primarydark">{ticket.ticketDetails.name.toUpperCase()}</span>
                  </div>
                  <div>
                    Price: <span className="font-extrabold text-primarydark"> Rs. {ticket.ticketDetails.ticketprice}</span>
                  </div>
                  <div>
                    Email: <span className="font-extrabold text-primarydark">{ticket.ticketDetails.email}</span>
                  </div>
                  <div>
                    Ticket ID:<br /><span className="font-extrabold text-primarydark">{ticket.ticketDetails._id}</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
          </div>
        
         ))}
         </div>
  
      
      </div>
    )
}
