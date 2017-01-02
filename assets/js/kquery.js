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
                   // 判断是否是可计数的。
                   return !kQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
               },

    isPlainObject: function( obj ) {

                       if ( kQuery.type( obj ) !== "object" || obj.nodeType || kQuery.iswindow( obj ) ) {
                           return false;
                       }

                       if ( obj.constructor && !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
                           return false;
                       }

                       return true;

                   },

    isEmptyObject: function( obj ) {
                       var name;
                       for ( name in obj ) {
                           return false;
                       }
                       return true;
                   },

    type: function( obj ) {
              if ( obj == null ) {
                  return obj + "";
              }

              return typeof obj == "object" || typeof obj === "function" ?
                  class2type[ toString.call(obj) ] || "object" :
                  typeof obj;
          },

    globalEval: function( code ) {
                    var script,
                        indirect = eval;

                    code = kQuery.trim( code );

                    if ( code ) {

                        if ( code.indexOf("use strict") === 1 ) {
                            script = document.createElement("script");
                            script.text = code;
                            document.head.appendChild( script ).parentNode.removeChild( script );
                        } else {

                            indirect( code );
                        }
                    }
                },

    camelCase: function( string ) {
                   return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
               },

    nodeName: function( elem, name ) {
                  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
              },

    each: function( obj, callback, args ) {
              var value,
                    i = 0,
                    length = obj.length,
                    isArray = isArrayLike( obj );

              if ( args ) {
                  if ( isArray ) {
                      for ( ; i < length; i++ ) {
                          value = callback.apply( obj[ i ], args );

                          if ( value === false ) {
                              break;
                          }
                      }
                  } else {
                      for ( i in obj ) {
                          value = callback.apply( obj[ i ], args );

                          if ( value === false ) {
                              break;
                          }
                      }
                  }

              } else {
                  if ( isArray ) {
                      for( ; i < length; i++ ) {
                          value = callback.call( obj[ i ], i, obj[ i ] );

                          if ( value === false ) {
                              break;
                          }
                      }
                  } else {
                      for ( i in obj ) {
                          value = callback.call( obj[ i ], i, obj[ i ] );

                          if ( value === false ) {
                              break;
                          }
                      }
                  }
              }
              return obj;
          },

    trim: function( text ) {
              return text == null ?
                  "" :
                  ( text + "" ).replace( rtrim, "" );
          },


    makeArray: function( arr, results ) {
                   var ret = results || [];

                   if ( arr != null ) {
                       if ( isArraylike( Object(arr) ) ) {
                           kQuery.merge( ret,
                                   typeof arr === "string" ?
                                   [ arr ] : arr
                                   );
                       } else {
                           push.call( ret, arr );
                       }
                   }

                   return ret;
               },

    inArray: function( elem, arr, i) {
                 return arr == null ? -1 : indexOf.call( arr, elem, i );
             },

    merge: function( first, second ) {
               var len = +second.length,
                   j = 0,
                   i = first.length;

               for( ; j < len; j++ ) {
                   //注意这里的i＋＋；
                   first[ i++ ] = second[ j ];
               }
                //这时的i值为两个数组的总长度。
               first.length = i;

               return first;
           },
            
    grep: function( elems, callback, invert ) {
              var callbackInverse,
                    matches = [],
                    i = 0,
                    length = elems.length,
                    callbackExpect = !invert;
              
              for ( ; i < length; i++ ) {
                  callbackInverse = !callback( elems[ i ], i );
                  if ( callbackInverse !== callbackExpect ) {
                      matches.push( elems[ i ] );
                  }
              }

              return matches;
          },

    map: function( elems, callback, arg ) {
              var value,
                    i = 0,
                    length = elems.length,
                    isArray = isArrayLike( elems ),
                    ret = [];

              if ( isArray ){
                  for ( ; i < length; i++ ) {
                      value = callback( elems[ i ], i, arg );

                      if ( value !=null ) {
                          ret.push( value );
                      }
                  }
              } else {
                  for ( i in elems ) {
                      value = callback( elems[ i ], i, arg );

                      if ( value != null ) {
                          ret.push( value );
                      }
                  }
              }

              return concat.apply( [], ret );
         },

    guid: 1,

    proxy: function( fn, context ) {
        var tmp, args, proxy;

        if ( typeof context === "string" ) {
            tmp = fn[ context ];
            context = fn;
            fn = tmp;
        }

        if ( !kQuery.isFunction( fn ) ) {
            return undefined;
        }

        args = slice.call( arguments, 2 );
        proxy = function() {
            return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
        };

        proxy.guid = fn.guid = fn.guid || kQuery.guid++;

        return proxy;
    },

    now: Date.now,

    support: support
                    
                    
    
});

kQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(i, name){
    class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArrayLike( obj ) {
    var length = obj.length,
        type = kQuery.type( obj );

    if ( type === "function" || kQuery.isWindow( obj ) ) {
        return false;
    }

    if ( obj.nodeType === 1 && length ) {
        return true;
    }

    return type === "array" || length === 0 || typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}

var Sizzle = (function( window ) {

var i,
    support,
    Expr,
    getText,
    tokenize,
    compile,
    select,
    outermostContext,
    sortInput,
    hasDuplicate,

    setDocument,
    document,
    docElem,
    documentIsHTMl,
    rbuggyQSA,
    rbuggyMatches,
    matches,
    contains,

    expando = "sizzle" + 1 * new Date(),
    preferredDoc = window.document,
    dirruns = 0,
    done = 0,
    classCache = createCache(),
    tikenCache = createCache(),
    compilerCache = createCache(),

    sortOrder = function( a, b ) {
        if ( a === b ) {
            hasDuplicate = true;
        }
        return 0;
    },

    MAX_NEGATIVE = 1 << 31,

    hasOwn = ({}).hasOwnProperty,
    arr = [],
    pop = arr.pop,
    push_native = arr.push,
    push = arr.push,
    slice = arr.slice,

    indexOf = function( list, elem ) {
        var i = 0,
            len = list.length;
        for ( ; i < len; i++ ) {
            if ( list[ i ] === elem ) {
                return i;
            }
        }
        return -1;
    },

    blooleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

    whitespace = "[\\x20\\t\\r\\n\\f]",

    characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",


    identifier = characterEncoding.replace( "w", "w#" ),
    
    attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
        "*([*^$|!~]?=)" + whitespace +
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace + 
        "*\\]",

    pseudos = ":(" + characterEncoding + ")(?:\\((" +
        "('((?:\\\\.|[^\\\\']*)'|\"((?:\\\\.|[^\\\\.|[^\\\\\"])*)\")|" +
        "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" 
        ".*" +
        ")\\)|)",

    rwhitespace = new RegExp( whitespace + "+", "g" ),
    rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
    rcoma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
    rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
    rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
    rpseudo = new RegExp( pseudos ),
    ridentifier = new RegExp( "^" + identifier + "$" ),

    matchExpr = {
        "ID": new RegExp( "^#(" + characterEncoding + ")" ),
        "CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
        "TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
        "ATTR": new RegExp( "^" + attributes ),
        "PSEUDO": new RegExp( "^" + pseudos ),
        "CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                "*(even|odd|(([+-]|)(\\d*)n|)" whitespace + "*(?:([+-]|)" + whitespace +
                "*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
        "boll": new RegExp( "^(?:" + booleans + ")$", "i" ),
        "needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
    },

    rinputs = /^(?:input|select|textarea|button)$/i,
    rheader = /^h\d$/i,

    rnative = /^[^{]+\{\s*\[native \w/,

    rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

    rsibling = /[+~]/,
    rescape = /'|\\/g,

    runescape = new RegExp( "\\\\[\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),

    funescape = function( _, escaped, escapedWhitespace ) {
        var high = "0x" + escaped - 0x10000;

        return high !== high || escapedWhitespace ?
            escaped :
            high < 0 ?
                String.fromCharCode( high + 0x10000 ) :
                String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
    },

    unloadHandler = function() {
        setDocument();
    };

    
try {
    push.apply(
            (arr = slice.call( preferredDoc.childNodes )),
            preferredDoc.childNodes
            );
    arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
    push = { apply: arr.length ?
        function( target, els ) {
            push_native.apply( target, slice.call(els) );
        } :
        function ( target, els ) {
            var j = target.length,
                i = 0;
            while ( ( target[j++] = els[i++]) ) {}
            target.length = j - 1;
        }
    };
}
function Sizzle( selector, context, results, seed ) {
    var match, elem, m, nodeType,
        i, groups, old, nid, newContext, newSelector;
    if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
        setDocument( context );
    }

    context = context || document;
    results = results || [];
    nodeType = context.nodeType;

    if ( typeof selector !== "string" || !selector ||
        nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
        return results;
    }
    if ( !seed && documentIsHTML ) {
        if ( nodeType !== 11 && (match = rquickExpr.exec( selector ) ) ) {
            if ( (m = match[1]) ) {
                if ( nodeType === 9 ) {
                    elem = context.getElementById( m );
                    if ( elem && elem.parentNode ) {
                        if ( elem.id === m ) {
                            results.push( elem );
                            return results;
                        }
                    } else {
                        return results;
                    }
                } else {
                    if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
                        contains( context, elem ) && elem.id === m ) {
                        results.push( elem );
                        return results;
                    }
                }
            } else if ( match[2] ) {
                push.apply( results, context.getElementsByTagName( selector ) );
                return results;
            } else if ( (m = match[3]) && support.getElementsByClassName ) {
                push.apply( results, context.getElementsByClassName( m ) );
                return results;
            }
        }
        if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
            nid = old = expando;
            newContext = context;
            newSelector = nodeType !== 1 && selector;

            if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
                groups = tokenize( selector );
                if ( (old = context.getAttribute("id")) ) {
                    nid = old.replace( rescape, "\\$&" );
                } else {
                    context.setAttribute( "id", nid );
                }
                nid = "[id='" + nid + "'] ";
                i = groups.length;
                while ( i-- ) {
                    groups[i] = nid + toSelector( groups[i] );
                }
                newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
                newSelector = groups.join(",");
            }

            if ( newSelector ) {
                try {
                    push.apply( results,
                            newContext.querySelectorAll( newSelector )
                            );
                    return results;
                } catch( qsaError) {
                } finally {
                    if ( !old ) {
                        context.removeAttribute("id");
                    }
                }
            }
        }
    }
    return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

function createCache() {
    var keys = [];

    function cache( key, value ) {
        if ( keys.push( key + " " ) > Expr.cacheLength ) {
            delete cache[ keys.shift() ];
        }
        return (cache[ key + " " ] = value);
    }
    return cache;
}





        












}( window ));








};
}));
