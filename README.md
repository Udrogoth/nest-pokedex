<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. recostruir los modulos
---
npm i
---

2. tener el Nest Cli installado
---
npm i -g @nestjs/cli
---

3. Levantar la base de datos
---
docker compose up -d
---

4. Recostruir la base de datos con la semilla 
GET
---
http://localhost:3000/api/v2/seed
---

##stack usado

* mongoDB
* Nest


5. docker 
```
docker-compose -f docker-compose.prod.yml --env-file .env.prod up --build
```

run
```
docker-compose -f docker-compose.prod.yml --env-file .env.prod up -d
```