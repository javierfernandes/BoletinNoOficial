import config from '../config'
import abbreviates from './abbreviates'

const T = new Twit(config)

export default async function(decreto) {
  const tweet = decretoToText(decreto)
  return T.post('statuses/update', { status: tweet }))
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