/*
 *******************************
 *kquery.js
 *******************************
 */
(function( global, factory ) {
    if ( typeof module === "object" && typeof module.exports === "object" ) {
        module.exports = global.document ?
                factory( glocal, true ) :
                function( w ) {
                    if ( !w.document ) {
                        throw new Error( "jQuery requires a window with a document" );
                    }
                    return factory( w );
                };
    } else {
        factory( global );
    }
}( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

    var arr = [];

    var slice = arr.slice;

    var concat = arr.concat;

    var push = arr.push;
    
    var indexOf = arr.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var support = {};

    var document = window.document,

        version = "2.1.3.k",

        kQuery = function( selector, context ) {
            return new kQuery.fn.init( selector, context );
        },

        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        rmsPrefix = /^-ms-/,

        rdashAlpha = /-([\da-z])/gi,

        fcamelCase = function( all, letter ) {
            return letter.toUpperCase();
        };

kQuery.fn = kQuery.prototype = {

    kquery: version,

    constructor: kQuery,

    selector: "",

    length: 0,

    toArray: function() {
        return slice.call( this );
    },

    get: function( num ) {
             return num != null ?

                 ( num < 0 ? this[ num + this.length ] : this[ num ] ) :

                 slice.call( this );
         },

    pushStack: function( elems ) {

                   var ret = kQuery.merge( this.constructor(), elems );

                   ret.preObject = this;

                   ret.context = this.context;

                   return ret;
               },

    each: function( callback, args ) {
              return kQuery.each( this, callback, args );
          },

    map: function( callback ) {
             return this.pushStack( kQuery.map( this, function( elem, i ) {
                 return callback.call( elem, i, elem );
             }));
         },


}));
