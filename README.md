# hcwp
## hashicorp web portal

--------------------------

### git clone https://github.com/jakeJeong31/hcwp.git

--------------------------

1. NPM
+ npm init --yes
+ npm install --global nodemon 
+ npm install --save ejs express body-parser method-override http express cors
+ npm install pm2 -g

2. GIT
+ git reset --hard HEAD^
+ git pull

3. REF
+ lsof -i tcp:3000 (포트 사용 확인)
+ kill -9 [PID] (프로세스 강제주이)

4. PM2
+ pm2 start index.js (/hcwp 경로에서)
+ pm2 save (실행 후 상태 저장)
+ pm2 monit (모니터링)
+ pm2 stop 0 (중단)


9. Bootstrap Theme
+ https://themewagon.com/themes/corona-free-responsive-bootstrap-4-admin-dashboard-template/
