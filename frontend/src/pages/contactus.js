import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Card,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "../styles/contactus.css";

const ContactUs = () => {
  return (
    <Container className="mt-4 mb-4">
      <Row className="d-flex justify-content-center">
        <Col md={6}>
          <ContactForm />
        </Col>

        <Col md={5}>
          <ContactInfo />
        </Col>
      </Row>
    </Container>
  );
};

const ContactForm = () => {
  const form = useRef();
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const subject = e.target.subject.value;

    if (name === "" || email === "" || subject === "") {
      alert("All fields are required!");
    } else if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
    } else {
      sendEmail(e);
    }

    navigate("/dashboard");
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const sendEmail = (e) => {
    emailjs
      .sendForm(
        "service_5rbpg5k",
        "template_ufdu9pe",
        form.current,
        "Nt-NeJLewxMEiJHyK"
      )
      .then(
        () => {
          alert(
            `Thank you, ${e.target.name.value}. Your message has been sent!`
          );
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("An error occurred while sending the email.");
        }
      );
  };



  return (
    <Form ref={form} id="contactForm" onSubmit={handleSubmit}>
      <h2 className="text-center fw-bold">Contact Us</h2>
      <Form.Group controlId="name">
        <Form.Label>
          Name <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control type="text" name="name" placeholder="Name" required />
      </Form.Group>
      <br></br>
      <Form.Group controlId="email">
        <Form.Label>
          Email <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control type="email" name="email" placeholder="Email" required />
      </Form.Group>
      <br></br>
      <Form.Group controlId="subject">
        <Form.Label>
          Subject <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control as="select" name="subject" required>
          <option value="">Select a subject</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Technical Support">Technical Support</option>
          <option value="Report an Issue">Report an issue</option>
        </Form.Control>
      </Form.Group>
      <br />
      <Form.Group controlId="message">
        <Form.Label>Message</Form.Label>
        <Form.Control
          as="textarea"
          name="message"
          rows={4}
          placeholder="Your message"
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-5 ms-2">
        Submit
      </Button>
    </Form>
  );
};

const ContactInfo = () => {
  const handleSupportClick = () => {
    window.location.href = "mailto:crypto-watcher@gmail.com";
  };
  return (
    <Card className="text-center my-2">
      <Card.Body>
        <Card.Title>Contact Us</Card.Title>
        <Card.Text>
          If you have any questions, feel free to reach out to us!
        </Card.Text>
        <br/>
        <div className="justify-content-center flex-wrap">
          <div className="p-2">
            <h4>Email Us:</h4>
            <p>crypto-watcher@gmail.com</p>
            <p>Or click here:</p>
            <Button
                variant="secondary"
                type="button"
                className="mt-3 ms-2"
                onClick={handleSupportClick}
            >
                Contact Support
            </Button>
          </div>
          <br/>
          <div className="p-2">
            <h4>Call Us:</h4>
            <p>+972 123456789</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ContactUs;
