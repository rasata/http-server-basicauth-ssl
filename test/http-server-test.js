var assert = require('assert'),
    path = require('path'),
    fs = require('fs'),
    vows = require('vows'),
    request = require('request'),
    httpServerBasicAuthSsl = require('../lib/http-server-basicauth-ssl');

var root = path.join(__dirname, 'fixtures', 'root');

vows.describe('http-server-basicauth-ssl').addBatch({
  'When http-server-basicauth-ssl is listening on 8081 with username "bert" and password "bertington"': {
    topic: function () {
      var server = httpServerBasicAuthSsl.createServer({
        root: root,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true'
        },
        user: 'bert',
        pass: 'bertington'
      });
      server.listen(8081);
      this.callback(null, server);
    },
    'it should serve files from root directory': {
      topic: function () {
        request.get('http://127.0.0.1:8081/file', {
          auth: {
            'user': 'bert',
            'pass': 'bertington',
            'sendImmediately': true
          }
        }, this.callback);
      },
      'status code should be 200': function (res) {
        assert.equal(res.statusCode, 200);
      },
      'and file content': {
        topic: function (res, body) {
          var self = this;
          fs.readFile(path.join(root, 'file'), 'utf8', function (err, data) {
            self.callback(err, data, body);
          });
        },
        'should match content of served file': function (err, file, body) {
          assert.equal(body.trim(), file.trim());
        }
      }
    }
  },
  'When http-server-basicauth-ssl is listening on 8080': {
    topic: function () {
      var server = httpServerBasicAuthSsl.createServer({
        root: root,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true'
        }
      });
      server.listen(8080);
      this.callback(null, server);
    },
    'it should serve files from root directory': {
      topic: function () {
        request('http://127.0.0.1:8080/file', this.callback);
      },
      'status code should be 200': function (res) {
        assert.equal(res.statusCode, 200);
      },
      'and file content': {
        topic: function (res, body) {
          var self = this;
          fs.readFile(path.join(root, 'file'), 'utf8', function (err, data) {
            self.callback(err, data, body);
          });
        },
        'should match content of served file': function (err, file, body) {
          assert.equal(body.trim(), file.trim());
        }
      }
    },
    'when requesting non-existent file': {
      topic: function () {
        request('http://127.0.0.1:8080/404', this.callback);
      },
      'status code should be 404': function (res) {
        assert.equal(res.statusCode, 404);
      }
    },
    'when requesting /': {
      topic: function () {
        request('http://127.0.0.1:8080/', this.callback);
      },
      'should respond with index': function (err, res, body) {
        assert.equal(res.statusCode, 200);
        assert.include(body, '/file');
        assert.include(body, '/canYouSeeMe');
      }
    },
    'and options include custom set http-headers': {
      topic: function () {
        request('http://127.0.0.1:8080/', this.callback);
      },
      'should respond with headers set in options': function (err, res, body) {
        assert.equal(res.headers['access-control-allow-origin'], '*');
        assert.equal(res.headers['access-control-allow-credentials'], 'true');
      }
    }
  }
}).export(module);
