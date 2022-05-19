- production
  entrypoint.sh
  config/database.yml
  Dockerfile.prod

  docker build -t my-rails -f Dockerfile.prod --platform linux/amd64 .
