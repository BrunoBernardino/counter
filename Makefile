.PHONY: install
install:
	-cp -n .env.sample .env
	npm install

.PHONY: start
start:
	npm run dev

.PHONY: test
test:
	make lint
	npm run test

.PHONY: test/pretty
test/pretty:
	npm run pretty/test

.PHONY: test/ci
test/ci:
	make test/pretty
	make test

.PHONY: lint
lint:
	npm run lint

.PHONY: pretty
pretty:
	npm run pretty

.PHONY: deploy
deploy:
	vercel --scope=brn --prod

.PHONY: deploy/prod
deploy/prod:
	vercel --scope=brn alias set beta.counter.brn.sh counter.brn.sh
