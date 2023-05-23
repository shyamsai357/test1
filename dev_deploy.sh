rm -rf dist
rm dist.zip
npm run build-uat
7z a -r -tzip ./dist ./dist/*
ssh ec2-user@10.28.250.182 "sudo nginx -s stop 2>/dev/null; rm -rf /app/frontend/*; mkdir /app/frontend/dist"
scp dist.zip ec2-user@10.28.250.182:/app/frontend/dist/
ssh ec2-user@10.28.250.182 "cd /app/frontend/dist/; unzip dist.zip; rm dist.zip; sudo nginx" 
echo "=====dev deployment completed========"