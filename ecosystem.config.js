module.exports = {
  apps : [{
    script: 'npm start',
  },],

  deploy : {
    production : {
      key: 'id_rsa.pem',
      user : 'HRMS',
      host : '192.168.3.166',
      ref  : 'origin/main',
      repo : 'git@github.com:ImbayaDennis/ems.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && npm run build && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
