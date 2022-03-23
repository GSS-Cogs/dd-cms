#!/bin/bash
patch --quiet -p0 -N node_modules/razzle/config/createJestConfig.js < patches/razzle-jest.patch
patch --quiet -p0 -N node_modules/@plone/volto/razzle.config.js < patches/plone-addons.patch
patch --quiet -p0 -N node_modules/@plone/volto/addon-registry.js < patches/addon-registry.js.patch
