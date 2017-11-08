import { pipe, replace, split, prop } from 'ramda'
import htmlToText from 'html-to-text'

export const parseNumeroNorma = _ => /Decreto (.*)/.exec(_)[1]

//
// Parse decreto content
//
const parseHtml = _ => htmlToText.fromString(_)

const splitLines = split(/\n\n/)
const shrinkCR = replace(/\n\n+/g, '\n')

const pushTo = attribute => (article, line) => ({
  ...article,
  [attribute]: (article[attribute] || []).concat(line)
})
const parsers = {
  'VISTO Y CONSIDERANDO:': pushTo('vistos'),
  'DECRETA:': pushTo('articulos')
}

const parseReducer = (acc, line) => {
  const matchedParser = parsers[line]
  return matchedParser ?
    { ...acc, parser: matchedParser } 
    : { ...acc, article: acc.parser(acc.article, line) }
}

const joinSections = lines => lines.reduce(parseReducer, { parser: pushTo('encabezado'), article: {} })

export const parseDetalleNorma = pipe(parseHtml, splitLines, joinSections, prop('article'))

