// Firebase Auth (Google sign-in) and Firestore for the admin page, loaded from
// gstatic like the arena. A named app keeps it apart from anything else on
// the page.

import { FIREBASE_CONFIG, FIREBASE_SDK, USE_EMULATOR, GA_SCOPE } from './config.js?v=202611101147';

let sdkPromise = null;

export function sdk() {
  if (!sdkPromise) {
    sdkPromise = (async () => {
      const appMod = await import(`${FIREBASE_SDK}/firebase-app.js`);
      const authMod = await import(`${FIREBASE_SDK}/firebase-auth.js`);
      const fs = await import(`${FIREBASE_SDK}/firebase-firestore.js`);
      const app = appMod.initializeApp(FIREBASE_CONFIG, 'admin');
      const auth = authMod.getAuth(app);
      const db = fs.getFirestore(app);
      if (USE_EMULATOR) {
        authMod.connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
        fs.connectFirestoreEmulator(db, '127.0.0.1', 8080);
      }
      return { authMod, auth, fs, db };
    })();
    sdkPromise.catch(() => {
      sdkPromise = null;
    });
  }
  return sdkPromise;
}

/**
 * For firebase/test only: run store.js against an emulator connection made
 * with the npm SDK. [value] is {fs, db, auth: {currentUser: {email}}}.
 */
export function useSdkForTests(value) {
  sdkPromise = Promise.resolve(value);
}

/** Calls [cb] with the signed-in user (or null) now and on every change. */
export async function onUser(cb) {
  const { authMod, auth } = await sdk();
  return authMod.onAuthStateChanged(auth, cb);
}

export async function signIn() {
  const { authMod, auth } = await sdk();
  const provider = new authMod.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  await authMod.signInWithPopup(auth, provider);
}

export async function signOut() {
  dropAnalyticsToken();
  const { authMod, auth } = await sdk();
  await authMod.signOut(auth);
}

// ---- Google Analytics token (Analytics tab) ------------------------------------
//
// Firebase only hands out the Google access token at sign-in, and it lasts an
// hour. The Analytics tab asks for one with the analytics.readonly scope on
// demand (a re-authentication popup for the same account), so normal sign-in
// doesn't ask for Analytics access. It's kept for this tab session only.

const GA_TOKEN_KEY = 'admin.gaToken';
const GA_TOKEN_LIFE_MS = 50 * 60 * 1000; // Google's tokens last 60 minutes
let gaToken = null; // {token, exp}

function storedGaToken() {
  try {
    const t = JSON.parse(sessionStorage.getItem(GA_TOKEN_KEY) || 'null');
    return t && typeof t.token === 'string' && t.exp > Date.now() ? t : null;
  } catch {
    return null;
  }
}

export function dropAnalyticsToken() {
  gaToken = null;
  try {
    sessionStorage.removeItem(GA_TOKEN_KEY);
  } catch {
    // fine without it
  }
}

/**
 * A Google access token that can read Analytics, or null if there isn't a
 * live one and [interactive] is false. With [interactive] it opens a Google
 * popup for the signed-in account; call it straight from a click.
 */
export async function analyticsToken({ interactive = false } = {}) {
  if (gaToken && gaToken.exp > Date.now()) return gaToken.token;
  gaToken = storedGaToken();
  if (gaToken) return gaToken.token;
  if (!interactive) return null;

  const { authMod, auth } = await sdk();
  if (!auth.currentUser) throw new Error('Not signed in.');
  const provider = new authMod.GoogleAuthProvider();
  provider.addScope(GA_SCOPE);
  provider.setCustomParameters({ login_hint: auth.currentUser.email || '' });
  const result = await authMod.reauthenticateWithPopup(auth.currentUser, provider);
  const token = authMod.GoogleAuthProvider.credentialFromResult(result)?.accessToken;
  if (!token) throw new Error('Google didn\'t return an Analytics token.');
  gaToken = { token, exp: Date.now() + GA_TOKEN_LIFE_MS };
  try {
    sessionStorage.setItem(GA_TOKEN_KEY, JSON.stringify(gaToken));
  } catch {
    // fine: it's kept in memory
  }
  return token;
}

export async function currentEmail() {
  const { auth } = await sdk();
  return auth.currentUser?.email || '';
}
