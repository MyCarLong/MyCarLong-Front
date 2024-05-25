# 베이스 이미지로 Ubuntu 24.04 사용
FROM ubuntu:24.04

# Node.js 설치 (이미 설치된 경우 스킵)
RUN apt-get update && apt-get install -y \
  curl \
  gnupg && \
  (which node || curl -fsSL https://deb.nodesource.com/setup_20.x | bash -) && \
  apt-get install -y nodejs && \
  (npm -v | grep 10.2.4 || npm install -g npm@10.2.4) && \
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

# build 결과물을 원하는 경로로 복사
RUN mkdir -p /var/www/mycarlong
RUN cp -r /app/build/* /var/www/mycarlong/


## Nginx 설정 파일 복사 (이미 존재하는 경우 스킵)
#COPY copy-nginx-config.sh /copy-nginx-config.sh
#RUN chmod +x /copy-nginx-config.sh && /copy-nginx-config.sh
#
## Nginx 포트 설정 (이미 설정된 경우 스킵)
#RUN if ! grep -q "listen 3007;" /etc/nginx/sites-available/default; then \
#      echo "server { listen 3007; root /var/www/mycarlong; index index.html; try_files \$uri \$uri/ /index.html; }" >> /etc/nginx/sites-available/default; \
#    fi
#
## Nginx 실행
#CMD ["nginx", "-g", "daemon off;"]
