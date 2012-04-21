	var base 	= require('base-framework'),
		dmp		= require('./diff_match_patch.js').diffMatchPatch,
		_ 		= require('underscore');

	var patchy = base.createChild();

	patchy.addInstanceMethods({

		init : function(){

			this.dmp = new dmp();

		},

		makePatch: function( a, b ){

			return this.dmp.patch_toText(this.dmp.patch_make(a, b));

		},

		applyPatch : function( text, patchData ){

			var output = text, patches, self = this;

			if(_.isArray(patchData)){

				_.each(patchData, function(patch){

					patches = self.dmp.patch_fromText(patch);

					output = self.dmp.patch_apply(patches, output)[0];

				});

			}else {
				
				patches = this.dmp.patch_fromText(patchData);

				output = this.dmp.patch_apply(patches, output)[0];

			}

			return output;


		}

	});


	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
		  exports = module.exports = patchy;
		}
		 exports.patchy = patchy;
	}