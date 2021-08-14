// Generated by CoffeeScript 1.3.3
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone'], function() {
    var SwitchView;
    return SwitchView = (function(_super) {

      __extends(SwitchView, _super);

      function SwitchView() {
        return SwitchView.__super__.constructor.apply(this, arguments);
      }

      SwitchView.prototype.initialize = function() {
        this.count = 0;
        this.states = this.options.states || ['off', 'on'];
        return this.applyState();
      };

      SwitchView.prototype.events = {
        "click": "incrementState"
      };

      SwitchView.prototype.currentState = function() {
        return this.states[this.count % this.states.length];
      };

      SwitchView.prototype.applyState = function() {
        return $(this.el).removeClass(this.states.join(' ')).addClass(this.currentState());
      };

      SwitchView.prototype.incrementState = function() {
        this.count = this.count + 1;
        this.applyState();
        return this.trigger(this.currentState());
      };

      return SwitchView;

    })(Backbone.View);
  });

}).call(this);
