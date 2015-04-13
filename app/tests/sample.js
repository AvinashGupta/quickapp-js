'use strict';

/**
 * Module dependencies.
 */
var chai = require('chai'),
    should = chai.should(),
    supertest = require('supertest'),
    config = require('../../config/env/test'),
    api = supertest('http://localhost:' + config.port),
    async = require('async');

chai.use(require('chai-things'));


// Login Function
var login = function(api, email, password, callback) {
    var agent = require('superagent').agent();
    api.post('/user/login')
        .send({
            email: email,
            password: password
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
            if (err) return callback(err);
            agent.saveCookies(res);
            callback(null, agent, res);
        });
};

// Register
var register = function(api, user, callback) {
    api.post('/user/register')
        .send(user)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(callback);
};

describe('Login controller', function() {

    var coninja = null;
    var agent = require('superagent').agent();

    var user1, user2;
    var cookieAgent, cookieAgent2, cookieAgentAdmin;

    before(function(done) {
        // Register two users & login with first
        register(api, {
            email: "avinash@rubird.com",
            password: "12345",
            name: "avinash"
        }, function(err, res) {
            if (err) return done(err);
            user1 = JSON.parse(res.text);
            register(api, {
                email: "avinashgupta0108@gmail.com",
                password: "12345",
                name: "avinash2",
            }, function(err, res) {
                if (err) return done(err);
                user2 = JSON.parse(res.text);

                // Logging in
                login(api, "avinash@rubird.com", "12345", function(err, agent, res) {
                    if (err) return done(err);
                    cookieAgent = agent;
                    login(api, "avinashgupta0108@gmail.com", "12345", function(err, agent, res) {
                        if (err) return done(err);
                        cookieAgent2 = agent;
                        done();
                    });
                });
            })
        })
    });
    
    it("should be able to login as ADMIN", function(done) {
        // cookieAgentAdmin = require('superagent').agent();
        api
            .post('/admin/login')
            .send({
                email: 'admin@test.com',
                password: "12345"
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                // cookieAgentAdmin.saveCookies(res);
                cookieAgent.saveCookies(res);
                done();
            });
    });

    it("should be able to logout as ADMIN", function(done) {
        var req = api
            .post('/admin/logout');
        cookieAgent.attachCookies(req);
        req
          .send({})
          .expect(200)
          // .expect('Content-Type', /json/)
          .end(function(err, res) {
              cookieAgent.saveCookies(res);
              if (err) return done(err);
              done();
          });
    });
    
    it("should be able to logout", function(done) {
        var req = api
            .post('/user/logout');
        cookieAgent.attachCookies(req);
        req
          .send({})
          .expect(200)
          // .expect('Content-Type', /json/)
          .end(function(err, res) {
              cookieAgent.saveCookies(res);
              if (err) return done(err);
              done();
          });
    });

    it("test case", function(done) {
      var req = api
          .post('/test');
      cookieAgent.attachCookies(req);
      req
          .send({})
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, res) {
              done();
          });
    })

    after(function(done) {
        var db = require('mongoose').connect(config.db, function() {
            // Cleaning up database
            db.connection.db.dropDatabase();
            db.connection.close();
            done();
        });
    });
});