import React from "react";

const Footer = () => {
  return (
    <footer>
      <section className="Section">
        <div className="row footer">
          <div className="footer-column col-4">
            <h3>Quicklinks</h3>
            <p>
              <a href="/">Home</a>
            </p>
            <p>
              <a href="#">Contact</a>
            </p>
            <p>
              <a href="#">Terms and Conditions</a>
            </p>
            <p>
              <a href="#">Privacy</a>
            </p>
            <p>
              <a href="#">Store Finder</a>
            </p>
            <p>
              <a href="#">Media</a>
            </p>
          </div>

          <div className="footer-column col-4">
            <h3>Address</h3>
            <p>
              Magnetic Group Inc. <br />
              St. Johanns-Vorstadt 42
              <br />
              Basel 4056
              <br />
              Switzerland
            </p>
          </div>

          <div className="footer-column col-4">
            <h3>About us</h3>
            <p>
              Unique watches for unique people
              <br />
              Creating unique timepieces is our passion. Our purpose also
              expresses this. Together with our vision and values, it guides our
              actions – today and in the future.
            </p>
          </div>
        </div>

        <div className="row footer">
          <div className="footer-column col-4">
            <br />
            <br />
            © Magnetic Group
            <br />
            <br />
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
