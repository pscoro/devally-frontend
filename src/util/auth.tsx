import React, { useState, useEffect } from "react";
import { token } from "../shared/types";


let inMemoryToken: token = null;
let devOnlyRefreshToken: token = null;

interface contextInterface {
    isLoggedIn: boolean; 
    redirectLogin: boolean;
    // setIsLoggedIn(isLoggedIn: boolean): void;
    // setRedirectLogin(redirectLogin: boolean): void; 
}

const LoginContext = React.createContext<contextInterface>({
    isLoggedIn: false,
    redirectLogin: false,
    // setIsLoggedIn: (isloggedin) => {console.log("I DONT THINK THIS SHOULD BE CALLING")},
    // setRedirectLogin: (redirectLogin) => {}
});
const LoginProvider = LoginContext.Provider

function login (tokenInfo: token, refreshTokenInfo?: token) {
    console.log("LOGIN FUNCTION CALL");
    inMemoryToken = tokenInfo;
    if(refreshTokenInfo) devOnlyRefreshToken = refreshTokenInfo;
    console.log("INITIAL REFRESH TOKEN: " + devOnlyRefreshToken?.jwtToken);
  }

function useAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [redirectLogin, setRedirectLogin] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        async function auth() {
            console.log("AUTH FUNC CALLED, YOUR COOKIES: " + document.cookie);
            // let replaceToken = null;
          
            if (!inMemoryToken) {
                console.log("AUTH FUNC: NO IN MEMORY TOKEN FOUND");
                const refreshURL = 'http://localhost:5000/api/v1/token/refresh';
                console.log(refreshURL)
                let response = await fetch(refreshURL, {
                    method: 'POST', // MAKE GET LATER
                    credentials: 'include',
                    headers: { 
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'refresh_token': devOnlyRefreshToken?.jwtToken
                    })
                });
                let responseJSON = await response.json();
                console.log("AUTH FUNC: RESPONSE JSON: " + responseJSON);
                if (response.status !== 200) return null;
                let newAccessToken: token = {
                    jwtToken: responseJSON.session.access_token,
                    tokenExpiry: responseJSON.session.access_expires_in,
                    issuedAt: responseJSON.session.access_issued_at
                }
                console.log("AUTH FUNC: NEW ACCESS TOKEN: " + JSON.stringify(newAccessToken));
                
                return newAccessToken;
            }
            return null;
          }


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
                        const token = await auth();
                        if (token === null) { 
                            setRedirectLogin(true);
                            setIsLoggedIn(false);
                        }

                        inMemoryToken = token;
                    }
                } else {
                    console.log("SET TIMEOUT IN MEMORY TOKEN NOT FOUND");
                    const token = await auth()
                    console.log("SET TIMEOUT TOKEN RETURNED FROM AUTH " + token);
                    if (token === null) { 
                        setRedirectLogin(true);
                        setIsLoggedIn(false);
                    }
                    inMemoryToken = token;
                }
                if(inMemoryToken?.tokenExpiry) timeoutTime = inMemoryToken.tokenExpiry;
                console.log("END OF SET TIMEOUT, NEW TIMEOUT TIME: " + timeoutTime);
                timeout();
            }, timeoutTime);
        }

      timeout();

    //   window.addEventListener('storage', this.syncLogout)
    }, []);

    return {
        isLoggedIn,
        redirectLogin,
        error
    };
}

export { useAuth, LoginContext, LoginProvider, login };