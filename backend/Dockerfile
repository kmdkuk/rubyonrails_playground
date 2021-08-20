FROM ruby:3.0.1-slim

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo
ENV HOME /home/user
ENV APP_ROOT ${HOME}/src
ARG USER_ID=1000
ARG GROUP_ID=1000
RUN mkdir -p "${APP_ROOT}" && \
    chown -R "${USER_ID}":${GROUP_ID} "${HOME}"
WORKDIR "${APP_ROOT}"
RUN echo "Creating with UID : $USER_ID, GID: $GROUP_ID" && \
    useradd -l -u $USER_ID -o -m user && \
    groupmod -g $GROUP_ID user

ARG WITHOUT_ENV=test\ development

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install --no-install-recommends -y build-essential=12.6 \
                                               libmariadb-dev \
                                               curl=7.64.0-4+deb10u2 \
                                               tzdata=2021a-0+deb10u1 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ARG ARG_COMPOSE_WAIT_VER=2.9.0
RUN curl -SL https://github.com/ufoscout/docker-compose-wait/releases/download/${ARG_COMPOSE_WAIT_VER}/wait -o /wait && \
    chmod +x /wait

ARG ARG_BUNDLER_VERSION="2.2.17"
RUN gem update --system && \
    gem install bundler:${ARG_BUNDLER_VERSION}

USER user:user

COPY Gemfile Gemfile.lock "${APP_ROOT}"/
RUN bundle config set --local without "${WITHOUT_ENV}" && \
    bundle config set --local path "${HOME}/vendor/bundle" && \
    bundle install -j"$(getconf _NPROCESSORS_ONLN)"

COPY . ${APP_ROOT}/
