#!/bin/sh

REPO_URL=$(jq -r '.pullrequest.source.repository.full_name' $TRIGGER_PAYLOAD)

PR_ID=$(jq -r '.pullrequest.id' $TRIGGER_PAYLOAD)
PR_TITLE=$(jq -r '.pullrequest.title' $TRIGGER_PAYLOAD)


TARGET_BRANCH_NAME=$(jq -r '.pullrequest.destination.branch.name' $TRIGGER_PAYLOAD)

SOURCE_BRANCH_NAME=$(jq -r '.pullrequest.source.branch.name' $TRIGGER_PAYLOAD)
SOURCE_COMMIT_SHA=$(jq -r '.pullrequest.source.commit.hash' $TRIGGER_PAYLOAD)

function status() {
    STATUS=$1
    echo "{\"state\":\"$STATUS\",\"key\":\"$PR_TITLE\",\"name\":\"PR $PR_ID: $SOURCE_BRANCH_NAME → $TARGET_BRANCH_NAME\",\"url\":\"$CI_PIPELINE_URL\",\"description\":\"description\"}" > build.json

    curl -u $BITBUCKET_USER:$BITBUCKET_TOKEN \
        -H "Content-Type:application/json" \
        -X POST https://api.bitbucket.org/2.0/repositories/$REPO_URL/commit/$SOURCE_COMMIT_SHA/statuses/build/ \
        -d @build.json
}
