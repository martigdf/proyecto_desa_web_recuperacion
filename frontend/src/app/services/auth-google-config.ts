import { AuthConfig } from 'angular-oauth2-oidc';

export const googleAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: 'http://localhost/login',
  clientId:
    '1058612078012-4r60mgejefb5n7lb4tjk7fkclegk3vjt.apps.googleusercontent.com', // Reemplaza con tu Client ID
  scope: 'profile email',
  strictDiscoveryDocumentValidation: false,
};
