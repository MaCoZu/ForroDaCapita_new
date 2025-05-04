<!-- Start the database in docker -->
docker-compose -f docker/docker-compose.yml up -d


<!-- Run in local mode to skip Mongo -->
TINA_PUBLIC_IS_LOCAL=true pnpm dev

<!-- To compile and validate your schema, generate the client, and ensure content indexing -->
npx tinacms build

<!-- Port 9000 Already in Use -->
lsof -i :9000
kill -9 <PID>
