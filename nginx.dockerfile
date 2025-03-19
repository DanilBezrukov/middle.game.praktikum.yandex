FROM nginx:stable-alpine

# ТОЛЬКО ДЛЯ DEV РЕЖИМА (
RUN apk add --no-cache ca-certificates openssl curl bash

RUN curl -Lo /usr/local/bin/mkcert https://github.com/FiloSottile/mkcert/releases/download/v1.4.3/mkcert-v1.4.3-linux-amd64 \
    && chmod +x /usr/local/bin/mkcert

RUN mkdir -p /etc/nginx/certs

RUN /usr/local/bin/mkcert -install && \
    /usr/local/bin/mkcert -cert-file /etc/nginx/certs/localhost.pem \
                          -key-file /etc/nginx/certs/localhost-key.pem \
                          localhost
# ТОЛЬКО ДЛЯ DEV РЕЖИМА )

COPY packages/client/nginx.conf /etc/nginx/conf.d/default.conf

# ДЛЯ ПРОДА НУЖНО СГЕНЕРИРОВАТЬ СЕРТИФИКАТЫ, ПОЛОЖИТЬ В ПАПКУ certs И РАСКОММЕНТИРОВАТЬ ПОСЛЕДНЮЮ СТРОЧКУ
# Можно сгенерировать сертификаты локально с помощью mkcert для dev и положить в туже папку
# В этом случае браузер не будет выдавать ошибку
# https://github.com/FiloSottile/mkcert/releases

# COPY certs/ /etc/nginx/certs/
