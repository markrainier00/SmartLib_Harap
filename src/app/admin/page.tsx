import { redirect } from "next/navigation";

export default function LibraryRoot() {
  redirect("admin/dashboard");
}