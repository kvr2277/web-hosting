
/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://i12kw7qqtk.execute-api.us-east-1.amazonaws.com/Production';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.keysGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var keysGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/keys').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(keysGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.keysOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var keysOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/keys').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(keysOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.listGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var listGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/list').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(listGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.listOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var listOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/list').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(listOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.proxyOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var proxyOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/{proxy+}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(proxyOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};



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
    location.href = "friends.html";
  } else {
    location.href = "signin.html";
  }
};





// const loadObjects = () => {

//   const xhr = new XMLHttpRequest();

//   xhr.open('GET', 'https://oeghxxq0hg.execute-api.us-east-1.amazonaws.com/list');

//   // set response format
//   xhr.responseType = 'json';

//   xhr.send();

//   xhr.onload = () => {
//       // get JSON response
//       const response = xhr.response;

//       // log details
//       console.log('###########');
//       console.log(response); // John Doe
//       console.log('###########');
//   }
// };

const loadObjectsV2 = () => {
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

