import { redirect } from "next/navigation";

// Signup is handled via modal on the root page
export default function SignupPage() {
  redirect("/");
}
