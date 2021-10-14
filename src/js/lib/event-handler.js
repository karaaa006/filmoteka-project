var eventHandler = function () {
  var events = {};
  var suspendedEvents = {};

  /**
   * @param {string|array} eventName
   * @param {function} callback
   */
  this.on = function (eventName, callback) {
    if (typeof callback != 'function') {
      throw new Error('Callback must be function.');
    }

    if (!Array.isArray(eventName)) {
      eventName = [eventName];
    }

    for (var i = 0; i < eventName.length; i++) {
      var name = eventName[i];

      if (this.isSuspended(name)) {
        suspendedEvents[name].push(callback);
        continue;
      }

      if (!this.isActive(name)) {
        events[name] = [];
      }

      events[name].push(callback);
      return this;
    }
  };

  /**
   * @param  {string} eventName
   * @returns {boolean}
   */
  this.isRegistered = function (eventName) {
    return this.isActive(eventName) || this.isSuspended(eventName);
  };

  /**
   * @param {string} eventName
   * @returns {boolean}
   */
  this.isSuspended = function (eventName) {
    return typeof suspendedEvents[eventName] != 'undefined';
  };

  /**
   * @param {string} eventName
   * @returns {boolean}
   */
  this.isActive = function (eventName) {
    return typeof events[eventName] != 'undefined';
  };

  /**
   * @param {string} eventName
   * @returns {boolean}
   */
  this.remove = function (eventName) {
    if (this.isSuspended(eventName)) {
      delete suspendedEvents[eventName];
      return true;
    }

    if (this.isActive(eventName)) {
      delete events[eventName];
      return true;
    }

    return false;
  };

  /**
   * @param {string} eventName
   * @returns {boolean}
   */
  this.suspend = function (eventName) {
    if (this.isActive(eventName)) {
      suspendedEvents[eventName] = events[eventName];
      delete events[eventName];

      return true;
    }
    return false;
  };

  /**
   * @param {string} eventName
   * @returns {boolean}
   */
  this.unsuspend = function (eventName) {
    if (this.isSuspended(eventName)) {
      events[eventName] = suspendedEvents[eventName];
      delete suspendedEvents[eventName];

      return true;
    }
    return false;
  };

  /**
   * @param {string|array} eventName
   * @param {object|array|string|int|float} data
   */
  this.fire = function (eventName, data) {
    if (!Array.isArray(data)) {
      data = [data];
    }

    if (!Array.isArray(eventName)) {
      eventName = [eventName];
    }

    for (var j = 0; j < eventName.length; j++) {
      var name = eventName[j];

      if (!this.isActive(name)) {
        continue;
      }

      for (var i = 0; i < events[name].length; i++) {
        var callback = events[name][i];
        callback.apply(null, data);
      }
    }
    return this;
  };
};

module.exports = eventHandler;
