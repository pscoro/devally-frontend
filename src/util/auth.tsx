import React from "react";
// import Cookies from "universal-cookie/es6";
import { token } from "../shared/types";


let inMemoryToken: token = null;

const subMinutes =  function (dt: Date, minutes: number) {
  return new Date(dt.getTime() - minutes*60000);
}

function login (tokenInfo: { jwtToken: string, tokenExpiry: number }) {
  inMemoryToken = tokenInfo;
  console.log("token expiry: " + tokenInfo.tokenExpiry);
}

const withAuthSync = <P extends object> (WrappedComponent: React.ComponentType<P>) => {

  return class extends React.Component<P> {
    interval!: NodeJS.Timeout;

    constructor (props: any) { // add props type or something
      super(props)
      this.syncLogout = this.syncLogout.bind(this)
      this.state = { redirectLogin: false }
    }

    async componentDidMount () {
      console.log("this" + this);
      console.log("componnentnmounted");
      this.interval = setInterval(async () => {
        console.log("HI");
        if (inMemoryToken){
          if (
            subMinutes(new Date(inMemoryToken.tokenExpiry), 1) <= 
            new Date(inMemoryToken.tokenExpiry)
            ) {
            inMemoryToken = null;
            const token = await auth()
            if (!token) this.setState({redirectLogin: true});
            inMemoryToken = token;
          }
        } else {
          const token = await auth()
          if (!token) this.setState({redirectLogin: true});
          inMemoryToken = token;
        }
      }, 6000);

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
      return <WrappedComponent {...props as P}/>
    }
  }
}

async function auth() {
  console.log(document.cookie);

  if (!inMemoryToken) {
      const refreshURL = 'http://localhost:5000/api/v1/token/refresh'
      console.log(refreshURL)
      try {
        const res = await fetch(refreshURL, {
          method: 'GET',
          credentials: 'include',
          headers: { 
            'Content-Type': 'application/json'
          },
        })

        res.json().then((session) => {
          let newAccessToken: token = {
            jwtToken: session.access_token,
            tokenExpiry: session.access_expires_in
          }
          return newAccessToken;
        });
      } catch (error) {
        console.log(error)
        return null;
      }
    }

  const jwt_token = inMemoryToken;

  return jwt_token
}

export {login, withAuthSync}