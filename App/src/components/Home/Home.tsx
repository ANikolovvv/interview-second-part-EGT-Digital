import React, { useEffect, useState } from "react";

import Person from "../Person/Person";
import { fetchData } from "../../services/users";
import { Collapse, List } from "antd";

import Errors from "../Error/Error";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { setUsers } from "../../features/userSlice";

const { Panel } = Collapse;

const Home: React.FC = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const users = useSelector((state: RootState) => state.user.data);

  useEffect(() => {
    async function getData() {
      try {
        const data = await fetchData();
        dispatch(setUsers(data));
      } catch (error: Error | any) {
        let message: string = error.message;
        setMessage(message);
        setError(true);
        handleError();
      }
    }

    getData();
  }, []);

  const handleError = (): void => {
    setTimeout(() => {
      setError(false);
    }, 3000);
  };

  return (
    <>
      {users.length > 0 ? (
        <List
          dataSource={users}
          renderItem={(user) => (
            <Collapse className="names">
              <Panel header={user.name} key={user.id}>
                <Person user={user} />
              </Panel>
            </Collapse>
          )}
        />
      ) : (
        <p>Loading...</p>
      )}
      {error === true && <Errors message={message}></Errors>}
    </>
  );
};

export default Home;
