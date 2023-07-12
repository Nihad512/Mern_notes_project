const mongoose= require('mongoose');
const ticketSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    product:{
        type:String,
        required:[true,'Please select a product'],
        enum:['iPhone','Macbook Pro','iMac','iPad']
    },
    description:{
        type:String,
        required:[true,'Please enter a description of your issue']
    },
    status:{
        type:String,
        enum:['new','open','closed'],
        default:'new'
    }

},
{
    timeStamps:true,
})
module.exports=mongoose.model('Ticket',ticketSchema)