import Bull from 'bull'
import * as nodemailer from 'nodemailer'

import {pass} from './config'


import jobWorker from './jobWorker'
import jobDispatcher from './jobDispatcher'

console.log("💪 READY\n");


// * Adding a Job

jobDispatcher(5)



// * Consumer

jobWorker