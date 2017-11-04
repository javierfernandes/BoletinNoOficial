# BoletinNoOficial

Aplicación de twitter que diariamente obtiene los decretos del boletin oficial de Argentina y
los publica en forma de tweets individuales.

# Setup

Para poder ejecutar primeramente hace falta

* crear una aplicación de twitter (https://apps.twitter.com/app/new)[https://apps.twitter.com/app/new]
* crear un token (desde la misma página)


Con los datos de la aplicación

```bash
cp config.template.js config.js
```

Luego editar `config.js` para incluir las keys y tokens.

# Ejecutar

```
yarn start
```

