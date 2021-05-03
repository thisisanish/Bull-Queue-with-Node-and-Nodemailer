import express from 'express';


import Bull from 'bull'
import {createBullBoard } from 'bull-board' // UI
import {BullAdapter} from 'bull-board/bullAdapter' // UI Adapter

import * as jobWorker from './jobWorker'
import * as jobDispatcher from './jobDispatcher'


const app = express()

console.log("💪 READY\n");

// QUEUE
const sendMailQueue = Bull('sendMail',{
    redis:{
        host:"127.0.0.1",
        port:6379,       
    }
})

// ? Need to understand this and modularize it
const { router, setQueues, replaceQueues } = createBullBoard([
    new BullAdapter(sendMailQueue),
  ])

// * Adding a Job
// TODO : Better way to code it


jobDispatcher.sendMailQueueDispatcher(1)
// * Consumer

jobWorker


// * Visualize

app.use('/visualize',router)


app.listen(3000,()=>{
    console.log("Running");
    
})