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
    slice: function() {

               return this.pushStack( slice.apply( this, arguments ) );
           },

    first: function() {
               return this.eq( 0 );
           },

    last: function() {
              return this.eq( -1 );
          },

    eq: function( i ) {
            var len = this.length,
                j = +i + ( i < 0 ? len : 0 );
            return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
        },

    end: function() {
             return this.prevObject || this.constructor( null );
         },

    push: push,
    sort: arr.sort,
    splice: arr.splice,

};

kQuery.extend = kQuery.fn.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[ 0 ] || {},
        i = 1,
        length = arguments.length,
        deep = false;

    if ( typeof target === "boolean" ) {
        deep = target;
        target = arguments[ 1 ] || {};
        i++;
    }

    if ( typeof target !== "object" && !kQuery.isFunction( target ) ) {
        target = {};
    }

    if ( i === length ) {
        target = this;
        i--;
    }

    for ( ; i < length; i++ ) {
        if ( (options = arguments[ i ]) != null ) {
            for ( name in options ) {
                src = target[ name ];
                copy = options[ name ];

                if ( target === copy ) {
                    continue;
                }

                if ( deep && copy && ( kQuery.isPlainObject(copy) || (copyIsArray = kQuery.isArray(copy)) ) ) {
                    if ( copyIsArray ) {
                        copyIsArray = false;
                        clone = src && kQuery.isArray(src) ? src : [];
                    } else {
                        clone = sec && kQuery.isPlainObject(src) ? src : {};
                    }
                    target[ name ] = kQuery.extend( deep, clone, copy );
                } else if ( copy !== undefined ) {
                    target[ name ] = copy;
                }
            }
        }
    }
    return target;
};

kQuery.extend({

    expando: "kQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

    isReady: true,

    error: function( msg ) {
        throw new Error( msg );
    },

    noop: function(){},

    isFunction: function( obj ) {
        return kQuery.type( obj ) === "function";
    },

    isArray: Array.isArray,

    isWindow: function( obj ) {
        return obj != null && obj === obj.window;
    },

    isNumeric: function( obj ) {
                   return !kQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
               },
});
};
}));
