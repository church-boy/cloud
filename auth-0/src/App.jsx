import Header from "./components/Header";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <>
      <Header />

      <Container
        className="d-flex flex-column align-items-center justify-content-center text-center p-5"
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          maxWidth: "800px",
          margin: "50px auto",
        }}
      >
        <h1 className="mb-4" style={{ fontWeight: "bold", color: "#343a40" }}>
          Welcome to ShopEase
        </h1>
        <p style={{ fontSize: "1.2rem", color: "#6c757d" }}>
          Discover the ultimate shopping experience with ShopEase, your one-stop
          destination for all your favorite products. Whether you're looking for
          the latest tech gadgets, trendy fashion, or home essentials, we've got
          it all. Browse our curated selection, add your favorites to the cart,
          and enjoy seamless checkout—all with just a few clicks. Happy
          shopping!
        </p>
      </Container>
    </>
  );
};

export default App;
