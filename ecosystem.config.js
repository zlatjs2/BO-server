module.exports = {
  apps : [{
    name: 'BO-Server',
    script: 'src/app.js',
    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    // args: 'one two',
    instances: 1,
    autorestart: true,
    watch: true,
    max_memory_restart: '1G',
    env: {
      PORT: 9001,
      NODE_ENV: 'development',
      DEBUG: 'BO-server:*',
      DEBUG_FD: 1
    },
    env_production: {
      PORT: 9001,
      NODE_ENV: 'production'
    }
  }],
};
