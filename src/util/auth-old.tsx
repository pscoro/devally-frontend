import React, { useState } from "react";
// import Cookies from "universal-cookie/es6";
import { token } from "../shared/types";


let inMemoryToken: token = null;
let devOnlyRefreshToken: token = null;


// const subTime =  function (dt: Date, milliseconds: number) {
//   return new Date(dt.getTime() - milliseconds*60000);
// }

function login (tokenInfo: token, refreshTokenInfo?: token) {
  console.log("LOGIN FUNCTION CALL");
  inMemoryToken = tokenInfo;
  if(refreshTokenInfo) devOnlyRefreshToken = refreshTokenInfo;
}

const withAuthSync = <P extends object> (WrappedComponent: React.ComponentType<P>) => {
  console.log("WITH AUTH SYNC FUNCTION CALL");

  return class extends React.Component<P> {
    
    interval!: NodeJS.Timeout;

    constructor (props: any) { // add props type or something
      super(props)
      this.syncLogout = this.syncLogout.bind(this)
      this.state = { 
        redirectLogin: false,
        isLoggedIn: false
      }
      
      
    }

    async componentDidMount () {
      console.log("COMPONENT DID MOUNT FUNCTION CALL");
      let timeoutTime = 5000;
      if(inMemoryToken?.tokenExpiry) timeoutTime = inMemoryToken.tokenExpiry;
      console.log("INITIAL TIMEOUT TIME: " + timeoutTime + " AT " + Date.now());
      const timeout = () => { 
        setTimeout(async () => {
          console.log("SET TIMEOUT CALLED WITH: " + timeoutTime + " AT " + Date.now());
          if (inMemoryToken) {
            console.log("SET TIMEOUT IN MEMORY TOKEN FOUND");
            if (Date.now() > inMemoryToken.issuedAt + inMemoryToken.tokenExpiry) {
              console.log("SET TIMEOUT TOKEN EXPIRATION:\nDATE: " + Date.now() + "\nTOKEN ISSUE TIME: " + inMemoryToken.issuedAt + "\nTOKEN EXPIRY PERIOD: " + inMemoryToken.tokenExpiry);
              inMemoryToken = null;
              const token = await auth()
              if (!token) this.setState({redirectLogin: true});
              inMemoryToken = token;
            }
          } else {
            console.log("SET TIMEOUT IN MEMORY TOKEN NOT FOUND");
            const token = await auth()
            console.log("SET TIMEOUT TOKEN RETURNED FROM AUTH " + token);
            if (!token) this.setState({redirectLogin: true});
            inMemoryToken = token;
          }
          if(inMemoryToken?.tokenExpiry) timeoutTime = inMemoryToken.tokenExpiry;
          console.log("END OF SET TIMEOUT, NEW TIMEOUT TIME: " + timeoutTime);
          timeout();
        }, timeoutTime);
      }

      timeout();

      window.addEventListener('storage', this.syncLogout)
    }

    componentWillUnmount () {
      clearInterval(this.interval)
      window.removeEventListener('storage', this.syncLogout)
      window.localStorage.removeItem('logout')
    }

    syncLogout (event: Event) {
      if (event.type === 'logout') { // said event.key idk if this works
        console.log('logged out from storage!')
        this.setState({redirectLogin: true})
      }
    }

    render () {
      const { ...props } = this.props;
      console.log("PROPS: " + JSON.stringify(this.props));
      return <WrappedComponent {...props as P}/>
    }
  }
}

async function auth() {
  console.log(document.cookie);
  // let replaceToken = null;

  if (!inMemoryToken) {
      const refreshURL = 'http://localhost:5000/api/v1/token/refresh';
      console.log(refreshURL)
        let responseToken = await fetch(refreshURL, {
          method: 'POST', // MAKE GET LATER
          credentials: 'include',
          headers: { 
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'refresh_token': devOnlyRefreshToken?.jwtToken
          })
        }).then(res => {
          return res.json().then(json => {
            if (res.status !== 200) return null;
            let newAccessToken: token = {
              jwtToken: json.session.access_token,
              tokenExpiry: json.session.access_expires_in,
              issuedAt: json.session.access_issued_at
            }
            console.log("HEY TEHER: " + JSON.stringify(newAccessToken));

            return newAccessToken;
          });
        });
        return responseToken;
    }
  return null;
}

// function isLoggedIn(): boolean { // defunct?
//   console.log("IS LOGGED IN, IN MEMORY TOKEN IS: " + inMemoryToken);
//   return inMemoryToken !== null ? true: false;
// }

export {login, withAuthSync, inMemoryToken}