import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";

import { upUsers } from "../../features/userSlice";

import { Link } from "react-router-dom";

type User = {
  user: object;
};

const Person: React.FC<User> = (props: any) => {
  let { user } = props;
  const [form] = Form.useForm();
  const [originalUser, setOriginalUser] = useState(user);
  const [isFormChange, setIsFormChange] = useState(false);

  const dispatch = useAppDispatch();
  // const users = useSelector((state: RootState) => state.user.data);

  const handleFormChange = (values: any) => {
    setIsFormChange(true);
    console.log("formchange");
    // Validate(values)
  };

  useEffect(() => {
    setOriginalUser(user);
    form.setFieldsValue(user); // set initial form values to user object
  }, [user, form]);

  const handleCancel = () => {
    form.setFieldsValue(originalUser);
    setIsFormChange(false);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const updatedUser = { ...originalUser, ...values };

      dispatch(upUsers(updatedUser));
      message.success("User updated successfully");
      setIsFormChange(false);
    });
  };
  console.log(user);
  return (
    <Form
      form={form}
      initialValues={originalUser}
      layout="vertical"
      onValuesChange={handleFormChange}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Name is required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Username is required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Email is required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Street"
        name={["address", "street"]}
        rules={[{ required: true, message: "Street is required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Suite"
        name={["address", "suite"]}
        rules={[{ required: true, message: "Suite is required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Address"
        name={["address", "city"]}
        rules={[{ required: true, message: "Address is required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button
          onClick={handleCancel}
          className="button"
          disabled={!isFormChange}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          className="button"
          onClick={handleSubmit}
          disabled={!isFormChange}
        >
          Revert
        </Button>
        <Button type="primary" className="button" disabled={!isFormChange}>
          Submit
        </Button>
        <Link to={`/posts/${user.id}`} className="link">
          See Posts
        </Link>
      </Form.Item>
    </Form>
  );
};

export default Person;
