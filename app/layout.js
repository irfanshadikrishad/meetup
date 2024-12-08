import "./globals.css";

export const metadata = {
  title: "Meetup",
  description:
    "Meetup is an intuitive, fast, and highly responsive platform designed to simplify scheduling and managing meetings. Built with Next.js, it offers a seamless user experience with fast load times, real-time updates, and an engaging interface. Whether you're coordinating a small team meeting, organizing a large virtual conference, or scheduling one-on-one client consultations, Meetup is here to streamline your scheduling process.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
