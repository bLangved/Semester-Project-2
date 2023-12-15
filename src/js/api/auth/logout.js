import { remove, removeSession } from "../../storage/remove.js";

export function logout() {
  if (confirm("Do you want to log out of the website?")) {
    remove("token");
    remove("profile");
    removeSession("listings");
  } else {
    // Do nothing
  }
}
