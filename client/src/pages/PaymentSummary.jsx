/* eslint-disable no-unused-vars */
import axios from 'axios';
import  { useContext, useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom';
import {IoMdArrowBack} from 'react-icons/io'
import { UserContext } from '../UserContext';
import Qrcode from 'qrcode' //TODO:

export default function PaymentSummary() {
    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const {user} = useContext(UserContext);
    const [details, setDetails] = useState({
      name: '',
      email: '',
      contactNo: '',
    });
//!Adding a default state for ticket-----------------------------
    const defaultTicketState = {
      userid: user ? user._id : '',
      eventid: '',
      ticketDetails: {
        name: user ? user.name : '',
        email: user ? user.email : '',
        eventname: '',
        eventdate: '',
        eventtime: '',
        ticketprice: '',
        qr: '',
      }
    };
//! add default state to the ticket details state
    const [ticketDetails, setTicketDetails] = useState(defaultTicketState);

    const [payment, setPayment] = useState({
      nameOnCard: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      upiId: '',
      bank: '',
    });
    const [selectedMethod, setSelectedMethod] = useState('card'); // card | upi | netbanking | wallet
    const [redirect, setRedirect] = useState('');
  
    useEffect(()=>{
      if(!id){
        return;
      }
      axios.get(`/event/${id}/ordersummary/paymentsummary`).then(response => {
        setEvent(response.data)

        setTicketDetails(prevTicketDetails => ({
          ...prevTicketDetails,
          eventid: response.data._id,
       //!capturing event details from backend for ticket----------------------
          ticketDetails: {
            ...prevTicketDetails.ticketDetails,
            eventname: response.data.title,
            eventdate: response.data.eventDate.split("T")[0],
            eventtime: response.data.eventTime,
            ticketprice: response.data.ticketPrice,
          }
        }));
      }).catch((error) => {
        console.error("Error fetching events:", error);
      });
    }, [id]);
//! Getting user details using useeffect and setting to new ticket details with previous details
    useEffect(() => {
      setTicketDetails(prevTicketDetails => ({
        ...prevTicketDetails,
        userid: user ? user._id : '',
        ticketDetails: {
          ...prevTicketDetails.ticketDetails,
          name: user ? user.name : '',
          email: user ? user.email : '',
        }
      }));
    }, [user]);
    
    
    if (!event) return '';

    const handleChangeDetails = (e) => {
      const { name, value } = e.target;
      setDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    };
  
    const handleChangePayment = (e) => {
      const { name, value } = e.target;
      setPayment((prevPayment) => ({
        ...prevPayment,
        [name]: value,
      }));
    };
//! creating a ticket ------------------------------
    const createTicket = async (e) => {
  e.preventDefault();
//!adding a ticket qr code to booking ----------------------
  try {
    const qrCode = await generateQRCode(
      ticketDetails.ticketDetails.eventname,
      ticketDetails.ticketDetails.name
    );
//!updating the ticket details qr with prevoius details ------------------
    const updatedTicketDetails = {
      ...ticketDetails,
      ticketDetails: {
        ...ticketDetails.ticketDetails,
        qr: qrCode,
      }
    };
//!posting the details to backend ----------------------------
    const response = await axios.post(`/tickets`, updatedTicketDetails);
    alert("Ticket Created");
    setRedirect(true)
    console.log('Success creating ticket', updatedTicketDetails)
  } catch (error) {
    console.error('Error creating ticket:', error);
  }

}
//! Helper function to generate QR code ------------------------------
async function generateQRCode(name, eventName) {
  try {
    const qrCodeData = await Qrcode.toDataURL(
        `Event Name: ${name} \n Name: ${eventName}`
    );
    return qrCodeData;
  } catch (error) {
    console.error("Error generating QR code:", error);
    return null;
  }
}
if (redirect){
  return <Navigate to={'/wallet'} />
}
    return (
      <>
        {/* Booking Hero for Payment */}
        <div
          className="w-full h-40 sm:h-48 lg:h-56 bg-cover bg-center rounded-2xl relative overflow-hidden"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1920&auto=format&fit=crop)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent" />
          <div className="relative h-full w-full flex items-end p-4 sm:p-6">
            <div className="text-white">
              <h1 className="text-xl sm:text-2xl font-extrabold drop-shadow">Payment</h1>
              <div className="text-xs sm:text-sm text-gray-100/90">{event.title}</div>
            </div>
            <Link to={'/event/'+event._id+ '/ordersummary'} className="ml-auto">
              <button className="secondary inline-flex items-center gap-2"><IoMdArrowBack/> Back</button>
            </Link>
          </div>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          <div className="lg:col-span-2 bg-white rounded-xl ring-1 ring-gray-100 shadow-sm p-5">
            {/* Your Details */}
            <div className="space-y-3">
              <h2 className="text-lg font-bold">Your Details</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <input type="text" name="name" value={details.name} onChange={handleChangeDetails} placeholder="Name" className="input-field h-10 bg-gray-50 border border-gray-200 rounded-md p-2.5" />
                <input type="email" name="email" value={details.email} onChange={handleChangeDetails} placeholder="Email" className="input-field h-10 bg-gray-50 border border-gray-200 rounded-md p-2.5" />
                <input type="tel" name="contactNo" value={details.contactNo} onChange={handleChangeDetails} placeholder="Contact No" className="input-field h-10 bg-gray-50 border border-gray-200 rounded-md p-2.5 sm:col-span-2" />
              </div>
            </div>

            {/* Payment Option */}
            <div className="mt-6 space-y-4">
              <h2 className="text-lg font-bold">Payment Option</h2>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={()=>setSelectedMethod('card')} className={`px-4 py-2 rounded-md border ${selectedMethod==='card' ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'}`}>Card</button>
                <button type="button" onClick={()=>setSelectedMethod('upi')} className={`px-4 py-2 rounded-md border ${selectedMethod==='upi' ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'}`}>UPI</button>
                <button type="button" onClick={()=>setSelectedMethod('netbanking')} className={`px-4 py-2 rounded-md border ${selectedMethod==='netbanking' ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'}`}>NetBanking</button>
                <button type="button" onClick={()=>setSelectedMethod('wallet')} className={`px-4 py-2 rounded-md border ${selectedMethod==='wallet' ? 'bg-blue-50 border-blue-300' : 'bg-white border-gray-200'}`}>Wallet</button>
              </div>

              {selectedMethod === 'card' && (
                <div className="grid sm:grid-cols-2 gap-3">
                  <input type="text" name="nameOnCard" value={payment.nameOnCard} onChange={handleChangePayment} placeholder="Name on Card" className="input-field h-10 bg-gray-50 border border-gray-200 rounded-md p-2.5" />
                  <input type="text" name="cardNumber" value={payment.cardNumber} onChange={handleChangePayment} placeholder="Card Number" className="input-field h-10 bg-gray-50 border border-gray-200 rounded-md p-2.5" />
                  <input type="text" name="expiryDate" value={payment.expiryDate} onChange={handleChangePayment} placeholder="Expiry Date (MM/YY)" className="input-field h-10 bg-gray-50 border border-gray-200 rounded-md p-2.5" />
                  <input type="text" name="cvv" value={payment.cvv} onChange={handleChangePayment} placeholder="CVV" className="input-field h-10 bg-gray-50 border border-gray-200 rounded-md p-2.5 w-28" />
                </div>
              )}

              {selectedMethod === 'upi' && (
                <input type="text" name="upiId" value={payment.upiId} onChange={handleChangePayment} placeholder="Enter UPI ID (e.g., name@bank)" className="input-field w-full h-10 bg-gray-50 border border-gray-200 rounded-md p-2.5" />
              )}

              {selectedMethod === 'netbanking' && (
                <select name="bank" value={payment.bank} onChange={handleChangePayment} className="input-field w-full h-10 bg-gray-50 border border-gray-200 rounded-md p-2.5">
                  <option value="">Select your bank</option>
                  <option value="HDFC">HDFC Bank</option>
                  <option value="ICICI">ICICI Bank</option>
                  <option value="SBI">SBI</option>
                  <option value="AXIS">Axis Bank</option>
                </select>
              )}

              {selectedMethod === 'wallet' && (
                <div className="text-sm text-gray-700">Use your in-app wallet balance to complete the purchase. You can manage funds in the Wallet section.</div>
              )}

              <div className="flex justify-end pt-2">
                <div>
                  <p className="text-sm font-semibold pb-2">Total : ₹. {event.ticketPrice}</p>
                  <button type="button" onClick={createTicket} className="primary">Make Payment</button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl ring-1 ring-gray-100 shadow-sm p-5 h-max">
            <h2 className="text-lg font-bold mb-3">Order Summary</h2>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between"><span>1 Ticket</span><span>₹. {event.ticketPrice}</span></div>
              <div className="font-semibold">{event.title}</div>
              <div className="text-xs">{event.eventDate.split("T")[0]} • {event.eventTime}</div>
              <hr className=" my-3 border-gray-200" />
              <div className="flex justify-between font-bold"><span>Sub total</span><span>₹. {event.ticketPrice}</span></div>
            </div>
          </div>
        </div>
      </>
    );
}
