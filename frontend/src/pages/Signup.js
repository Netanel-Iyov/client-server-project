import { useState , useRef  } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import "../styles/signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming password
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(null);
  const form = useRef();

  // Regex for password validation
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:/?.><]).{6,}$/;

  const onSubmitClick = async (e) => {
    e.preventDefault();

    console.log(e)
    setError(null);

    // Validate the password using the regex
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    // Check if the passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      console.log(json);
      setSubmitted(true);
      sendEmail(e);
      // Wait for 3 seconds before redirecting
      setTimeout(() => {
        window.location.href = "/sign-in";
      }, 3000);
    }

    console.log(email, password);
  };

  const sendEmail = (e) => {
    emailjs
      .sendForm(
        "service_5rbpg5k",
        "template_tj84mlu",
        form.current,
        "Nt-NeJLewxMEiJHyK"
      )
      .then(
        () => {
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("An error occurred while sending the email.");
        }
      );
  };

  return (
    <div
      id="signup-main-container"
      className="container-fluid d-flex justify-content-center align-items-center m-0 p-0 h-100 w-100"
    >
      <div id="signup-form-container" className="w-100">
        <Form ref={form} onSubmit={onSubmitClick} className="signup-form">
          <h2 className="mb-4 text-center fw-bold">Sign up</h2>
          <Form.Group controlId="email">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Control
              type="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </Form.Group>
          <Form.Group controlId="formConfirmPassword" className="mt-3">
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="mt-3">
              Sign up
            </Button>
          </div>
          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}
          {!error && submitted && (
            <Alert variant="success" className="mt-3">
              <span>You have been successfully signed up.</span>
              <br />
              <span>You are being redirected to the sign in page ...</span>
            </Alert>
          )}
          <Form.Label className="d-block text-center mt-4">
            Already have an account? <Link to="/sign-in">Log in</Link>
          </Form.Label>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
