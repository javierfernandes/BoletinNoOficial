import Twit from 'twit'
import moment from 'moment'
import { CronJob } from 'cron'
import winston from 'winston'
import processor from './processor/tweet'


const today = moment().format('YYYYMMDD')

const run = async processor => {
  winston.log('Running for', today)
  
  const decretos = api.fetchDecretos(today)
  
  winston.log(`Found ${decretos.length} decretos`) 
  
  await Promise.all(decretos.map(processor))
}


// start/schedule

run()
// new CronJob('00 22 08 * * 1-5', run, () => {}, true)

