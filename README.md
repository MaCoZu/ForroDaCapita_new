<!-- Start the database in docker -->
docker-compose -f docker/docker-compose.yml up -d
docker run -d -p 27017:27017 --name tina-mongo mongo:latest


<!-- Run in local mode to skip Mongo -->
TINA_PUBLIC_IS_LOCAL=true pnpm dev
TINA_PUBLIC_IS_LOCAL=false pnpm dev

<!-- To compile and validate your schema, generate the client, and ensure content indexing -->
npx tinacms build

<!-- Port 9000 Already in Use -->
lsof -i :9000
kill -9 <PID>
