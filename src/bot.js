import moment from 'moment'
import { CronJob } from 'cron'
import logger from './logger'
import api from './api/api'
import processor from './processor/tweet'

const today = moment().format('YYYYMMDD')

const run = async () => {
  logger.debug(`Running for ${today}`)
  
  const decretos = await api.fetchDecretos(today)
  
  logger.debug(`Found ${decretos.length} decretos`) 
  
  await Promise.all(decretos.map(async decreto => {
    const detalle = await api.fetchDetalleDecreto(decreto)
    console.log('Processing decreto', JSON.stringify(detalle))
    return await processor({ decreto, detalle })
  }))
}


// start/schedule

// run()
new CronJob('00 42 08 * * 1-5', run, () => {}, true)

