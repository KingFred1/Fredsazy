import { redirect } from "next/navigation";

export default function BlogGhostPage() {
  // We don't want users actually landing here if the home page is the star
  // This redirect is for users, while the Metadata is for bots
  redirect("/"); 
}

export const metadata = {
  alternates: {
    canonical: "https://fredsazy.com", // Points back to home
  },
  robots: {
    index: false, // Tells Google: "Don't show THIS page in search, show my Home page"
    follow: true, // Tells Google: "But please follow the links to my individual posts"
  }
};