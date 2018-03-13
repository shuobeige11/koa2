jest.mock('node-fetch')

const request = require('node-fetch')

describe('Router', function() {
  it('api router is success',  () => {
    request('http://localhost:3000/api/test')
    .expect(200)
    .end(function (err, res) {
      if (err) return done(err);
      expect(res.body).to.have.property('n', 1);
      done();
    });
    
  })
})