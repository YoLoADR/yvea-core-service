import { CookieOptions } from 'express';

export const COOKIES_NAME = 'access_token';
export const getCookieOpts = () =>
  <CookieOptions>{
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    sameSite: 'none',
    // TODO  : Conserver la session entre deux sous-domaines du même domaine principal grâce à l'utilisation de cookies pour stocker le JWT
    // domain: '.yvea.io', // Accessible sur tous les sous-domaines
    // path: '/',           // Le cookie est accessible pour toutes les routes
    // sameSite: 'lax',     // Contrôle l'envoi de cookies avec des requêtes cross-origin
  };
