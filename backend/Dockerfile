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
                       tzdata

COPY Gemfile Gemfile.lock ${APP_ROOT}/
RUN bundle install -j$(getconf _NPROCESSORS_ONLN) --without ${WITHOUT_ENV}

COPY . ${APP_ROOT}/
