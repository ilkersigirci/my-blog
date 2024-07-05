#!/bin/bash

# If the branch is gh-pages, then we want to ignore the build step
if [ "$VERCEL_GIT_COMMIT_REF" == "gh-pages" ]; then 
    exit 0; 
else
    exit 1; 
fi