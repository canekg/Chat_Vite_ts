install:
	npm ci
	
start-frontend:
	npm run dev

start-backend:
	npx start-server -s ./dist

start:
	make start-backend & make start-frontend

build: 
	npm run build