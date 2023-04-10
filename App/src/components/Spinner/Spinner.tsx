import { Spin } from "antd";

const Spinner: React.FC = () => {
  return (
    <div className="loading-container">
      <Spin size="large" />
      <h1>Loading data, please wait...</h1>
    </div>
  );
};
export default Spinner;
