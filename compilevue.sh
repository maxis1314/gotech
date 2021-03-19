#!/bin/bash
cd vue_admin_template
npm run build:prod
cd ..
cp -rf vue_admin_template/dist/* public/
#cp -rf vue_admin_template/dist/* /nginxstatic/static/
#chmod -R 777 /nginxstatic/


