// require('f-tasks/test-helpers/test-helper.js');
// require('f-tasks/test-helpers/mocha-custom-matchers.js');
require( 'mocha-runner/lib/chai-init' );

var isBroken = require( 'phantom-ownpropertynames/detect' );
if ( isBroken ) {
  Object.getOwnPropertyNames = function ( obj ) {
    return Object.keys( obj );
  };
}

var oldit = global.it;
var counter = 0;
global.it = function ( name, callback ) {
  counter++;
  oldit && oldit.call( null, counter + '. ' + name, callback );
};

var $ = require('jquery');

beforeEach( function ( done ) {
  var me = this;
  me.$fixtures = $( '<div id="fixtures"></div>' ).appendTo( 'body' );
  done && done();
} );

afterEach( function ( done ) {
  var me = this;
  me.$fixtures && me.$fixtures.remove();
  me.$fixtures = null;
  done && done();
} );
