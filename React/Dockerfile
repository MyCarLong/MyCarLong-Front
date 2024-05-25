# 베이스 이미지로 Ubuntu 24.04 사용
FROM ubuntu:24.04

# Node.js 20.x 설치
RUN apt-get update && apt-get install -y \
  curl \
  gnupg && \
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
  apt-get install -y nodejs && \
  npm install -g npm@10.2.4 && \
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

# 빌드 실행
RUN npm run build
LABEL authors="KGH"
# Nginx 설치
RUN apt-get update && apt-get install -y nginx && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

# 원하는 경로에 디렉토리 생성 및 파일 복사
RUN mkdir -p /var/www/mycarlong
COPY --from=0 /app/build /usr/share/nginx/html
COPY --from=0 /app/build/index.html /var/www/mycarlong/index.html

# Nginx 설정 파일 복사
COPY nginx.conf /etc/nginx/sites-available/default

# Nginx 포트 설정
EXPOSE 80 443

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]