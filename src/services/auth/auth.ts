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

export function authWithGoogle(role: string) {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(firebaseAuth, provider)
    .then(async (userCredential: UserCredential) => {
      const user = userCredential.user;
      const idToken = await user.getIdToken();
      const additionalInfo = getAdditionalUserInfo(userCredential);
      if (additionalInfo && additionalInfo.isNewUser && user.email) {
        await addNewUser(idToken, user.email, role);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });
}
