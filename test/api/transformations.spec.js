import { expect } from 'chai'
import { middleware, exclude } from '../../src/api/utils'
import { parsers } from '../../src/api/transformations'

describe('transformations', () => {
  
  describe('middlewares', () => {

    it('composes a simple 1 elements middleware', () => {
      const f = middleware(
        (article, line) => 23
      )
      expect(f('article', 'line')).to.equal(23)
    })

    it('composes a simple 2 elements middleware, first one cuts execution', () => {
      const f = middleware(
        (article, line) => 23,
        (article, line) => 24
      )
      expect(f('article', 'line')).to.equal(23)
    })

    it('composes a simple 2 elements middleware, first calls next', () => {
      const f = middleware(
        (article, line, next) => next(article, line),
        (article, line) => 24
      )
      expect(f('article', 'line')).to.equal(24)
    })

    describe('excludes', () => {

      it('should create a simple filter', () => {
        const e = exclude(line => line.indexOf('A') === 0)
        expect(e('article', 'ABC', () => 'next called')).to.equal('article')
      })

      it('should be useful as a middleware', () => {
        const f = middleware(
          exclude(line => line.indexOf('A') === 0),
          (article, line) => line
        )

        expect(f('article', 'ABC')).to.equal('article')
      })

    })

  })

  describe('parsers', () => {

    describe('decreta', () => {

      it('should filter archivese', () => {
        
        const expectToFilter = content => {
          const article = {}
          parsers['DECRETA:'](article, content)
          expect(article).to.deep.equal({})
        }
        
        expectToFilter("ARTÍCULO 3°.- Comuníquese, publíquese, dése a la DIRECCIÓN NACIONAL DEL REGISTRO OFICIAL y archívese. — MICHETTI. — Marcos Peña. — Guillermo Javier Dietrich.")
        expectToFilter("ARTÍCULO 2°.- Comuníquese, publíquese, dése a la Dirección Nacional del Registro Oficial y archívese. — MACRI. — Germán Carlos Garavano.")
        expectToFilter("ARTÍCULO 2°.- Comuníquese, publíquese, dése a la Dirección Nacional del Registro Oficial y archívese. — MICHETTI. — Germán Carlos Garavano.")
      })

    })

  })

})