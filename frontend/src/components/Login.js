import React, { useState } from "react";
import "./Login.css";
import { jwtDecode } from "jwt-decode";
// import "./Path.js"

const Login = (props) => {
  var bp = require('./Path.js');

  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [message, setMessage] = useState("");
  console.log("The code made it here")
  
  const doLogin = async(event) => {
    event.preventDefault();
    console.log("DoLogin got run")
    var obj = {userName:loginName.value,password:loginPassword.value};
    var js = JSON.stringify(obj);
      try
      {    
        
      const response = await fetch(bp.buildPath("api/login"), {
        method: 'POST',
        body: js,
        headers: { "Content-Type": "application/json" }
      });

        var res = JSON.parse(await response.text());
        const { accessToken } = res;
        // console.log("Access token is " + res)
        const jwtDecoded = jwtDecode(accessToken,{complete:true});

        try
        {
          var ud = jwtDecoded;
          var userId = ud.userId;
          var firstName = ud.firstName;
          var lastName = ud.lastName;
          console.log(ud);

            if( userId <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
              var user = {firstName:firstName,lastName:lastName,id:userId}
              localStorage.setItem('user_data', JSON.stringify(user));

              setMessage('');
              window.location.href = '/home';
            }
        }
        catch(e)
        {
          console.log( e.toString() );
          return("");
        }
    }
    catch(e)
    {
      console.log( e.toString() );
      return("");
    }   
  }
    

    // const doLogin = async (event) => {
    //   event.preventDefault();
    //   var obj = { userName: loginName.value, password: loginPassword.value };
    //   try {
    //     const response = await fetch(buildPath("api/login"), {
    //       method: "POST",
    //       body: JSON.stringify(obj),
    //       headers: { "Content-Type": "application/json" },
    //     });
    //     var res = JSON.parse(await response.text());
    //     if (res.id <= 0) {
    //       setMessage("User/Password combination incorrect");
    //     } else {
    //       var user = {
    //         firstName: res.firstName,
    //         lastName: res.lastName,
    //         id: res.id,
    //       };
    //       localStorage.setItem("user_data", JSON.stringify(user));
    //       setMessage("");
    //       window.location.href = "/cards";
    //     }
    //   } catch (e) {
    //     alert(e.toString());
    //     return;
    //   }
    // };

    return (
      <div id="loginDiv">
        <form onSubmit={doLogin} className="login-form">
          <span id="inner-title" className="login-title">
            LOGIN
          </span>
          <div className="login-remind">
            Please enter your login and password!
          </div>
          <br />
          <label className="login-label">Username</label>
          <br />
          <input
            type="text"
            id="loginName"
            placeholder="Username"
            ref={(c) => (setLoginName(c))}
          />
          <br />
          <label className="login-label">Password</label>

          <input
            type="password"
            id="loginPassword"
            placeholder="Password"
            ref={(c) => (setLoginPassword(c))}
          />
          <br />
          <input
            type="submit"
            id="loginButton"
            className="buttons"
            value="LOGIN"
          />
          <br />
          <button
            onClick={() => props.onFormSwitch("Register")}
            className="register-link"
          >
            Don't have an account? Register here
          </button>
        </form>
        <span id="loginResult">{message}</span>
      </div>
    );
  };
// };

export default Login;
