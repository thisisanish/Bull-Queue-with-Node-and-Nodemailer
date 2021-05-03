import Bull from 'bull'


console.log("Job Dispatcher is Running")

// * Configs
const sendMailQueue = Bull('sendMail',{
    redis:{
        host:"127.0.0.1",
        port:6379,       
    }
})

// * Data
let data = {
    email:"anish.boardinfinity@gmail.com",   
}

let options={
    attempts:3,
    // removeOnComplete:true
}

// -----------------------------------------------------------------------
// * Queue Dispatching 

export const sendMailQueueDispatcher = (n:Number)=>{
    for(let i= 0; i<n; i++){
        
            sendMailQueue.add('Bull Task',data,options)
    }
}



