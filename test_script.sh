#!/bin/bash

# seed database
echo ""
echo '\x1b[31;1mSeeding Test Database\x1b[0m'

mongorestore  --collection tests --db directors_api mongo_dump/tests.bson

# run specs
echo ""
echo '\x1b[31;1mRunning unit tests\x1b[0m'

jasmine-node spec/

# drop database
echo ""
echo '\x1b[31;1mDropping Test Database\x1b[0m'

mongo directors_api --eval "db.tests.drop()"