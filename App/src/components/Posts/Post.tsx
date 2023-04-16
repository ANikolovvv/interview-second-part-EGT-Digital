import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from "../../store";
import { removePost, setPosts, upPost } from "../../features/postSlice";
import { deletePost, getUserPost, updatePost } from "../../services/users";
import Spinner from "../Spinner/Spinner";
import styles from "./Posts.module.css";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}
const Posts: React.FC = () => {
  let { id } = useParams();
  let userId = Number(id);
  const [noInfo, setInfo] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const posts = useSelector((state: RootState) => state.post.data);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    (async () => {
      const post = await fetchPosts();
      dispatch(setPosts(post));
    })();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data } = await getUserPost(userId);
      setLoading(false);

      if (data.length === 0) {
        setInfo(true);
      }
      return data;
    } catch (error) {
      message.error("Error fetching posts");
    }
  };

  const handleDelete = async (postId: number) => {
    try {
      await deletePost(postId);
      dispatch(removePost(postId));
      message.success("Post deleted successfully");
    } catch (error) {
      message.error("Error deleting post");
    }
  };

  const handleEdit = (values: Post) => {
    (async () => {
      try {
        await updatePost(values, values.id);
        dispatch(upPost(values));

        message.success("Post updated successfully");
        setIsModalVisible(false);
      } catch (error) {
        message.error("Error updating post");
      }
    })();
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        handleEdit(values);
      })
      .catch((errorInfo) => {
        message.error(errorInfo.message);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showModal = (post: Post) => {
    setIsModalVisible(true);
    form.setFieldsValue(post);
  };

  return (
    <>
      <div className={styles["box-posts"]}>
        <h1 className={styles["title"]}>Posts</h1>
        <div className={styles["box-link"]}>
          <Link to={`/`} className={styles["link-post"]}>
            <ArrowLeftOutlined className={styles["arrow"]} /> Back Home
          </Link>
        </div>
        <div className={styles["container"]}>
          {posts.length > 0 &&
            noInfo === false &&
            posts.map((post) => (
              <div key={post.id} className={styles["box"]}>
                <h3>{post.title}</h3>
                <Button className="button" onClick={() => showModal(post)}>
                  Edit
                </Button>
                <Button
                  className={"button"}
                  danger
                  onClick={() =>
                    Modal.confirm({
                      title: "Confirm",
                      content: "Are you sure you want to delete this post?",
                      okText: "Delete",
                      okType: "danger",
                      cancelText: "Cancel",
                      onOk: () => handleDelete(post.id),
                    })
                  }
                >
                  Delete
                </Button>
              </div>
            ))}
          <Modal
            title="Edit post"
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <Form form={form}>
              <Form.Item name="id" hidden>
                <Input />
              </Form.Item>
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: "Please enter a title" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Body"
                name="body"
                rules={[{ required: true, message: "Please enter a body" }]}
              >
                <TextArea />
              </Form.Item>
            </Form>
          </Modal>
        </div>
        {noInfo === true && loading === false && (
          <h1>The user don't have a posts!</h1>
        )}
        {loading === true && <Spinner />}
      </div>
    </>
  );
};
export default Posts;
