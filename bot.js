import Twit from 'twit'
import rp from 'request-promise'
import moment from 'moment'

import config from './config'
import abbreviates from './abbreviates'

const T = new Twit(config)
const today = moment().format('YYYYMMDD')

const run = async () => {

  const data = await rp({
    method: 'POST',
    uri: 'https://www.boletinoficial.gob.ar/secciones/secciones.json',
    form: {
      nombreSeccion: 'primera',
      offset: 1,
      subCat: 'all',
      itemsPerPage: 500,
      fecha: today
    }
  })

  const decretos = JSON.parse(data).dataList[0].filter(d => d.rubro === 'Decretos')

  const tweets = decretos.map(decretoToText)
  // console.log(tweets.join('\n\n'))

  await Promise.all(tweets.map(tweet => 
    T.post('statuses/update', { status: tweet })
  ))
}

const decretoToText = ({ idTamite, fechaPublicacion, organismo, numeroNorma, sintesis }) => 
`${numeroNorma}-${organismo}
${sintesis} ${articleURL(idTamite)}
`

// url
const articleURL = id => `https://www.boletinoficial.gob.ar/#!DetalleNorma/${id}/${today}`

// abbreviate
const abbreviateNorma = norma => norma.replace('Decreto ', '#')
const abbreviateOrganismo = organismo => organismo.split(' ').map(abbreviateWord).join(' ')
const abbreviateWord = word => abbreviates[word] || word

run()

