import { Layout } from "antd";

const { Content, Footer } = Layout;

export default function MainLayout({ children }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Taso Shyti ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
}
