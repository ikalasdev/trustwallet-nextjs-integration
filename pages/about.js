import Link from "next/link";
import MainLayout from "../components/layouts/Main";

export default function ConnectTrustWallet() {
  return (
    <MainLayout>
      <h1>
        Powered by <a href="https://ikalas.com">Ikalas</a>
      </h1>
      <Link href="/">
        <a>Go to /</a>
      </Link>
    </MainLayout>
  );
}
