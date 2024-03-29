import {createSlice, createAsyncThunk} from "@reduxjs/toolkit" 
import ticketService from './ticketService'
const initialState={
    tickets:[],
    ticket:{},
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}
//create new ticket
export const createTicket =createAsyncThunk('tickets/create',async (ticketData,thunkAPI)=>{
    try{
        const token=thunkAPI.getState().auth.user.token
        return await ticketService.createTicket(ticketData,token)
    }catch(error){
        const message =(error.response &&error.response.data&&error.response.data.message) ||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
    })
    //get user tickets
export const getTickets =createAsyncThunk('tickets/getAll',async (ticketData,thunkAPI)=>{
    try{
        const token=thunkAPI.getState().auth.user.token
        return await ticketService.getTickets(token)
    }catch(error){
        const message =(error.response &&error.response.data&&error.response.data.message) ||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
    })

    //get user ticket
    export const getTicket =createAsyncThunk('tickets/get',async (ticketId,thunkAPI)=>{
        try{
        
            const token=thunkAPI.getState().auth.user.token
            console.log(token);
            return await ticketService.getTicket(ticketId, token)
        }catch(error){
            const message =(error.response &&error.response.data&&error.response.data.message) ||error.message||error.toString()
            return thunkAPI.rejectWithValue(message)
        }
    })

 //close  ticket
 export const closeTicket =createAsyncThunk('ticket/close',async (ticketId,thunkAPI)=>{
    try{
    
        const token=thunkAPI.getState().auth.user.token
        console.log(token);
        return await ticketService.closeTicket(ticketId, token)
    }catch(error){
        const message =(error.response &&error.response.data&&error.response.data.message) ||error.message||error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const ticketSlice=createSlice({
    name:'ticket',
    initialState,
    reducers:{
        reset:(state)=>initialState,
    },
    extraReducers:(builder)=>{
        builder.addCase(createTicket.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(createTicket.fulfilled,(state)=>{
            state.isLoading=false
            state.isSuccess=true
        })
        builder.addCase(createTicket.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        builder.addCase(getTickets.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(getTickets.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.tickets=action.payload
        })
        builder.addCase(getTickets.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
        builder.addCase(getTicket.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(getTicket.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.ticket=action.payload
        })
        builder.addCase(getTicket.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
        })
      
        builder.addCase(closeTicket.fulfilled,(state,action)=>{
            state.isLoading=false
            state.tickets.map((ticket)=>ticket._id===action.payload._id ?(ticket.status='closed'): ticket)
        })
      
    }
})
export const {reset}=ticketSlice.actions
export default ticketSlice.reducer;