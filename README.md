EclipseCon - Eclipse Thym Workshop
======

# Introduction to Cordova

cf Slides

# Introduction to Eclipse Thym

cf Slides

# Your first Thym Project
## Creation Wizard
## LiveReload
## Introduction to the Cordova Plugins

cf Slides

### Adding a plugin to our first Application

Let's add the Device Motion Plugin 

```

var app = {
    initialize: function() {
        this.bind();
    },
    bind: function() {
        document.addEventListener('deviceready', this.deviceready, false);
    },
    deviceready: function() {
        app.report('deviceready');
        var options = { frequency: 300 };

        var watchID = navigator.accelerometer.watchAcceleration(app.onSuccess, app.onError, options);
    },
    report: function(id) { 
        console.log("report:" + id);
        document.querySelector('#' + id + ' .pending').className += ' hide';
        var completeElem = document.querySelector('#' + id + ' .complete');
        completeElem.className = completeElem.className.split('hide').join('');
    },
     onSuccess: function(acceleration) {
    	 document.querySelector('#info').innerHTML = 'Acceleration X: ' + acceleration.x + '\n' +
         'Acceleration Y: ' + acceleration.y + '\n' +
         'Acceleration Z: ' + acceleration.z + '\n' 
        
    },

    onError : function() {
        alert('onError!');
    }
};

```



