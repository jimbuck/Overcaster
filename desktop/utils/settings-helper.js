
var fs = global.fs;
var root = global.__dirname;
var settingsName = '/settings.json';
var settingsPath = root + settingsName;

global.defaultSettings = {
	port: 6014,
	dataLocation: './data',
	mediaLocation: './media',
	contentLocation: './content',
	themeLocation: './themes',
	editorTheme: 'ambiance'
};

var helper = {
	defaults: defaultSettings
};

helper.save = function(settings, callback){
	writeJsonFile(settingsName, settings, callback);
};

helper.load = function (callback) {
	var _this = this;
	// If file doesn't exist, create a new one and populate with default values...
	console.log(settingsPath);
	if(fs.existsSync(settingsPath)){
		readJsonFile(settingsName, callback);
	} else {
		helper.save(defaultSettings, function(err){
			callback.call(_this, err, err ? null : defaultSettings);
		});
	}
};

function readJsonFile(path, callback){
	var _this = this;
	fs.readFile(root + path, function (err, data) {
		var settings = data ? JSON.parse(data) : data;
		
		callback.call(_this, err, settings);
	});
};

function writeJsonFile(path, data, callback){
	var _this = this;
	var dataString = JSON.stringify(data, null, 4);
	
	fs.writeFile(root + path, dataString, function (err) {
		
		if(callback)
			callback.call(_this, err);
	});
};


module.exports = helper;