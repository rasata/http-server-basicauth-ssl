# http-server-basicauth-ssl: a command-line http server

`http-server-basicauth-ssl` is a simple, zero-configuration command-line securised Http Server based on :
- http-server
- BasicAuth
- SSL

The main purpose was to have the same usefull tool as http-server but with more flexibility and security.
  
It is powerful enough for production usage, but it's simple and hackable enough to be used for testing, local development, and learning.

# Installing globally:

Installation via `npm`.  If you don't have `npm` yet:

     curl https://npmjs.org/install.sh | sh
     
Once you have `npm`:

     npm install http-server-basicauth-ssl -g
     
This will install `http-server-basicauth-ssl ` globally so that it may be run from the command line.

## Usage:

     http-server-basicauth-ssl  [path] [options]

`[path]` defaults to `./public` if the folder exists, and `./` otherwise.

# Installing as a node app

     mkdir myapp
     cd myapp/
     jitsu install http-server-basicauth-ssl 

*If you do not have `jitsu` installed you can install it via `npm install jitsu -g`*

## Usage

### Starting http-server-basicauth-ssl locally

     node bin/http-server-basicauth-ssl 

*Now you can visit http://localhost:8080 to view your server*

### Deploy http-server-basicauth-ssl to nodejitsu

     jitsu deploy

*You will now be prompted for a `subdomain` to deploy your application on*

## Available Options:

`-p`                 Port to use [8080]

`-a`                 Address to use [0.0.0.0]

`-d`                 Show directory listings [true]

`-i`                 Display autoIndex [true]

`-o`                 Open browser window after staring the server

`-c`                 Set cache time (in seconds). e.g. -c10 for 10 seconds To disable caching, use -c-1.

`-e --ext`           Default file extension if none supplied [none]

`-s --silent`      Suppress log messages from output

`-h --help`          Print this list and exit.

`--user`             User name for basic authenication [none]

`--pass`             Password for basic authenication [none]

`--cors`             Enable CORS via the 'Access-Control-Allow-Origin' header

`-S --ssl`           Enable https.

`-C --cert`          Path to ssl cert file (default: cert.pem)

`-K --key`           Path to ssl key file (default: key.pem)

`-h --help`          Print this list and exit."