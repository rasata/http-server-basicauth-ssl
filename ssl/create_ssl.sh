#!/usr/bin/env bash
# Customize this file based on your needs

PASSPHRASE="passphrase"
DOMAIN="www.yourdomain.com"
EMAIL="youremail@address.com"

SUBJ="
C=US
ST=Connecticut
O=YourOrganization
localityName=New Haven
commonName=$DOMAIN
organizationalUnitName=
emailAddress=$EMAIL
"

sudo openssl genrsa -out "host.key" 1024
sudo openssl req -new -subj "$(echo -n "$SUBJ" | tr "\n" "/")" -key "host.key" -out "host.csr" -passin pass:$PASSPHRASE
sudo openssl x509 -req -days 365 -in "host.csr" -signkey "host.key" -out "host.crt"

# If apache, enable SSL via `sudo a2enmod ssl`, then restart `sudo service apache2 restart`
# If nginx, already enabled

# If apache, edit vhost to include HTTPS portion
# If nginx, edit vhost to include HTTPS portion
# .. and then reload relevant service