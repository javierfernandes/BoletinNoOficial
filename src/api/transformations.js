import { pipe, replace, split, prop } from 'ramda'
import htmlToText from 'html-to-text'
import { middleware, exclude } from './utils' 

export const parseNumeroNorma = _ => /Decreto (.*)/.exec(_)[1]

//
// Parse decreto content
//
const parseHtml = _ => htmlToText.fromString(_, { wordwrap: false })

const splitLines = split(/\n\n/)
const shrinkCR = replace(/\n\n+/g, '\n')

const pushTo = attribute => (article, line) => ({
  ...article,
  [attribute]: (article[attribute] || []).concat(line)
})

export const parsers = {
  'VISTO Y CONSIDERANDO:': pushTo('vistos'),
  // 'DECRETA:': pushTo('articulos')
  'DECRETA:': middleware(
    exclude(line => /^artículo .*comuníquese.*archívese.*/.test(line.toLowerCase())),
    exclude(line => /^e. \d{2}\/\d{2}\/\d{4}/.test(line)),
    // TODO: remove "ARTICLE X" preffix, & abbreviate text
    pushTo('articulos')
  )
}

const parseReducer = (acc, line) => {
  const matchedParser = parsers[line]
  return matchedParser ?
    { ...acc, parser: matchedParser } 
    : { ...acc, article: acc.parser(acc.article, line) }
}

const joinSections = lines => lines.reduce(parseReducer, { parser: pushTo('encabezado'), article: {} })

export const parseDetalleNorma = pipe(parseHtml, splitLines, joinSections, prop('article'))

