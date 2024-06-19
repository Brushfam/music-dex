import axios from "axios";
import {
    getAdditionalUserInfo,
    GoogleAuthProvider,
    signInWithRedirect,
    UserCredential,
} from "firebase/auth";
import { firebaseAuth } from "@/services/auth/firebaseConfig";
import { addNewUser } from "@/services/users/users";

export async function isVerified(email: string) {
  return axios.get(process.env.NEXT_PUBLIC_SERVER_URL + "/is-verified", {
    params: { email: email },
  });
}

export function validateToken(token: string) {
  axios
    .post(
      process.env.NEXT_PUBLIC_SERVER_URL + "/validate-token",
      {
        idToken: token,
      },
      { headers: { "Access-Control-Allow-Origin": "*" } },
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

export function authWithGoogle(role: string) {
    console.log(1)
  const provider = new GoogleAuthProvider();
  signInWithRedirect(firebaseAuth, provider)
    .then(async (userCredential: UserCredential) => {
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      const additionalInfo = getAdditionalUserInfo(userCredential);
        console.log(2)
      if (additionalInfo && additionalInfo.isNewUser && user.email) {
          console.log("+")
        addNewUser(idToken, user.email, role);
      }
      localStorage.setItem("fb-jwt-token", idToken);
    })
    .catch((error) => {
      console.log(error.message);
        console.log(3)
    });
    console.log(4)
}
