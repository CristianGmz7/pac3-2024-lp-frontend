import { create } from "zustand";
import { loginAsync } from "../../../shared/actions/auth/auth.action";
import { jwtDecode } from "jwt-decode";


//aqui se colocan los valores iniciales
export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  message: "",
  error: false,
  login: async (form) => {
    // const result = await loginAsync(form);
    const { status, data, message} = await loginAsync(form);    //desestructuracion de result
    // este result viene siendo la data que se retorna de auth.action

    if (status) {
      set({
        error: false,
        user: {
          email: data.email,
          tokenExpiration: data.tokenExpiration,
        },
        token: data.token,
        refreshToken: data.refreshToken,
        isAuthenticated: true,
        message: message
      });

      localStorage.setItem('user', JSON.stringify(get().user ?? {}))
      localStorage.setItem('token', get().token)
      localStorage.setItem('refreshToken', get().refreshToken)

      return;

    }

    set({message: message, error: true})
    return; 
  },
  logout: () => {
    set({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      message: '',
      error: false
    });
    localStorage.clear();
  },
  setSession: (user, token, refreshToken) => {
    set({
      user: user, 
      token: token, 
      refreshToken: refreshToken, 
      isAuthenticated: true
    })
    localStorage.setItem('user', JSON.stringify(get().user ?? {}))
    localStorage.setItem('token', get().token)
    localStorage.setItem('refreshToken', get().refreshToken)
  },
  validateAuthentication: () => {
    const token = localStorage.getItem('token') ?? '';

    if(token === ''){
      //si esto pasa no hay una sesion activa
      set({isAuthenticated: false});
      return;
    } else {
      try{
        const decodeJwt = jwtDecode(token);

        const currentTime = Math.floor(Date.now()/1000);    //fecha y hora actual en milisegundos

        if(decodeJwt.exp < currentTime){
          //token ya expirado
          console.log('Token expirado');
          set({isAuthenticated: false});
          return;
        }

        set({isAuthenticated: true});

      }
      catch(error){
        console.error(error);
        set({isAuthenticated: false});
      }
    }

  }
}));

/*
Estructura del create 6 nov 2024
export const useAuthStore = create((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  message: "",
  error: false,
  login: () => {},
  logout: () => {}
  
}));
*/