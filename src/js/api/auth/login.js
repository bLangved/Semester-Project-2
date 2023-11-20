// import { apiPath } from "../baseUrl.js";

// export async function login(email, password) {
//   const response = await fetch(`${apiPath}/auction/auth/login`, {
//     method: "post",
//     body: JSON.stringify({ email, password }),
//     headers: headers("application/json"),
//   });

//   if (response.ok) {
//     const profile = await response.json();
//     save("token", profile.accessToken);
//     delete profile.accessToken;
//     save("profile", profile);
//     return profile;
//   }
//   console.log(profile);

//   throw new Error(response.statusText);
// }
