(function() {
  var Files;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Files = (function() {
    function Files(selector) {
      this.selector = selector;
      this.render = __bind(this.render, this);
      document.addEventListener("dragenter", this.stopActions, false);
      document.addEventListener("dragexit", this.stopActions, false);
      document.addEventListener("dragover", this.stopActions, false);
      document.addEventListener("drop", this.render, false);
      this.ajax = new Ajax({
        element: 'a_selector'
      });
    }
    Files.prototype.isAcceptable = function(type) {};
    Files.prototype.render = function(evt) {
      var $selector, file, listItem, _i, _len, _ref, _results;
      $selector = $(this.selector);
      _ref = evt.dataTransfer.files;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        file = _ref[_i];
        listItem = $('<li />').text("" + file.name + " " + (this.sizeInMb(file.size)) + "mb");
        $selector.append(listItem);
        _results.push(this.ajax.upload(file));
      }
      return _results;
    };
    Files.prototype.sizeInMb = function(size) {
      return Math.round(parseInt(size) / 1048576);
    };
    Files.prototype.stopActions = function(evt) {
      evt.stopPropagation();
      return evt.preventDefault();
    };
    return Files;
  })();
  $(new Files('#uploads'));
}).call(this);
