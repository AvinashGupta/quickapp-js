/**
 * Logs to console & log.io
 */

var os = require('os'),
    net = require('net'),
    util = require('util'),
    events = require("events");

var Logio = exports.Logio = function(options) {
    options = options || {};
    events.EventEmitter.call(this);

    this.name = 'logio';
    this.localhost = options.localhost || os.hostname();
    this.host = options.host || '127.0.0.1';
    this.port = options.port || 28777;
    this.node_name = options.node_name || process.title;
    this.pid = options.pid || process.pid;

    // Connection state
    this.log_queue = [];
    this.connected = false;
    this.socket = null;
    this.retries = 0;

    // Protocol definition
    this.delimiter = '\r\n';

    this.connect();
};

util.inherits(Logio, events.EventEmitter)

Logio.prototype.log = function(level, msg, callback) {
    var self = this,
        log_entry;

    if (self.silent) {
        return callback(null, true);
    }

    var humanizeJSON = function(json) {
        var humanized_json = '';

        if (json && json instanceof Object && Object.keys(json).length > 0) {
            humanized_json = ', meta: '
            for (var item in json) {
                humanized_json += [item, json[item]].join('=') + ' ';
            }
        }
        return humanized_json;
    };

    // Log format
    log_entry = [
        '+log',
        self.node_name,
        self.localhost,
        level, msg
    ];

    if (!self.connected) {
        self.log_queue.push({
            message: log_entry,
            callback: function() {
                self.emit('logged');
                callback(null, true);
            }
        });
    } else {
        self.sendLog(log_entry, function() {
            self.emit('logged');
            callback(null, true);
        });
    }
};

Logio.prototype.connect = function() {
    var self = this;
    this.socket = new net.Socket();

    this.socket.on('error', function(err) {
        self.connected = false;
        self.socket.destroy();

        if (self.retries < 3) {
            self.retries++;

            setTimeout(function() {
                self.connect();
            }, 100);
        } else {
            self.log_queue = [];
            self.silent = true;
        }
    });

    this.socket.on('timeout', function() {
        if (self.socket.readyState !== 'open') {
            self.socket.destroy();
        }
    });

    this.socket.on('close', function() {
        self.connected = false;
        //self.connect();
    });

    this.socket.connect(self.port, self.host, function() {
        self.announce();
    });
};

Logio.prototype.announce = function() {
    var self = this;
    self.socket.write('+node|' + self.localhost + '|' + self.node_name + self.delimiter);
    self.connected = true;
    self.flush();
};

Logio.prototype.flush = function() {
    var self = this;

    for (var i = 0; i < self.log_queue.length; i++) {
        self.sendLog(self.log_queue[i].message, self.log_queue[i].callback);
        self.emit('logged');
    }
    self.log_queue.length = 0;
};

Logio.prototype.sendLog = function(message, callback) {
    var self = this,
        log_message = message.join('|') + self.delimiter;

    self.socket.write(log_message);
    callback();
};

Logio.prototype.transporter = function(data) {
    logio.log(data.level, data.output, function() {});
    console.log(data.output);
};

var logio = new Logio();

var logger = require('tracer').colorConsole({
    transport: logio.transporter
});

module.exports = logger;