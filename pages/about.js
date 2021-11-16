import Link from "next/link";
import MainLayout from "../components/layouts/Main";
import styles from "../styles/Styles.module.css";

export default function ConnectTrustWallet() {
  return (
    <MainLayout title="Trust Wallet NextJS Integeration - About">
      <div className={styles.about}>
        <h1>About</h1>
        <h4>
          Powered by <a href="https://ikalas.com">Ikalas</a>
        </h4>
        <Link href="/">
          <a>Go to /</a>
        </Link>
      </div>
    </MainLayout>
  );
}
