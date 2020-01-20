THREE.GamepadControls = function ( object ) {

	this.rotMatrix = new THREE.Matrix4();
	this.dir = new THREE.Vector3( 0, 0, 1 );
	this.tmpVector = new THREE.Vector3();
	this.object = object;
	this.lon = -90;
	this.lat = 0;
	this.target = new THREE.Vector3();
	this.threshold = .05;

	this.init = function(){

		var gamepadSupportAvailable = navigator.getGamepads ||
		!!navigator.webkitGetGamepads ||
		!!navigator.webkitGamepads;

		if (!gamepadSupportAvailable) {
			console.log( 'NOT SUPPORTED' );
		} else {
			if ('ongamepadconnected' in window) {
				console.log('yo');
				window.addEventListener('gamepadconnected', onGamepadConnect.bind( this ), false);
				window.addEventListener('gamepaddisconnected', gamepadSupport.onGamepadDisconnect.bind( this ), false);
			} else {
				this.startPolling();
			}
		}
	}

	this.startPolling = function() {

		if (!this.ticking) {
			this.ticking = true;
			this.tick();
		}
	}

	this.stopPolling = function() {
		this.ticking = false;
	}

	this.tick = function() {
		this.pollStatus();
		this.scheduleNextTick();
	}

	this.scheduleNextTick = function() {

		if (this.ticking) {
			requestAnimationFrame( this.tick.bind( this ) );
		}
	}

	this.pollStatus = function() {

		this.pollGamepads();

	}

	this.filter = function( v ) {

		return ( Math.abs( v ) > this.threshold ) ? v : 0;

	}

	this.pollGamepads = function() {

		var rawGamepads =
		(navigator.getGamepads && navigator.getGamepads()) ||
		(navigator.webkitGetGamepads && navigator.webkitGetGamepads());


		if( rawGamepads && rawGamepads[ 0 ] ) {

			var g = rawGamepads[ 0 ];
			
			this.lon += this.filter( g.axes[ 0 ] );
			this.lat -= this.filter( g.axes[ 1 ] );
			this.lat = Math.max( - 85, Math.min( 85, this.lat ) );
			var phi = ( 90 - this.lat ) * Math.PI / 180;
			var theta = this.lon * Math.PI / 180;

			this.target.x = 10 * Math.sin( phi ) * Math.cos( theta );
			this.target.y = 10 * Math.cos( phi );
			this.target.z = 10 * Math.sin( phi ) * Math.sin( theta );

			this.target.add( this.object.position );
			this.object.lookAt( this.target );

			this.rotMatrix.extractRotation( this.object.matrix );
			this.dir.set( 
				this.filter( g.axes[ 2 ] ), 
				this.filter( g.buttons[ 7 ].value ) - this.filter( g.buttons[ 6 ].value ), 
				this.filter( g.axes[ 3 ] ) 
			);
			//this.dir.multiplyScalar( 1 );
			this.dir.applyMatrix4( this.rotMatrix );
			this.object.position.add( this.dir );

			if( g.buttons[0].pressed == true) {
				//this.accelerate();
				console.log("hi");
				this.dir.multiplyScalar(.1);
				this.dir.applyMatrix4( this.rotMatrix );
				this.object.position.add( this.dir );
			  } else if(g.buttons[1].value > 0 ) {
				//this.decelerate();
				console.log("hi2");
			  } else if(g.buttons[2].value > 0 || g.buttons[2].pressed == true) {
				this.accelerate();
			  } else if(g.buttons[3].value > 0 || g.buttons[3].pressed == true) {
				this.decelerate();
			  }
			
		}

	}

	this.accelerate = function() {
		this.dir.multiplyScalar( 1.5 );
	}

	this.decelerate = function() {
		this.dir.multiplyScalar( .75 );
	}

	this.init();
	
};

THREE.GamepadControls.prototype = Object.create( THREE.EventDispatcher.prototype );