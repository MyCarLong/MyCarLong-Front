# 베이스 이미지로 Ubuntu 24.04 사용
FROM ubuntu:24.04
LABEL authors="KGH"
ARG buildno
ARG gitcommithash

RUN echo "Build number: $buildno"
RUN echo "Based on commit: $gitcommithash"

FROM node:20-alpine as build
# 필요한 패키지 설치 및 Node.js 설치 (이미 설치된 경우 스킵)
#RUN apt-get update && apt-get install -y \
#  curl \
#  gnupg && \
#  (which node || curl -fsSL https://deb.nodesource.com/setup_20.x | bash -) && \
#  apt-get install -y nodejs && \
#  (npm -v | grep 10.2.4 || npm install -g npm@10.2.4 pm2) && \
#  apt-get clean && \
#  rm -rf /var/lib/apt/lists/*#

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install
RUN npm install -g pm2

# 앱 소스 복사
COPY . .

# 앱 포트 설정
EXPOSE 5000

# pm2를 사용하여 서버 실행
CMD ["pm2-runtime", "server.js"]
