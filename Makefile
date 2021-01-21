install:
	npm install

genDiff:
	node bin/genDiff.js

test:
	npx -n --experimental-vm-modules jest

test-watch:
	npm test-watch

lint:
	npx eslint .

publish:
	npm publish --dry-run

.PHONY: test