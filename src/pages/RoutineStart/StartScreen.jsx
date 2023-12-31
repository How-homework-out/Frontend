import React from 'react';
import styles from '../../css/RoutineStart/StartScreen.module.css';
import { useParams } from 'react-router-dom';

const StartScreen = () => {
  const { id } = useParams();
  const onClickStart = () => {
    window.location.href = `/startex/${id}`;
  };
  return (
    <div className={styles.startbuttonContainer}>
      <button className={styles.startbutton} onClick={onClickStart}>
        운동 시작
      </button>
    </div>
  );
};

export default StartScreen;
