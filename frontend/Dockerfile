FROM node:14.17.0-buster-slim

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo
ENV HOME /home/user
ENV APP_ROOT "${HOME}/src"
ARG USER_ID=1001
ARG GROUP_ID=1001
RUN mkdir -p "${APP_ROOT}" && \
  chown -R "${USER_ID}":"${GROUP_ID}" "${HOME}"
WORKDIR "${APP_ROOT}"
RUN echo "Creating with UID : $USER_ID, GID: $GROUP_ID" && \
  useradd -l -u $USER_ID -o -m user && \
  groupmod -g $GROUP_ID user

RUN apt-get update && \
  apt-get upgrade -y && \
  apt-get install --no-install-recommends -y build-essential=12.6 \
  ca-certificates \
  curl=7.64.0-4+deb10u2 \
  tzdata=2021a-0+deb10u1 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

ARG ARG_COMPOSE_WAIT_VER=2.9.0
RUN curl -SL https://github.com/ufoscout/docker-compose-wait/releases/download/${ARG_COMPOSE_WAIT_VER}/wait -o /wait && \
  chmod +x /wait

USER user:user
EXPOSE 3000

COPY package.json package-lock.json ${APP_ROOT}/
RUN npm install

COPY . ${APP_ROOT}/