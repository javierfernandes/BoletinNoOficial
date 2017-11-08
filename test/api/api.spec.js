import { expect } from 'chai'
import nock from 'nock'
import fs from 'fs'
import api from '../../src/api/api'

const BASE_URL = 'https://www.boletinoficial.gob.ar'

describe('BNO api', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  describe('fetchDecretos()', () => {
    
    it('should retrieve a list of decretos', async () => {
      nock(BASE_URL)
        .post('/secciones/secciones.json')
        .reply(200, JSON.parse(fs.readFileSync(`${__dirname}/./sample.decretos.json`)))

      expect(await api.fetchDecretos('20171010')).to.deep.equal([
        {
          "anioNorma": "2017",
          "anioTramite": null,
          "archivoPDF": null,
          "fechaPublicacion": "20171103",
          "fechaPublicacionDesde": null,
          "fechaPublicacionHasta": null,
          "idNorma": null,
          "idTamite": "174096",
          "nuevo": "True",
          "numeroNorma": "Decreto 897",
          "organismo": "JEFATURA DE GABINETE DE MINISTROS",
          "rubro": "Decretos",
          "sintesis": "Desígnase Subsecretaria de Vínculo Ciudadano.",
          "tieneAnexos": false,
          "tipoNorma": "",
          "titulo": null
        },
        {
          "anioNorma": "2017",
          "anioTramite": null,
          "archivoPDF": null,
          "fechaPublicacion": "20171103",
          "fechaPublicacionDesde": null,
          "fechaPublicacionHasta": null,
          "idNorma": null,
          "idTamite": "174097",
          "nuevo": "True",
          "numeroNorma": "Decreto 895",
          "organismo": "MINISTERIO DE RELACIONES EXTERIORES Y CULTO",
          "rubro": "Decretos",
          "sintesis": "Trasládase funcionario.",
          "tieneAnexos": false,
          "tipoNorma": "",
          "titulo": null
        },
        {
          "anioNorma": "2017",
          "anioTramite": null,
          "archivoPDF": null,
          "fechaPublicacion": "20171103",
          "fechaPublicacionDesde": null,
          "fechaPublicacionHasta": null,
          "idNorma": null,
          "idTamite": "174098",
          "nuevo": "True",
          "numeroNorma": "Decreto 896",
          "organismo": "SERVICIO EXTERIOR",
          "rubro": "Decretos",
          "sintesis": "Desígnase Embajador Extraordinario y Plenipotenciario de la República en la Confederación Suiza.",
          "tieneAnexos": false,
          "tipoNorma": "",
          "titulo": null
        }
      ])
    })

  })

  describe('fetchDetalleDecreto', () => {

    it('should retrieve a decreto', async () => {
      nock(BASE_URL)
        .post('/norma/detallePrimera')
        .reply(200, JSON.parse(fs.readFileSync(`${__dirname}/./sample.detalleDecreto.json`)))

      expect(await api.fetchDetalleDecreto({ idTramite: '174186', fechaPublicacion: '20171106' }))
        .to.deep.equal({
          numeroNorma: '898',
          organismo: 'PROCURACIÓN GENERAL DE LA NACIÓN',
          idTramite: '174186',
          fechaPublicacion: '20171106',
          detalleNorma: {
            encabezado: [
              '#I5426953I#',
              'PROCURACIÓN GENERAL DE LA NACIÓN',
              'Decreto 898/2017',
              'Acéptase renuncia.',
              'Ciudad de Buenos Aires, 03/11/2017'
            ],
            vistos: [
              'Que la señora doctora D. Alejandra Magdalena GILS CARBÓ ha presentado su\nrenuncia, a partir del 31 de diciembre del año 2017, al cargo de Procuradora\nGeneral de la Nación.',
              'Que en atención a lo expuesto precedentemente, resulta pertinente proceder a su\naceptación.',
              'Que el presente acto se dicta en uso de las atribuciones conferidas por el\nartículo 11 de la Ley N° 27.148.',
              'Por ello,',
              'EL PRESIDENTE DE LA NACIÓN ARGENTINA'
            ],
            articulos: [
              'ARTÍCULO 1°.- Acéptase, a partir del 31 de diciembre de 2017, la renuncia\npresentada por la señora doctora D. Alejandra Magdalena GILS CARBÓ (D.N.I. N°\n12.600.466), al cargo de PROCURADORA GENERAL DE LA NACION.',
              'ARTÍCULO 2°.- Comuníquese, publíquese, dése a la Dirección Nacional del Registro\nOficial y archívese. — MACRI. — Germán Carlos Garavano.',
              'e. 06/11/2017 N° 85592/17 v. 06/11/2017'
            ]
          }
        })
    })
    
  })

})