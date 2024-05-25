# 베이스 이미지로 Ubuntu 24.04 사용
FROM ubuntu:24.04
LABEL authors="KGH"
# 필요한 패키지 설치
RUN apt-get update && apt-get install -y \
  curl \
  gnupg && \
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
  apt-get install -y nodejs && \
  npm install -g npm@10.2.4 pm2 && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 앱 소스 복사
COPY . .

# 앱 포트 설정
EXPOSE 5000

# pm2를 사용하여 서버 실행
CMD ["pm2-runtime", "server.js"]
