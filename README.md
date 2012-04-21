#Patchy

## Intro

Patchy uses Google's DiffMatchPatch code to provide two basic, easy to use methods:

### The Code

To install

	npm install patchy
	cd node_modules/patchy
	npm install

To use

	// get a patchy object
	var patchy = require('patchy');

	// make a patch: makePatch( original_string, new_string ); 
	patchy.makePatch('', 'Hello world'); // returns '@@ -0,0 +1,11 @@\n+Hello world\n'

	// apply a patch: applyPatch( original_string, patch_string );
	patchy.applyPatch('', '@@ -0,0 +1,11 @@\n+Hello world\n'); // returns 'Hello world'

	// apply an array of patches: applyPatch(original_string, array_of_patch_strings );
	patchy.applyPatch('', [
		'@@ -0,0 +1,11 @@\n+Hello world\n',
		'@@ -1,9 +1,17 @@\n-Hello\n+Goodbye cruel\n  wor\n',
		'@@ -12,8 +12,24 @@\n el world\n+, we\'ll miss you\n'
	]);
	// returns "Goodbye cruel world, we'll miss you"

### Run the tests

You need mocha and should.js. Google's DiffMatchPatch is extensively unit-tested so these tests merely
confirm that patchy isn't adding or removing anything

	make test
