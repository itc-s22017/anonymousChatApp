"use client";

import React, { useState } from 'react';
import styles from './create.module.css';
import { useRouter } from 'next/navigation';

export default function Create() {
    const [roomTitle, setRoomTitle] = useState('');
    const [roomId, setRoomId] = useState('');
    const router = useRouter();

    const handleCreate = () => {
        if (roomTitle) {
            //ここでルームIDの生成の処理を実行
        } else {
            alert('ルーム名を入力してください');
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.create}>
                <h1 className={styles.title}>ルーム作成</h1>
                <form>
                    <div>
                        <input
                            type="text"
                            placeholder="ルームのタイトルを入力してください"
                            value={roomTitle}
                            onChange={(e) => setRoomTitle(e.target.value)}
                            className={styles.input}
                        />
                    </div>
                    <div>
                        <p className={styles.p}>＊ルームIDは自動で生成されます</p>
                    </div>
                    <div className={styles.buttonContainer}>
                        <button type="button" onClick={handleCreate} className={styles.button}>
                            ルーム作成
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

