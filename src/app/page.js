import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Link className="text-primary text-3xl hover:underline" href='/admin/auth/login'>No UI here yet click this to proceed to login</Link>
    </div>
  );
}
