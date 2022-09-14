# hcwp
## hashicorp web portal

--------------------------

### git clone https://github.com/jakeJeong31/hcwp.git

--------------------------

1. NPM
+ npm init --yes
+ npm install --global nodemon 
+ npm install --save ejs express body-parser method-override http express cors
+ npm install --global forever : ref) unstable..

2. GIT
+ git reset --hard HEAD^
+ git pull

3. REF
+ lsof -i tcp:3000
+ kill -9 [PID]

4. FOREVER
+ forever start -c nodemon .
+ forever list
+ forever stop 0(no)
