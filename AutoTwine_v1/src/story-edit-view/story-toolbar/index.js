// The toolbar at the bottom of the screen with editing controls.

const Vue = require('vue');
const zoomMappings = require('../zoom-settings');
const JavaScriptEditor = require('../../editors/javascript');
const { updateStory, updatePassageInStory } = require('../../data/actions');


module.exports = Vue.extend({
	template: require('./index.html'),
	
	props: {
		story: {
			type: Object,
			required: true
		},
		
		zoomDesc: {
			type: String,
			required: true
		}
	},

	components: {
		'story-menu': require('./story-menu'),
		'story-search': require('./story-search')
	},
	
	methods: {
		setZoom(description) {
			this.updateStory(
				this.story.id,
				{ zoom: zoomMappings[description] }
			);
		},

		test() {
			window.open(
				'#stories/' + this.story.id + '/test',
				'twinestory_test_' + this.story.id
			);
		},

		play() {
			window.open(
				'#stories/' + this.story.id + '/play',
				'twinestory_play_' + this.story.id
			);
		},

		addPassage() {
			this.$dispatch('passage-create');
		},
		addGrammar(e) {
			//this.$dispatch('passage-create');
			//alert("This function opens Javascript editor");
			new JavaScriptEditor({
				data: { storyId: this.story.id, origin: e.target },
				store: this.$store
			}).$mountTo(document.body);

		},
		saveTextWhenChange(text, storyID, passageID) {
			this.updatePassageInStory(
				storyID,
				passageID,
				{ text: text }
			);
		},
		addLink() {
			//this.$dispatch('passage-create');
			console.log("This function adds links according to grammar");
			
			/*
			 * From all titles, randomly pick some words and then create links through modify context
			 */
			
			//suppose random() was called.
			//Step 1: get passage name list, picking by rules
			//Step 2: for passage list, update passage.text accordingly
			//step 3: call update

			const store = this.$store;
			const story = store.state.story.stories.find(story => story.id === this.story.id);
			//const passage = story.passages.find(passage => passage.id === passageId);
			console.log(story.name);
			const totalPassageNumber = story.passages.length;
			console.log("Total "+totalPassageNumber+" passages.");
			story.passages.forEach(passage => {
				// These are keywrods we would like to use.
				var currentPassageText = "";
				console.log(passage.name);
				// we would like to change it, so declare it as avariable.
				currentPassageText = passage.text;
				//console.log("Passage length: "+currentPassageText.length);
				
				//split by blank space.
				var textSplitArray = currentPassageText.split(" ");
				var insertIndex = 0;
				
				insertIndex = Math.floor((Math.random() * textSplitArray.length) + 1);
								
				//prevent out of index
				if(insertIndex < 0){
					insertIndex = 0;
				}
				else if(insertIndex >  textSplitArray.length -1){
					inserttIndex = textSplitArray.length -1;
				}
				else{
					// do nothing
				}
				
				// insert a link in random position of the passage.
				var insertLinkString = "[["+passage.name+"]]";
				textSplitArray.splice(insertIndex, 0, insertLinkString);
				
				var regroupText = "";
				
				textSplitArray.forEach(function(entry){
					regroupText = regroupText.concat(entry+" ");
				});
				
				//console.log(regroupText);
				
				/*
				 * call update function in here for new context.
				 */
				this.saveTextWhenChange(regroupText, story.id, passage.id);
				

/*				
//Check the string type.

				if(typeof currentPassageText === 'string'){
					console.log("The context is string, can use string processing");
				}
				else{
					console.log("The context is an Object");
				}
*/

			});
			
			
			//TODO:
			//How to undo?
			
		}	
	},

	vuex: {
		actions: {
			updateStory,
			updatePassageInStory
		}
	}
});

