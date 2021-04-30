import Bull from 'bull'
import * as nodemailer from 'nodemailer'
import {pass} from './config'

console.log("Job Dispatcher is Running")


const sendMailQueue = Bull('sendMail',{
    redis:{
        host:"127.0.0.1",
        port:6379,       
    }
})

let data = {
    email:"anish.boardinfinity@gmail.com",   
}

let options={
    delay:0,
    attempts:3
}

// -----------------------------------------------------------------------

export default function(n:Number){
    for(let i= 0; i<n; i++){
        sendMailQueue.add(data,options)
    }
}



