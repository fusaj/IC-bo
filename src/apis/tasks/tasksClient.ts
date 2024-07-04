import ky from "ky";

export const tasksClient = ky.create({
  prefixUrl: "https://jsonplaceholder.typicode.com",
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
