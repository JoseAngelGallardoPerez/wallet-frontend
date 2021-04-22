const { writeFile } = require('fs');
const { argv } = require('yargs');

// Would be passed to script like this:
// `ts-node set-env.ts --environment=dev`
// we get it from yargs's argv object
const environment = argv.environment;
const isProd = environment === 'prod';

const targetPath = environment === 'dev'
  ? `./src/environments/environment.ts`
  : `./src/environments/environment.${environment}.ts`;

let domainName = '';
if (process.env.API_BASE_URL) {
  const url = new URL(process.env.API_BASE_URL);
  domainName = url.hostname;
}


const envConfigFile = `
export const environment = {
  production: ${isProd},
  envName: '${environment}',
  baseUrl: '/',
  apiHost: 'API_BASE_URL_TO_REPLACE',
  whitelistedDomains: ['WHITELISTED_DOMAIN_TO_REPLACE'],
};
`;

writeFile(targetPath, envConfigFile, function (err) {
  if (err) {
    console.log(err);
  }

  console.log(`Output generated at ${targetPath}`);
});
