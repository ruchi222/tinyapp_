//Generate a random short URL

function generateRandomString() {
    const alphaN = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const amount = 6;
    let output = "";
    for (let i = 0; i < amount; i++) {
      let CharIndex = Math.floor(Math.random() * alphaN.length);
      output += alphaN[CharIndex];
    }
    return output;
}
  
// Function to lookup for existing email
  
function getUserByEmail (email, users) {
    for (const key in users) {
        if (users[key].email === email) {
            return users[key];
        }
    }
    return false;
}

const urlsForUser = (id, user) => {
    let userUrls = {};
  
    for (const shortURL in user) {
      if (user[shortURL].userID === id) {
        userUrls[shortURL] = user[shortURL];
      }
    }
  
    return userUrls;
};

module.exports = { getUserByEmail, generateRandomString, urlsForUser };