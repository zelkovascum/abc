require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  if Rails.env.production?
    # cloudfrontに紐づけた独自ドメイン
    config.asset_host = 'https://inzs46.com'
    config.storage :fog
    config.fog_provider = 'fog/aws'
    config.fog_directory = ENV['AWS_S3_BUCKET_NAME']
    config.fog_public = true
    config.fog_credentials = {
      provider: 'AWS',
      aws_access_key_id: ENV['AWS_ACCESS_KEY_ID'],
      aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
      region: 'ap-northeast-1',
      path_style: true
    }
  else
    config.asset_host = 'http://localhost:3000'
    config.storage = :file
    config.cache_storage = :file
  end
end

# CarrierWave.configure do |config|
#   config.asset_host = 'https://inzs46.com'
#   config.fog_credentials = {
#   provider:              'AWS',
#   aws_access_key_id:     ENV['AWS_ACCESS_KEY_ID'],
#   aws_secret_access_key: ENV['AWS_SECRET_ACCESS_KEY'],
#   use_iam_profile:       false,
#   region:                'ap-northeast-1',
#   }
#   config.fog_directory  = ENV['AWS_S3_BUCKET_NAME']
#   config.fog_public     = true
# end
