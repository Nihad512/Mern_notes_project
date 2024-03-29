import { useState,useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { createTicket,reset } from "../features/tickets/ticketSlice";
import Spinner from '../components/Spinner'
import Backbutton from "../components/Backbutton";


function NewTicket() {
    const {user}=useSelector((state)=>state.auth)
    const [name]=useState(user.name)
    const [email]=useState(user.email)
    const [product,setProduct]=useState('iphone')
    const [description,setDesctiption]=useState('')
    const {isLoading,isError,isSuccess,message}=useSelector((state)=>state.tickets)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if(isSuccess){
            dispatch(reset())
            navigate('/tickets')
        }
        dispatch(reset())
    },[dispatch,isError,isSuccess,navigate,message]);
    const onSubmit=(e)=>{
        e.preventDefault()
        dispatch(createTicket({product,description}))
    }
    if(isLoading){
        return <Spinner/>
    }
    return (
        <>
        <Backbutton url='/' />
           <section className="heading">
            <h1>Create new ticket</h1>
            <p>please fill out the form below</p>
           </section>
           <section className="form">
            <div className="form-group">
                <label htmlFor="name">
                    Customer Name
                </label>
                <input type="text" name="" id="" className="form-control" value={name} disabled />
            </div>
            <div className="form-group">
                <label htmlFor="name">
                    Customer Email
                </label>
                <input type="email" name="" id="" className="form-control" value={email} disabled />
            </div>
            <form  onSubmit={onSubmit}>
                <div className="form-group">
                <label htmlFor="product">Product</label>
                <select name="product" id="product" value={product} onChange={(e)=>setProduct(e.target.value)}>
                    <option value="iPhone">iPhone</option>
                    <option value="Macbook Pro">Macbook Pro</option>
                    <option value="iMac">iMac</option>
                    <option value="iPad">iPad</option>
                </select>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Desctiption of the issue</label>
                    <textarea name="description"
                    id="description"
                    placeholder="description"
                    value={description}
                    onChange={(e)=>setDesctiption(e.target.value)}></textarea>
                </div>
                <div className="form-group">
                    <button className="btn btn-block">Submit</button>
                </div>
            </form>
           </section>
        </>
    );
}

export default NewTicket;