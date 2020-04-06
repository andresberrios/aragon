declare class Auth {
  register(
    email: string,
    username: string,
    password: string,
    register_data?: any
  ): Promise<boolean>;
  login(username: string, password: string): Promise<boolean>;
  signInAnonymously(): Promise<boolean>;
  logout(): void;
  onAuthStateChanged(callback: (data: any) => void): void;
  activate_account(secret_token: string): Promise<boolean>;
  new_password(secret_token: string, new_password: string): Promise<boolean>;
  refreshToken(): Promise<boolean>;
  getJWTToken(): string;
}

declare module "nhost-js-sdk/lib/auth" {
  export default Auth;
}

declare module "nhost-js-sdk" {
  export default client;
  namespace client {
    function initializeApp(opts: any): void;
    function auth(): Auth;
  }
}
