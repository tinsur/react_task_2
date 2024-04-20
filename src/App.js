import styles from './app.module.css';
import data from './data.json';
import {useState} from "react";

export const App = () => {
    console.clear();
    let [steps, setSteps] = useState(data);
    let [activeIndex, setActiveIndex] = useState(Number(steps[0]?.id));
    let isLastIndex = steps.length === activeIndex;
    let isFirstIndex = Number(steps[0]?.id) === activeIndex


    // И определить 3 обработчика: Клик назад, Клик вперед, Начать сначала
    const clickBtnSteps = (event) => {
        setActiveIndex(Number(event.target.dataset.id))
    }
    const clickBtnNext = () => {
        isLastIndex ? setActiveIndex(Number(steps[0]?.id)) : setActiveIndex(Number(activeIndex) + 1)
    }
    const clickBtnBefore = () => {
        setActiveIndex(Number(activeIndex) - 1)
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Инструкция по готовке пельменей</h1>
                <div className={styles.steps}>
                    <div className={styles['steps-content']}>
                        {steps[Number(activeIndex) - 1].content}
                    </div>
                    <ul className={styles['steps-list']}>
                        {
                            steps.map(({id}) =>
                                <li className={(Number(id) <= Number(activeIndex)) ?
                                    `${styles['steps-item']} ${styles.done}` : styles['steps-item']}
                                    key={id}>
                                    <button className={styles['steps-item-button']}
                                            onClick={clickBtnSteps}
                                            data-id={Number(id)}>
                                        {Number(id)}
                                    </button>
                                    Шаг {Number(id)}
                                </li>
                            )
                        }

                    </ul>
                    <div className={styles['buttons-container']}>
                        <button className={styles.button} disabled={isFirstIndex} onClick={clickBtnBefore}>Назад</button>
                        <button className={styles.button} onClick={clickBtnNext}>
                            {isLastIndex ? `Начать сначала` : `Далее`}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
