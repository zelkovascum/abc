- production
  entrypoint.sh
  config/database.yml

  docker build -t my-rails -f Dockerfile.prod --platform linux/amd64 .
