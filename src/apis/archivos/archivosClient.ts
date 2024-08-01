import ky from "ky";

export const archivosClient = ky.create({
  prefixUrl: "https://backend-mock.up.railway.app/mocks/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  // Hook to add the authorization header before each request
  // hooks: {
  //   beforeRequest: [
  //     (request) => {
  //       request.headers.set("Authorization", "Bearer token");
  //     },
  //   ],
  // },
});
