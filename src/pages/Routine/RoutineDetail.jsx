import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../css/Routine/RoutineDetailPopup.module.css';
import { getCookieToken } from '../../store/Cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

const RoutineDetail = (props) => {
  const [detailRoutine, setDetailRoutine] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const windowClose = () => {
    props.setDetailPopup(false);
    props.windowReload();
  };

  const myroutineinsert = (id) => {
    axios
      .post(
        `https://52.78.0.53.sslip.io/api/ex-routines/me`,
        {
          routId: id,
        },
        {
          headers: { Authorization: `Bearer ${getCookieToken()}` },
        }
      )
      .then((res) => {
        navigate(`/my/routine/list`);
      });
  };

  const fetchroutine = async () => {
    try {
      setDetailRoutine(null);
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `https://52.78.0.53.sslip.io/api/ex-routines/${props.detailId}`
      );
      setDetailRoutine(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchroutine();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러발생</div>;
  if (!detailRoutine) return <div>null</div>;
  return (
    <div className={styles.routineDetailPopup}>
      <div className={styles.layout}>
        <div className={styles.subjectHits}>
          <div className={styles.subject}>{detailRoutine.result.name}</div>
          <div className={styles.hits}>
            ∙ 조회수 {detailRoutine.result.hits}회
          </div>
        </div>
        <div className={styles.cates}>
          {detailRoutine.result.cate.map((item, index) => (
            <span key={index} className={styles.actionCate}>
              #{item}
            </span>
          ))}
        </div>
        <div className={styles.routineInfo}>
          {detailRoutine.result.routineDetails.map((detail, index) =>
            detail.type ? (
              <div key={detail.id} className={styles.routineDetail}>
                <span className={styles.sequence}>{index + 1}</span>
                <span className={styles.detailname}> {detail.ex.name}</span>
                <div className={styles.details}>
                  <div className={styles.ex}>
                    <FontAwesomeIcon
                      icon={faDumbbell}
                      className={styles.dumbbellIcon}
                    />
                    <span> {detail.time}s</span>
                  </div>
                  <div className={styles.ex}>
                    <span className={styles.restText}>rest</span>
                    <span> {detail.rest}s</span>
                  </div>
                  <div className={styles.ex}>
                    <span> {detail.set} set</span>
                  </div>
                </div>
                <video className={styles.video} controls muted>
                  <source src={detail.img[0]?.img} type='video/mp4' />
                </video>
              </div>
            ) : (
              <div key={detail.id} className={styles.routineDetail}>
                <span className={styles.sequence}>{index + 1}</span>
                <span className={styles.detailname}> {detail.ex.name}</span>
                <div className={styles.details}>
                  <div className={styles.ex}>
                    <FontAwesomeIcon
                      icon={faDumbbell}
                      className={styles.dumbbellIcon}
                    />
                    <span> {detail.count}개</span>
                  </div>
                  <div className={styles.ex}>
                    <span className={styles.restText}>rest</span>
                    <span> {detail.rest}s</span>
                  </div>
                  <div className={styles.ex}>
                    <span> {detail.set} set</span>
                  </div>
                </div>
                <video className={styles.video} controls muted>
                  <source src={detail.img[0]?.img} type='video/mp4' />
                </video>
              </div>
            )
          )}
        </div>

        <div className={styles.buttons}>
          <button
            className={styles.button}
            onClick={() => myroutineinsert(props.detailId)}
          >
            내 루틴 추가
          </button>
          <button className={styles.button} onClick={windowClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoutineDetail;
