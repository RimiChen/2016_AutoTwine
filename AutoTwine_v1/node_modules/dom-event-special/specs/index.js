describe( 'dom-event-special', function () {
  var evt = require( '../' );
  var $ = require( 'jquery' );
  var query = require( 'dom-query' );

  it( 'should bind a delegated event', function () {
    var me = this;

    var tpl = require( './box.tpl' ).render();

    $( tpl ).appendTo( '#fixtures' );

    var spyEvent = me.sandbox.spy();

    evt.on( query( '.box' ), 'click', '.button', spyEvent );

    evt.fire( query( '.button.ok' ), 'click' );

    expect( spyEvent ).to.have.been.called;

  } );

  it( 'should register an event lifecycle', function () {
    var me = this;

    var tpl = require( './box.tpl' ).render();

    $( tpl ).appendTo( '#fixtures' );

    var spyEvent = me.sandbox.spy();

    var lifecycle = { setup: me.sandbox.spy(), add: me.sandbox.spy() };

    evt.register( 'click', lifecycle );

    var secondSpy = me.sandbox.spy();

    evt.on( query( '.box' ), 'click', '.button', spyEvent );
    evt.on( query( '.box' ), 'click', secondSpy );

    evt.fire( query( '.button.ok' ), 'click' );

    expect( spyEvent ).to.have.been.called;
    expect( lifecycle.setup ).to.have.been.calledOnce;
    expect( lifecycle.add ).to.have.been.calledTwice;

  } );
} );
