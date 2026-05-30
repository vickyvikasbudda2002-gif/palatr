import { redirect } from "next/navigation";

// Profile is handled via modal in the feed
export default function ProfilePage() {
  redirect("/feed");
}
