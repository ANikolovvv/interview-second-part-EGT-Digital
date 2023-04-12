import { Button, Form, Input, message } from "antd";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store";

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

  const handleFormChange = () => {
    setIsFormChange(true);
  };

  useEffect(() => {
    setOriginalUser(user);
    form.setFieldsValue(user);
  }, [user, form]);

  const handleCancel = () => {
    form.setFieldsValue(originalUser);
    setIsFormChange(false);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedUser = { ...originalUser, ...values };
        const { username, email, address } = values;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validEmail = emailRegex.test(email);

        if (username.length < 2) {
          throw new Error("Username should be at least 2 characters long");
        }
        if (!validEmail) {
          throw new Error("Invalid email");
        }
        if (address.street.length < 2 || address.suite.length < 2) {
          throw new Error(
            "Street and suite should be at least 2 characters long"
          );
        }
        dispatch(upUsers(updatedUser));
        message.success("User updated successfully");
        setIsFormChange(false);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

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
        label="City"
        name={["address", "city"]}
        rules={[{ required: true, message: "City is required" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item className="buttons">
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
