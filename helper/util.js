import { createClient } from "@supabase/supabase-js";
import jsCookie from "js-cookie";

export const googleClientId =
  "719263281239-h845c9p76oa9hgp29nuu95f94babisnp.apps.googleusercontent.com";

export const SUPABASE_URL = "https://tbcildeppcwtjtmigcna.supabase.co";
export const SUPABASE_SERVICE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiY2lsZGVwcGN3dGp0bWlnY25hIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY1MDEyODkzMywiZXhwIjoxOTY1NzA0OTMzfQ.6tK78Hp7lQbLiAOEBmDwbfK0q0J59pzza0AHMl9dnN8";
export const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiY2lsZGVwcGN3dGp0bWlnY25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTAxMjg5MzMsImV4cCI6MTk2NTcwNDkzM30.M-V39W771qKjsR4WVcNPZhkMl8P3rcCc1_SNGDJ0His";

export const setCookie = (name, value, expires = 1) =>
  jsCookie.set(name, value, { expires });

export const getCookie = (name) => jsCookie.get(name);

export const removeCookie = (name) => jsCookie.remove(name);

export const loggingIn = (user) => {
  setCookie("is-login", true);
  setCookie("user-info", user);
};

export const logouting = () => {
  removeCookie("is-login");
  removeCookie("user-info");
};

export const loginStatus = () => {
  const isLogin = getCookie("is-login");
  const isUser = getCookie("user-info");
  if (isLogin && isUser) return true;
  return false;
};

export const userSaved = () => getCookie("user-info");

export const getUserId = () => {
  const user = userSaved();
  if (user) {
    const obj = JSON.parse(user);
    return obj.id_user;
  }
  return false;
};

export const supabaseClient = () =>
  createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
