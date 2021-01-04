install:
	npm install

genDiff:
	node bin/genDiff.js

lint:
	npx eslint .

publish:
	npm publish --dry-run