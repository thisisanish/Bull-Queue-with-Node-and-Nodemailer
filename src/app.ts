import Bull from 'bull'
import * as nodemailer from 'nodemailer'

import {pass} from './config'


console.log("💪 READY\n");

// * Initating the queue

const sendMailQueue = Bull('sendMail',{
    redis:{
        host:"127.0.0.1",
        port:6379,       
    }
})

const data = {
    email:"anish.boardinfinity@gmail.com",   
}

const options={
    delay:0,
    attempts:3
    
}

// * Adding a Job

for(let i= 0; i<5; i++){
    sendMailQueue.add(data,options)
}


// * Consumer

sendMailQueue.process(async job=>{
    return await sendMail(job)
})

// * Actual process logic
function sendMail(job:any){
    let email = job.data.email

    // console.log("Attempting",job.id,"Attempt : ", job.attemptsMade);
    return new Promise((resolve,reject)=>{

        // ! Uncomment/Comment the Below Code for Producting Different Situations
        
        if(job.attemptsMade>=2 || job.id%3 ==0 ){
            resolve("Success")
        }else{
            reject("REJECTED")
        }

        // ! Uncomment/Comment Below Code for sending Actual Mail
     /*    
        let mailoptions = {
            from:'email.anishagarwal@gmail.com',
            to:email,
            subject:"🐮 TESTING MAIL",
            text:"This mail is from the Bull Job Scheduler"
        };
        let mailConfig = {
            service:"gmail",
            auth:{
                user:'email.anishagarwal@gmail.com',
                pass:pass
            }
        }
 
        // ? How to handle nodemailer ke errors, cause its not handles in the callback ???

        nodemailer.createTransport(mailConfig).sendMail(mailoptions,(error,info)=>{
            if(error){
                reject(error)
            }
            else{   
                console.log("🚩",job.id,"Mail Successfully sent to:",info.envelope.to[0]);            
                resolve(info)
                // reject("Fake Reject... The Job with same ID would again Retry based on Attempts passed")
            }
        })
             */
    
    
    })
}


// * EVENTS

sendMailQueue.on('waiting',(jobId)=>{
    console.log("🕑 ",jobId, "is waiting");  
})
sendMailQueue.on('failed',(job,result)=>{
    console.log("😥 ", job.id, "Failed, Attempting Retry No. ",job.attemptsMade);
})

sendMailQueue.on('completed',(job)=>{
    console.log("🥳 ",job.id, "Completed Sucessfully"); 

})
