function emitter(name) {
	var args_ = arguments;
	return function(cmd, arg) {
		var args = Array.prototype.slice(args_, 1);
		args.unshift(arg);
		this.emit.apply(name, args);
	};
}

function mode(name) {
	return function(cmd, arg) {
		this.buffer.setMode(name, arg);
	};
}

var specialColor = {
	0: 'bold',
	1: 'underline',
	2: 'blink',
	3: 'reverse'
};

module.exports = {
	0: function(cmd, arg) {
		this.buffer.setMode('title', arg);
		this.buffer.setMode('icon', arg);
	},
	1: mode('icon'),
	2: mode('title'),
	3: function() {},
	4: function(cmd, arg) {
		arg = arg.split(';');
		this.emit('colorchange', arg[0], arg[1]);
	},
	5: function(cmd, arg) {
		arg = arg.split(';');
		this.emit('colorchange', specialColor[arg[0]], arg[1]);
	},
	10: emitter('colorchange', 'fg'),
	11: emitter('colorchange', 'bg'),
	12: emitter('colorchange', 'cursor'),
	13: emitter('colorchange', 'mousefg'),
	14: emitter('colorchange', 'mousebg'),
	15: emitter('colorchange', 'tektronixfg'),
	16: emitter('colorchange', 'tektronixbg'),
	17: emitter('colorchange', 'highlightbg'),
	18: emitter('colorchange', 'tektronixhighlight'),
	19: emitter('colorchange', 'highlightfg'),

	46: emitter('logfilechange'),
	50: emitter('fontchange'),
	51: emitter('emacs'),

	// TODO: Manipulate Selection Data
	52: function() {
		
	},
	104: function(cmd, arg) {
		this.emit('colorreset', arg);
	},
	105: function(cmd, arg) {
		this.emit('colorreset', specialColor[arg]);
	},

	110: emitter('colorreset', 'fg'),
	111: emitter('colorreset', 'bg'),
	112: emitter('colorreset', 'cursor'),
	113: emitter('colorreset', 'mousefg'),
	114: emitter('colorreset', 'mousebg'),
	115: emitter('colorreset', 'tektronixfg'),
	116: emitter('colorreset', 'tektronixbg'),
	117: emitter('colorreset', 'highlightbg'),
	118: emitter('colorreset', 'tektronixhighlight'),
	119: emitter('colorreset', 'highlightfg'),
};
