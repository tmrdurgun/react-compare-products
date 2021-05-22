export const helpers = {
  sortKeyAlphabetic: (obj) => {
    let keys = [],
      k, i, len;

    for (k in obj) {
      if (obj.hasOwnProperty(k)) {
        keys.push(k);
      }
    }

    keys.sort((a, b) => {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    len = keys.length;

    obj.sortedKeys = [];
    // obj.sortedValues = [];

    for (i = 0; i < len; i++) {
      k = keys[i];

      
      obj.sortedKeys.push(k); 
      // obj.sortedValues.push(obj[k]);
    }

    return obj;
  }
}
