import Twit from 'twit'
import config from '../config'
import abbreviates from './abbreviates'

const T = new Twit(config)

export default async function({ decreto, detalle }) {

  // TODO: if it has a single article, then just embed it in the tweet

  const tweet = await T.post('statuses/update', { status: decretoToText(decreto) })
  
  await Promise.all(detalle.detalleNorma.articulos.map(articulo => {
    T.post('statuses/update', {
    status: `@BoletinNOficial ${articulo}`,
    in_reply_to_status_id: tweet.data.id_str
    })
  }))
}

const decretoToText = ({ idTamite, fechaPublicacion, organismo, numeroNorma, sintesis }) => 
`${numeroNorma}-${organismo}
${sintesis} ${articleURL(idTamite, fechaPublicacion)}
`

// url
const articleURL = (id, fecha) => `https://www.boletinoficial.gob.ar/#!DetalleNorma/${id}/${fecha}`

// abbreviate
const abbreviateNorma = norma => norma.replace('Decreto ', '#')
const abbreviateOrganismo = organismo => organismo.split(' ').map(abbreviateWord).join(' ')
const abbreviateWord = word => abbreviates[word] || word