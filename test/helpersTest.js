const { assert } = require('chai');

const { getUserByEmail } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = getUserByEmail("user@example.com", testUsers)
    const expectedOutput = "userRandomID";
    // Write your assert statement here
    assert.equal(user.id , expectedOutput.id);
    assert.equal(user.email , expectedOutput.email);
    assert.equal(user.password , expectedOutput.password);
  });

  
    it('should return a user with valid email', function() {
      const user = getUserByEmail("user2@example.com", testUsers)
      const expectedOutput = { id: "user2RandomID", "email": "user2@example.com", password: "dishwasher-funk" };
      assert.equal(user.id , expectedOutput.id);
      assert.equal(user.email , expectedOutput.email);
      assert.equal(user.password , expectedOutput.password);
    });

    it('should return undefined with invalid email', function() {
        const user = getUserByEmail("test@example.com", testUsers)
        assert.equal(user, undefined);
    });
});