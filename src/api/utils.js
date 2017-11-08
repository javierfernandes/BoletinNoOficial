
export const middleware = (...args) => (article, line) => {
  let i = 0
  const next = (article, line) => args[i++](article, line, next)
  
  return next(article, line)
}

export const exclude = excludesFn => (article, line, next) => {
  if (excludesFn(line)) {
    return article
  } else {
    return next(article, line)
  }
}