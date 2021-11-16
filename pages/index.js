import Link from "next/link";
import MainLayout from "../components/layouts/Main";
import TrustWallet from "../components/TrustWallet";

export default function Index() {
  return (
    <MainLayout title="Trust Wallet NextJS Integration">
      <h3 className="my-8">Trust Wallet NextJS Integration</h3>
      <TrustWallet />
      <Link href="/about">
        <a>about page</a>
      </Link>
    </MainLayout>
  );
}
