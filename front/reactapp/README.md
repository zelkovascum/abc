# prod

npm run build
aws s3 cp ./build s3://バケット名 --recursive
