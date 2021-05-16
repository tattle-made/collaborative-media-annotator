# Roadmap

# Running Locally

`docker-compose up`
this will run redis, frontend and backend services
frontend : http://localhost:3000
backend : http://localhost:8000

Seeding the database
`docker exec -it backend node models/seed-database.js`

# Developing Locally

```
docker run redismodimage
cd src/frontend && npm run dev
cd src/backend && npm run dev
```

# TODO

UI optimizations and improvements
Database based persistant storage
