FROM ruby:3.0.1-slim

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo
ENV APP_ROOT /src
RUN mkdir -p "${APP_ROOT}"
WORKDIR "${APP_ROOT}"

ARG WITHOUT_ENV=test\ development

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y build-essential \
                       libmariadb-dev \
                       curl \
                       tzdata

ARG ARG_COMPOSE_WAIT_VER=2.9.0
RUN curl -SL https://github.com/ufoscout/docker-compose-wait/releases/download/${ARG_COMPOSE_WAIT_VER}/wait -o /wait
RUN chmod +x /wait

ARG ARG_BUNDLER_VERSION="2.2.17"
RUN gem update --system && \
    gem install bundler:${ARG_BUNDLER_VERSION}

COPY Gemfile Gemfile.lock ${APP_ROOT}/
RUN bundle install -j$(getconf _NPROCESSORS_ONLN) --without ${WITHOUT_ENV}

RUN chown -R 1000:1000 /usr/local/bundle 
RUN chown -R 1000:1000 /tmp

USER 1000:1000

COPY . ${APP_ROOT}/
