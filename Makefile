install:
	npm install

genDiff:
	node bin/genDiff.js

test:
	npm test

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test