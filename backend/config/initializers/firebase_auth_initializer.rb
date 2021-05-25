# frozen_string_literal: true

FirebaseIdToken.configure do |config|
  config.redis = Redis.new(host: ENV.fetch("REDIS_HOST") { "redis" }, port: 6379)
  config.project_ids = [ENV.fetch("FIREBASE_PROJECT_ID") { "firebase_project_id" }]
end
