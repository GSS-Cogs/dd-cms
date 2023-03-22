FROM postgres:14

# Necessary for health checks in docker-compose.
RUN apt-get update && apt-get install -y netcat