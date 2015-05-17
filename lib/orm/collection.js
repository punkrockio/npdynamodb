'use strict';

var _ = require('lodash');

module.exports = Collection;

function Collection(items){
  this._items = items;
  this._hashed = this.toHash();
}

Collection.prototype.toHash = function(){
  return this._items.map(function(item){
    return item.attributes();
  });
};

Collection.prototype.toJSON = function(){
  return JSON.stringify(this.toHash);
};

_.each([
  'pluck'
], function(name){
  Collection.prototype[name] = function(){
    var args = [this._hashed].concat(_.map(arguments, function(arg){ return arg; }));
    return _[name].apply(_, args);
  };
});

_.each([
  'each',
  'map',
  'reduce',
  'reduceRight',
  'find',
  'filter',
  'where',
  'findWhere',
  'reject',
  'every',
  'some',
  'invoke',
  'sortBy',
  'groupBy',
  'indexBy',
  'countBy',
  'shuffle',
  'sample',
  'size',
  'partition',
  'first',
  'last',
  'isEmpty'
], function(name){
  Collection.prototype[name] = function(){
    var args = [this._items].concat(_.map(arguments, function(arg){ return arg; }));
    return _[name].apply(_, args);
  };
});