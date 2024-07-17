const { spawn } = require('child_process');

// Fonction utilitaire pour rediriger la sortie d'un processus enfant
function redirectOutput(childProcess) {
  childProcess.stdout.on('data', (data) => {
    process.stdout.write(data.toString());
  });
  childProcess.stderr.on('data', (data) => {
    process.stderr.write(data.toString());
  });
}

// Démarrer le serveur Node.js
const server = spawn('node', [ './node-ipinfo-server/server.js' ]);
redirectOutput(server);

const delay = 5000; // Délai en millisecondes (par exemple, 5000 ms = 5 secondes)

setTimeout(() => {
  // Démarrer l'application React après le délai
  const reactApp = spawn('npm', [ 'run', 'dev' ], {
    cwd: './node-ipinfo',
    stdio: 'inherit'
  });

  // Gérer la fermeture propre des processus enfants lorsque le processus principal est terminé
  const handleExit = (signal) => {
    if(signal) {
      console.log(`Received signal ${ signal }. Shutting down...`);
    }
    server.kill();
    reactApp.kill();
    process.exit();
  };

  process.on('SIGINT', handleExit);
  process.on('SIGTERM', handleExit);
  process.on('exit', handleExit);
}, delay);

// Optionnel : pour fermer proprement les processus enfants lorsque le script principal est arrêté
process.on('exit', () => {
  server.kill();
  reactApp.kill();
});
