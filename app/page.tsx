import Link from 'next/link'
import styles from './page.module.css';

export default async function Home() {
  return (
    <div>
      <div className={styles.h1}>
        <div className={styles.content}>
          <Link href={'/create'} className={styles.input1}>
            <button
              className={styles.button}
              type="submit"
              id="button"
            >ルームを作る</button>
          </Link>
        </div>
        <div>
          <Link href={'/join'} className={styles.input2}>
            <button
              type="submit"
              id="button"
              className={styles.button}
            >ルームに入る</button>
          </Link>
        </div>

      </div>
    </div>
  );
}
