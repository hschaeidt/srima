(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    factory(exports);
  } else {
    // Browser globals
    factory((root.commonJsStrict = {}));
  }
}(this, function (exports) {
  function sortNumber(a,b) {
    return b - a;
  }

  var srima = {
    config: null,
    images: [],
    init: function (config) {
      if (typeof config != 'object') {
        throw new Error('config is not an object');
      } else {
        this.config = config;
      }

      if (this.config != null) {
        this.lookupImages();
      }

      this.registerService();
    },
    lookupImages: function () {
      var images = document.getElementsByTagName('img');

      if (images.length == 0) {
        return;
      }

      for (var i = 0; i < images.length; i++) {
        if (images.hasOwnProperty(i)) {
          if (images[i].getAttribute('data-srima') && this.images.indexOf(images[i]) == -1) {
            this.images.push(images[i]);
          }
        }
      }
    },
    registerService: function () {
      var self = this;
      if (this.images.length == 0) {
        throw new Error(
          'no srima images found. skipping service startup. ' +
          'make sure to lookup images before starting the service'
        );
      }
      //service running in browser context
      if (window) {
        //give the page responsiveness
        window.onresize = function() {
          self.loadImages();
        };
      }
      //initialization is always required
      this.loadImages();
    },
    loadImages: function () {
      for (var i in this.images) {
        if (this.images.hasOwnProperty(i)) {
          var imageName = this.images[i].getAttribute('data-srima');

          //check for config entries
          if (this.config[imageName]) {
            var formats = this.getFormats(imageName),
              closestSize = this.getClosestSize(formats);

            //done :)
            this.images[i].setAttribute('src', this.config[imageName][closestSize]);
          }
        }
      }
    },
    getFormats: function (imageName) {
      var imageProps = this.config[imageName],
        imageFormats = [];
      for (var i in imageProps) {
        imageFormats.push(parseInt(i));
      }

      return imageFormats.sort(sortNumber);
    },
    getClosestSize: function (formats) {
      var closest = 0;
      for (var i in formats) {
        if (formats.hasOwnProperty(i)) {
          if (window.innerWidth <= formats[i]) {
            closest = formats[i];
          }
        }
      }

      return closest;
    }
  };


  // attach properties to the exports object to define
  // the exported module properties.
  exports.srima = function (config) {
    srima.init(config);
  };
}));