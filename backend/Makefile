test:
	docker-compose run --rm api bundle exec rspec
rubocop:
	docker-compose run --rm api bundle exec rubocop
rubocop-auto:
	docker-compose run --rm api bundle exec rubocop -A
clean-db:
	docker-compose run --rm api rails db:migrate:reset
migrate:
	docker-compose run --rm api rails db:migrate
console:
	docker-compose run --rm api bundle exec rails console
seed:
	docker-compose run --rm api bundle exec rails db:seed
