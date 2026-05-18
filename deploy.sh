#!/bin/bash
# Deploy to samsaenpao.com

# Backup database from server before deploying
echo "Backing up database..."
scp -i "01_SSH key/samsaenpao.pem" -o StrictHostKeyChecking=no \
  ubuntu@43.164.1.36:/var/www/samsaenpao/portfolio.db \
  "portfolio.db.backup"
echo "✓ Database backed up to portfolio.db.backup"

ssh -i "01_SSH key/samsaenpao.pem" -o StrictHostKeyChecking=no ubuntu@43.164.1.36 \
  "cd /var/www/samsaenpao && git pull && npm run build"
echo "✓ Deployed to samsaenpao.com"
