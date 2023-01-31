module.exports = {
  apps : [{
    script: 'npm start',
  },],

  deploy : {
    production : {
      key: 'key.pem',
      user : 'ubuntu',
      host : '3.8.87.30',
      ref  : 'origin/main',
      repo : 'git@github.com:ImbayaDennis/EMS.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
