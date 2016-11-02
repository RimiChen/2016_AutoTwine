var cache = { };
var idGen = require( './id-gen' );
var getId = idGen.create( 'dom-ele' );

function getCache( ele, event, _cache ) {

  var eleId;

  if ( ele === document ) {
    eleId = 'document';
  }

  if ( ele === window ) {
    eleId = 'window';
  }

  if ( !eleId ) {
    eleId = ele.getAttribute( 'x-des-id' );

    if ( !eleId ) {
      eleId = getId();
      ele.setAttribute( 'x-des-id', eleId );
    }
  }

  _cache[ eleId ] = _cache[ eleId ] || { };

  if ( !event ) {
    return _cache[ eleId ];
  }

  _cache[ eleId ][ event ] = _cache[ eleId ][ event ] || { };

  return _cache[ eleId ][ event ];
}

module.exports = {
  getCache: function ( ele, event ) {
    return getCache( ele, event, cache );
  }
};
