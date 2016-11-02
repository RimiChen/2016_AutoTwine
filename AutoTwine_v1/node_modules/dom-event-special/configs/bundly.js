module.exports = function () {
  return {
    options: {
      preBundleCB: function ( b ) {
        b.transform( 'require-arr' );
        b.transform( 'dot-ify');
      }
    },
    'demo': {
      src: 'src/demo.js',
      dest: 'dist/demo.js'
    },
    'tests-includes': {
      src: 'test-helpers/includes.js',
      dest: 'tests-dist/includes.js'
    },
    'tests': {
      src: 'tests/all.js',
      dest: 'tests-dist/all.js'
    }
  };
};
