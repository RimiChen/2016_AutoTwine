module.exports = function ( ele, event, options ) {
  var extend = require( 'extend' );
  var opts = extend( { bubbles: true }, options );
  var setEvent = false;
  var CustomEvent = global.CustomEvent;

  if ( CustomEvent ) {
    var evt;
    try {
      evt = new CustomEvent( event, opts );
      ele.dispatchEvent( evt );
      setEvent = true;
    } catch (ex) {
      setEvent = false;
    }
  }
  if ( !setEvent ) {
    var dispatchEvent = require( 'dispatch-event' );
    dispatchEvent( ele, event, opts );
  }
};
