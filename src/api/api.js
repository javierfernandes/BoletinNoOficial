import logger from '../logger'
import rp from 'request-promise'
import { parseNumeroNorma, parseDetalleNorma } from './transformations'

export default {

  async fetchDecretos(today) {
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

    return JSON.parse(data).dataList[0]
      .filter(d => d.rubro === 'Decretos')
      .map(d => ({
        ...d,
        // fixing typo in their API !
        idTramite: d.idTamite
      }))
  },

  async fetchDetalleDecreto({ idTramite, fechaPublicacion }) {
    const form = {
      numeroTramite: idTramite,
      fechaPublicacion,
      origenDetalle: 0,
      idSesion: null
    }
    console.log('FORM', form)
    const data = await rp({
      method: 'POST',
      uri: 'https://www.boletinoficial.gob.ar/norma/detallePrimera',
      form
    })
    const decreto = JSON.parse(data).dataList
    return {
      numeroNorma: parseNumeroNorma(decreto.numeroNorma),
      organismo: decreto.organismo,
      idTramite: decreto.idTramite,
      fechaPublicacion: decreto.fechaPublicacion,
      detalleNorma: parseDetalleNorma(decreto.detalleNorma)
    }
  }

}