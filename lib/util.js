exports.extend = function(o){
	for(var i = 1; i < arguments.length; i++)
		for(var key in arguments[i])
			o[key] = arguments[i][key];
	return o;
};

exports.repeat = function(str, n) {
	return Array(Math.max(~~n,0)+1).join(str);
};

