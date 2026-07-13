let logoutHandler: (() => void) | null = null;

export const setLogoutHandler = (fn: () => void) => {
  logoutHandler = fn;
};

export const triggerLogout = () => {
  if (logoutHandler) logoutHandler();
};

let loginHandler: ((token: string) => void) | null = null;

export const setLoginHandler = (fn: (token: string) => void) => {
  loginHandler = fn;
};

export const triggerLogin = (token: string) => {
  if (loginHandler) loginHandler(token);
};
