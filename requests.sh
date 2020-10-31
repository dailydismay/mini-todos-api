#!/bin/bash

curl -X POST \
  http://localhost:8000/todos \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d "{
	\"title\": \"hello\",
	\"order\": 1
}" && curl -X POST \
  http://localhost:8000/todos \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d "{
	\"title\": \"hello\",
	\"order\": 2
}" && curl -X POST \
  http://localhost:8000/todos \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \

  -d "{
	\"title\": \"hello\",
	\"order\": 3
}" && curl -X POST \
  http://localhost:8000/todos \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d "{
	\"title\": \"hello\",
	\"order\": 4
}" && curl -X POST \
  http://localhost:8000/todos \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d "{
	\"title\": \"hello\",
	\"order\": 5
}"

curl -X POST \
  http://localhost:8000/todos \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d "{
	\"title\": \"hello3\",
	\"order\": 1
}" && curl -X POST \
  http://localhost:8000/todos \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d "{
	\"title\": \"hello3\",
	\"order\": 2
}" && curl -X POST \
  http://localhost:8000/todos \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d "{
	\"title\": \"hello3\",
	\"order\": 3
}" && curl -X POST \
  http://localhost:8000/todos \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d "{
	\"title\": \"hello3\",
	\"order\": 4
}" && curl -X POST \
  http://localhost:8000/todos \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d "{
	\"title\": \"hello3\",
	\"order\": 5
}"

