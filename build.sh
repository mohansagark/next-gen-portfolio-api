#!/bin/bash

# Enable Corepack for Yarn 4.x support
corepack enable

# Install dependencies
yarn install

# Build the project  
yarn build
