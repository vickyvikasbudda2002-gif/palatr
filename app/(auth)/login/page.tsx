import { redirect } from "next/navigation";

// Login is handled via modal on the root page
export default function LoginPage() {
  redirect("/");
}
