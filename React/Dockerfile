# 베이스 이미지로 Ubuntu 24.04 사용
FROM ubuntu:24.04
LABEL authors="KGH"
ARG buildno
ARG gitcommithash

RUN echo "Build number: $buildno"
RUN echo "Based on commit: $gitcommithash"

# Node.js 설치 (이미 설치된 경우 스킵)
FROM node:20-alpine as build
#RUN apt-get update && apt-get install -y \
#  curl \
#  gnupg && \
#  (which node || curl -fsSL https://deb.nodesource.com/setup_20.x | bash -) && \
#  apt-get install -y nodejs && \
#  (npm -v | grep 10.2.4 || npm install -g npm@10.2.4) && \
#  apt-get clean && \
#  rm -rf /var/lib/apt/lists/*

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 앱 소스 복사
COPY . .

# 빌드 실행
RUN npm run build


FROM nginx:stable-alpine
# Nginx 설치
RUN #apt-get update && apt-get install -y nginx && \
#  apt-get clean && \
#  rm -rf /var/lib/apt/lists/*

# 원하는 경로에 디렉토리 생성
RUN mkdir -p /var/www/mycarlong

# build 결과물을 Nginx 경로로 복사
#RUN cp -r /app/build/* /var/www/mycarlong/
COPY --from=build /app/build /var/www/mycarlong

# 기본 설정 파일 삭제#
#RUN rm /etc/nginx/conf.d/default.conf
#RUN rm /etc/nginx/conf.d/default
RUN #rm /etc/nginx/sites-available/default.conf
RUN rm -f /etc/nginx/sites-available/default
RUN rm -f /etc/nginx/conf.d/*.conf

# Nginx 설정 파일 복사
#COPY ./mycarlong.conf /etc/nginx/conf.d/mycarlong.conf
COPY nginx/mycarlong.conf /etc/nginx/conf.d
COPY nginx/nginx.conf /etc/nginx/nginx.conf
#COPY mycarlong.conf /etc/nginx/conf.d/mycarlong.conf
#COPY mycarlong.conf /etc/nginx/conf.d/

EXPOSE 80

#nginx 실행하기
COPY start.sh /start.sh
RUN chmod +x /start.sh
CMD ["/start.sh"]