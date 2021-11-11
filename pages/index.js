import Link from "next/link";
import MainLayout from "../components/layouts/Main";
import TrustWallet from "../components/TrustWallet";

export default function Index() {
  return (
    <MainLayout title="Home">
      <TrustWallet />
      <Link href="/about">
        <a>about page</a>
      </Link>
    </MainLayout>
  );
}
