import  styles from './create.module.css';

export default function Create() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.create}>
                <h1 className={styles.title} >ルーム作成</h1>
                <form>
                    <div>
                        <input
                            type="text"
                            placeholder="ルームのタイトルを入力してください"
							className={styles.input}
                        />
                    </div>
                    <div>
                        <p className={styles.p}>＊ルームIDは自動で生成されます</p>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button type="button" className={styles.button}>ルーム作成</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

