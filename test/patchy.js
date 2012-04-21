	var should = require('should'),
		patchy = require('../lib/patchy.js');


	describe('Patchy the patchy patcher', function(){

		describe('Making patches', function(){

			it('can generate text patches', function(){

				var patcher = patchy();

				should.exist(patcher.makePatch);

				patcher.makePatch('', 'Hello world')
					.should.equal('@@ -0,0 +1,11 @@\n+Hello world\n');

				patcher.makePatch('Hello world', 'Goodbye cruel world')
					.should.equal('@@ -1,9 +1,17 @@\n-Hello\n+Goodbye cruel\n  wor\n');

				patcher.makePatch('Goodbye cruel world', 'Goodbye cruel world, we\'ll miss you')
					.should.equal('@@ -12,8 +12,24 @@\n el world\n+, we\'ll miss you\n')
			
			});

			it('can apply text patches', function(){

				var patcher = patchy();

				patcher.applyPatch('', '@@ -0,0 +1,11 @@\n+Hello world\n')
					.should.equal('Hello world');

				patcher.applyPatch('Hello world', '@@ -1,9 +1,17 @@\n-Hello\n+Goodbye cruel\n  wor\n')
					.should.equal('Goodbye cruel world');

				patcher.applyPatch('Goodbye cruel world', '@@ -12,8 +12,24 @@\n el world\n+, we\'ll miss you\n')
					.should.equal('Goodbye cruel world, we\'ll miss you')



			});

			it('can apply an array of patches to get a single end result', function(){

				var patcher = patchy();

				patcher.applyPatch('', [
					'@@ -0,0 +1,11 @@\n+Hello world\n',
					'@@ -1,9 +1,17 @@\n-Hello\n+Goodbye cruel\n  wor\n',
					'@@ -12,8 +12,24 @@\n el world\n+, we\'ll miss you\n'
				]).should.equal('Goodbye cruel world, we\'ll miss you');

			})

		});

	});

/*


'' -> 'Hello world'
'@@ -0,0 +1,11 @@\n+Hello world\n'


'Hello world' -> 'Goodbye cruel world'
'@@ -1,9 +1,17 @@\n-Hello\n+Goodbye cruel\n  wor\n'

'Goodbye cruel world' -> 'Goodbye cruel world, we\'ll miss you'
'@@ -12,8 +12,24 @@\n el world\n+, we\'ll miss you\n'

*/