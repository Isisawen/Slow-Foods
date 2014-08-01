bundle:
	mkdir -p ./build;
	./node_modules/.bin/browserify ./public/js/app.js > ./public/js/app.bundle.js
