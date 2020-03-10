# React Vær-applikasjon.

Dette er en liten react applikasjon som henter ut gjeldene værdate for et sett med utvalgte byer,
som man finner i "src/js/constants/cities.js". Det er bare å legge til eller fjerne byer om ønskelig.

Applikasjonen lar deg filtrere og sortere etter bynavn, temperatur, vind og regnforhold.


## Bruk

### Installasjon:

Klon eller last ned repoet.

Deretter installer de nødvendige node modulene med:

```
npm install
```


### Start utviklingsserveren:

Applikasjonen bruker webpack-devserver som utviklingsserver.

For å starte serveren kjør:

```
npm start
```

Deretter vil serveren åpnes automatisk på localhost:8080.


### Bygg for produksjon:

For å gjøre koden produksjonsklar kjør:

```
npm run build:prod
```


### Bygg for utvikling:

For å tilpasse koden for et utviklingsmiljø kjør:

```
npm run build:dev
```
