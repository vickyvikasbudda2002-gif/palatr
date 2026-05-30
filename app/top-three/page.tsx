import { redirect } from "next/navigation";

// Top 3 is handled via modal in the feed
export default function TopThreePage() {
  redirect("/feed");
}
