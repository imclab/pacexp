[microcache.js](https://github.com/jeromeetienne/MicroCache.js) is a micro library
to handle in-memory cache (works in node+browser).


# Install it

To install it on node

    npm install microcache
    
To install the browser version, download it and include it like that

    <script src="microcache.js"></script>   

# API

To instanciate a cache, do the following. You can have as many instances you want.

    var microcache = new MicroCache();
    
## .get(key)

To get a cached asset which is in the cache. Each cached element has a unique
key to identify it.

    microcache.get('foo');

## .set(key, value)

To set a element value in the cache.

    microcache.set('foo', 'bar');

## .contains(key)

To know if a given asset is currently in the cache.

    microcache.contains('foo');

## .values()

To return all the elements currently in the cache

    microcache.values();

## .getSet(key, value)

To get an element from the cache, if it isnt already present, store it then return it

    microcache.getSet(key, value);

