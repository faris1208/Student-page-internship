import LoginPage from "./login/page";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <LoginPage />
    </div>
  );
}
