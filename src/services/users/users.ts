import axios from "axios";

export function getUserRole(jwt: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/users/role", {
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer: " + jwt,
    },
  });
}

export function addNewUser(jwt: string, email: string, role: string) {
  axios
    .post(
      process.env.NEXT_PUBLIC_SERVER_URL + "/users",
      {
        email: email,
        role: role,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer: " + jwt,
        },
      },
    )
    .then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      },
    );
}
