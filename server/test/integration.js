var request = require('supertest')('http://localhost:8000');
var expect = require('chai').expect;
var cleanup = require('./cleanup.js').cleanup

describe('authentication', function () {
  // after(function () {
  //   cleanup();
  // })
  it('should sign in user', function(done){
    request.post('/login')
    .send({username: "Pato", password: 'password'})
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err)
        done()
    })
  })

  it('should create a user', function(done){
    request.post('/signup')
    .send({username: "try", password: 'password', email: "try@taco.com"})
    .expect(200)
    .end(function (err, res) {
      if (err) {
        cleanup()
        return done(err)
      }
        done();
    })
  })


})

