#!/bin/bash
set -e

echo "=========================================="
echo "🚀 Starting MSTI Website Automated Deployment"
echo "=========================================="

# 1. Update system packages
echo "📦 Updating system packages..."
sudo apt-get update -y
sudo apt-get upgrade -y

# 2. Install Node.js 20 LTS, Git, and Nginx
echo "📦 Installing Node.js 20, Git, and Nginx..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs nginx git

# 3. Install PM2
echo "📦 Installing PM2..."
sudo npm install -g pm2

# 4. Clone or update repository into /var/www/testingmsti
echo "📂 Setting up project in /var/www/testingmsti..."
sudo rm -rf /var/www/testingmsti
cd /var/www
sudo git clone https://github.com/rkarrow/testingmsti.git
sudo chown -R ubuntu:ubuntu /var/www/testingmsti

# 5. Setup Backend
echo "⚙️ Setting up Backend..."
cd /var/www/testingmsti/server
npm install

cat << 'EOF' > .env
PORT=5000
NODE_ENV=production
MONGO_URI=mongodb+srv://rashmikak217_db_user:Rashmika10K2026@cluster0.qqvcriy.mongodb.net/msti_maritime?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=msti_jwt_secret_key_2026_super_secure
CLIENT_URL=http://13.205.118.251
EOF

# Start backend with PM2
pm2 delete msti-backend 2>/dev/null || true
pm2 start server.js --name "msti-backend"
pm2 save
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u ubuntu --hp /home/ubuntu || true

# 6. Setup Frontend
echo "⚙️ Building React Frontend..."
cd /var/www/testingmsti/client
npm install
npm run build

# 7. Configure Nginx
echo "🌐 Configuring Nginx..."
sudo tee /etc/nginx/sites-available/default > /dev/null << 'NGINX_CONF'
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    server_name _;

    root /var/www/testingmsti/client/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /uploads/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
NGINX_CONF

# Test and reload Nginx
sudo nginx -t
sudo systemctl reload nginx

echo "=========================================="
echo "🎉 SUCCESS! Your website is now live!"
echo "🌐 Open browser and visit: http://13.205.118.251"
echo "=========================================="
