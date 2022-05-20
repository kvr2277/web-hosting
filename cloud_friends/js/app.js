
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var apiClient = apigClientFactory.newClient();
var token = null;

const signUp = () => {
  event.preventDefault();
  console.log("signup");
  const username = document.querySelector("#username").value;
  const emailadd = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  var email = new AmazonCognitoIdentity.CognitoUserAttribute({
    Name: "email",
    Value: emailadd,
  });

  userPool.signUp(username, password, [email], null, function (err, result) {
    if (err) {
      alert(err);
    } else {
      location.href = "confirm.html#" + username;
    }
  });
};

const confirmCode = () => {
  event.preventDefault();
  const username = location.hash.substring(1);
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: username,
    Pool: userPool,
  });
  const code = document.querySelector("#confirm").value;
  console.log("code =" + code);
  cognitoUser.confirmRegistration(code, true, function (err, results) {
    if (err) {
      alert(err);
    } else {
      console.log("confirmed");
      location.href = "signin.html";
    }
  });
};

const resendCode = () => {
  event.preventDefault();
  const username = location.hash.substring(1);
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: username,
    Pool: userPool,
  });
  cognitoUser.resendConfirmationCode(function (err) {
    if (err) {
      alert(err);
    }
  });
};

const signIn = () => {
  event.preventDefault();
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;

  let authenticationData = {
    Username: username,
    Password: password,
  };

  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );
  var userData = {
    Username: username,
    Pool: userPool,
  };

  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function () {
      console.log("login success");
      location.href = "index.html";
    },
    onFailure: function (err) {
      alert(JSON.stringify(err));
    },
  });
};

const signOut = () => {
  console.log("sign out");
  var cognitoUser = userPool.getCurrentUser();
  if (cognitoUser) cognitoUser.signOut();
};

// const refreshLogin = () => {
//   const userBtn = document.querySelector(".user");
//   var cognitoUser = userPool.getCurrentUser();
//   if (cognitoUser != null) {
//     userBtn.innerHTML += cognitoUser.username;
// };


const checkLogin = () => {
  console.log("checking login..");
  const login = false;
  const userBtn = document.querySelector(".user");
  const leftBtn = document.querySelector(".left");
  const rightBtn = document.querySelector(".right");
  var cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    userBtn.innerHTML += cognitoUser.username;
    rightBtn.classList.toggle("hide");
  } else {
    leftBtn.innerHTML = "Sign In";
    rightBtn.innerHTML = "Register";
  }
};

const navTosignUp = () => {
  console.log("sign up");
  location.href = "signup.html";
};

const navTosignIn = () => {
  console.log("sign in");
  var cognitoUser = userPool.getCurrentUser();
  if (cognitoUser !== null) {
    location.href = "files.html";
  } else {
    location.href = "signin.html";
  }
};


const loadObjects = () => {
  getJWTToken(function (token) {
    apiClient.listGet({}, null, { headers: { Authorization: token } })
      .then(function (result) {

        var urlKeys = JSON.parse(result.data.body);
        urlKeys.forEach((urlKey) => {
          console.log('$--$');
          console.log(urlKey.key);
          console.log('$***$');
          console.log(urlKey.url);
        });

        displayObjects(urlKeys);
      })
      .catch((err) => console.log(err));
  });
}

function refresh(){
  const userBtn = document.querySelector(".user");
  var cognitoUser = userPool.getCurrentUser();
  if (cognitoUser != null) {
    userBtn.innerHTML += cognitoUser.username;
  }
}

function displayObjects(urlKeys) {
  const chatContainer = document.querySelector(".container");
  urlKeys.forEach((urlKey) => {
    // <div class="conv">
    //     <p class="conv-text">Student - frank</p>
    //     <button class="conv-btn">details</button>
    // </div>
    const div = document.createElement("div");
    div.classList.add("conv");

    const p = document.createElement("p");
    p.classList.add("conv-text");
    p.innerText = urlKey.key;
    div.appendChild(p);

    const t = document.createElement("p");
    t.classList.add("time");
    t.innerText = " -8- ";
    div.appendChild(t);

    const btn = document.createElement("button");
    btn.classList.add("conv-btn");
    //btn.innerHTML = '<i class="fas fa-comment"></i>';
    btn.innerText = "Download";
    btn.addEventListener("click", () => downloadImage(urlKey.url));
    div.appendChild(btn);
    chatContainer.append(div);
  });
}


let downloadImage = url => {
  const a = document.createElement('a')
  a.href = url
  a.download = url.split('/').pop()
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}


function getJWTToken(callback) {
  if (token == null) {
    var cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession(function (err, session) {
        if (err) {
          location.href = "index.html";
        }
        token = session.getIdToken().getJwtToken();
        console.log("---------------");
        console.log(token);
        console.log("---------------");
        callback(token);
      });
    }
  } else {
    callback(token);
  }
}

