(function($){
  var _priv = {
    cyclicCheck: null,

    diff: function(obj1, obj2)
    {
      if (typeof obj1 === 'undefined')
        obj1 = {};
      if (typeof obj2 === 'undefined')
        obj2 = {};
      
      var val1, val2, mod = {}, add = {}, del = {}, ret;
      jQuery.each(obj2, function(key, val2)
      {
        val1 = obj1[key];
        bDiff = false;
        if (typeof val1 === 'undefined')
          add[key] = val2;
        else if (typeof val1 != typeof val2)
          mod[key] = val2;
        else if (val1 !== val2)
        {
          if (typeof val2 === 'object')
          {
            if (_priv.cyclicCheck.indexOf(val2) >= 0)
              return false; // break the $.each() loop
            ret = _priv.diff(val1, val2);
            if (!$.isEmptyObject(ret.mod))
              mod[key] = $.extend(true, {}, ret.mod);
            if (!$.isEmptyObject(ret.add))
              add[key] = $.extend(true, {}, ret.add);
            if (!$.isEmptyObject(ret.del))
              del[key] = $.extend(true, {}, ret.del);
            _priv.cyclicCheck.push(val2);
          }
          else
            mod[key] = val2;
        }
      });
      
      jQuery.each(obj1, function(key, val1)
      {
        if (typeof obj2[key] === 'undefined')
          del[key] = true;
      });
      
      return {mod: mod, add: add, del: del};
    }
  };
  
  jQuery.diff = function(obj1, obj2)
  {
    _priv.cyclicCheck = [];
    return _priv.diff(obj1, obj2);
  }
})(jQuery);