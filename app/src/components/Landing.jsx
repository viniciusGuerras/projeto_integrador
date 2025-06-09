import Footer from "./Footer";

export default function AuthLayout() {
  return (
    <div className="min-vw-100 min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <header className="navbar">
        <h1 className="nav-brand">cool brand name</h1>
      </header>
        <div className="d-flex flex-row flex-grow-1 flex-column">
        <h2>Do you want to manage school materials?</h2>
        <p>what about.</p>
        <p>no?</p>
        </div>
    <div className="d-flex">
        <button className="button white">sign up</button>
        <button className="button white">log in</button>
    </div>
      <Footer />
    </div>
  );
}
