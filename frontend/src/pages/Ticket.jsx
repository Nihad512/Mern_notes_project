import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getTicket,closeTicket} from '../features/tickets/ticketSlice'
import { getNotes,reset as notesReset,createNote} from "../features/notes/noteSlice";
import { useParams,useNavigate } from "react-router-dom";
import Backbutton from "../components/Backbutton";
import { FaPlus } from "react-icons/fa";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";
import {toast} from 'react-toastify'
import Modal from 'react-modal'

const customStyles={
    content:{
        width:'600px',
        top:'50%',
        left:'50%',
        right:'auto',
        bottom:'auto',
        marginRight:'-50%',
        transform:'translate(-50%,-50%)',
        position:'relative',
    }
}

Modal.setAppElement('#root')

function Ticket() {
   const [modalIsOpen,setModalIsOpen]=useState(false);
   const [noteText,setNoteText]=useState('')
   const {ticket,isLoading,isSuccess,isError,message}=useSelector((state)=>state.tickets)
   const {notes,isLoading:notesIsLoading}=useSelector((state)=>state.notes)
   const params=useParams();
   const dispatch=useDispatch();
   const navigate=useNavigate()
   const {ticketId}=useParams()
   useEffect(()=>{
    console.log(ticketId);
    if(isError){
    toast.error(message)
    }
    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
    //eslint-disable-next-line
   },[isError,message,ticketId])
   //open/close modal
   const openModal=()=>setModalIsOpen(true)
   const closeModal=()=>setModalIsOpen(false)


   //close ticket
   const onTicketClosed=()=>{
    dispatch(closeTicket(ticketId))
    toast.success('ticket closed')
    navigate('/tickets')
   }
    //create note submit
    const onNoteSubmit=(e)=>{
        e.preventDefault()
        dispatch(createNote({noteText,ticketId}))
        closeModal()
    }
    if(isLoading||notesIsLoading){
        <Spinner/>
    }
    if(isError){
        <h3>Something went wrong</h3>
    }
    return (
        <div className="ticket-page">
            <header className="tikcet-header">
             <Backbutton url='/tickets' /> 
             <h2>Ticket Id:{ticket._id}
             <span className={`status status-${ticket.status}`}>
                {ticket.status}
             </span>
             </h2>
             {/* <h3>Date Submitted: {new Date(ticket.createdAt().toLocaleString('en-US'))}</h3> */}
             <h3>Product: {ticket.product}</h3>
             <hr />
             <div className="ticket-desc">
                <h3>Description of Issue</h3>
                <p>{ticket.description}</p>
             </div>
             <h2>Notes</h2>

            </header>
            {ticket.status!=='closed'&&(
                <button onClick={openModal} className="btn"><FaPlus /> Add Note</button>
            )}
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles}  contentLabel="Add Note">
                <h2>Add Note</h2>
                <button className="btn-close" onClick={closeModal}>X</button>
                <form onSubmit={onNoteSubmit}>
                    <div className="form-froup">
                        <textarea
                        name="noteText" 
                        id="noteText" 
                        className="form-control" 
                        placeholder="Note Text" 
                        value={noteText} 
                        onChange={(e)=>setNoteText(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <button className="btn" type="submit">Submit</button>
                    </div>
                </form>
            </Modal>
            {notes.map((note)=>(
                <NoteItem key={note._id} note={note}/>
            ))}
            {ticket.status !=='closed'&&(
                <button onClick={onTicketClosed} className="btn btn-block btn-danger">Close Ticket</button>
            )}
        </div>
    );
}

export default Ticket;