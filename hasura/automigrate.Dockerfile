FROM node:current

RUN mkdir /state
RUN mkdir /hasura-cli

CMD cd /hasura-cli \
    && node /hasura/scripts/slicePackage.js . \
    && npm install --silent \
    && npx hasura migrate apply --skip-update-check --project /hasura --endpoint $HASURA_ENDPOINT \
    && cd /hasura \
    && npm install --production --silent \
    && node scripts/autoseed.js
