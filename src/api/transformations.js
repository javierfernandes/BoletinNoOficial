import htmlToText from 'html-to-text'

export const parseNumeroNorma = _ => /Decreto (.*)/.exec(_)[1]

export const parseDetalleNorma = _ => htmlToText.fromString(_)