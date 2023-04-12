import { Spin } from "antd";
import styles from './Spinner.module.css'
const Spinner: React.FC = () => {
  return (
    <div className={styles["loading-container"]}>
      <Spin size="large" />
      <h1>Loading data, please wait...</h1>
    </div>
  );
};
export default Spinner;
