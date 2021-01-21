install:
	npm install

genDiff:
	node bin/genDiff.js

test:
	npm test

test-watch:
	npm test-watch

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test