import Keycloak from 'keycloak-js';

let keycloak = null;
let keycloakInitPromise = null;

export function getKeycloak() {
  if (!keycloak) {
    keycloak = new Keycloak({
      url: process.env.NEXT_PUBLIC_KEYCLOAK_URL,
      realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM,
      clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID,
    });
  }
  return keycloak;
}

export function initKeycloak(options = { onLoad: 'check-sso', pkceMethod: 'S256' }) {
  if (!keycloakInitPromise) {
    keycloakInitPromise = getKeycloak().init(options);
  }
  return keycloakInitPromise;
}