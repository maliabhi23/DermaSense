import Aos from "aos";
import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { FaBrain, FaShieldAlt, FaCamera, FaAward, FaDatabase, FaBullseye } from "react-icons/fa";

const AboutPage = () => {
  const features = [
    {
      title: "AI-Powered Detection",
      description: "Utilizing deep learning models trained on dermatological images to identify potential skin cancer markers",
      Icon: FaBrain
    },
    {
      title: "Real-time Analysis",
      description: "Quick and efficient processing of skin images for immediate preliminary results",
      Icon: FaCamera
    },
    {
      title: "Privacy Focused",
      description: "Secure handling of sensitive medical data with advanced encryption",
      Icon: FaShieldAlt
    }
  ];

  const techStack = [
    {
      category: "AI/ML",
      items: ["TensorFlow", "Convolutional Neural Networks", "Image Processing", "Transfer Learning"]
    },
    {
      category: "Development",
      items: ["React", "Node.js", "Python", "RESTful APIs"]
    },
    {
      category: "Data",
      items: ["Skin Cancer MNIST Dataset", "ISIC Archive Dataset", "Data Augmentation"]
    }
  ];

    useEffect(() => {
      Aos.init({
        duration: 500,
        delay: 200,
      });
    }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="text-white text-center py-5 mt-5" style={{backgroundColor:'#2C7A7B'}}>
        <Container>
          <h1 className="fw-bold">About DermaSense</h1>
          <p className="lead">
            An AI-powered solution for early skin cancer detection, developed during HackHealth 2025.
          </p>
        </Container>
      </div>

      <Container className="py-5">
        {/* Project Overview */}
        <Card className="shadow-lg p-4 mb-5" data-aos='slide-left'>
          <Card.Body>
            <div className="d-flex align-items-center mb-3">
              <FaAward size={40} className="text-primary me-3" />
              <h2 className="fw-bold text-dark">Project Overview</h2>
            </div>
            <p className="text-muted">
              DermaSense was born at HackHealth 2025, where our team of passionate developers came together to address the critical need for accessible skin cancer detection. Our solution leverages artificial intelligence to provide quick, preliminary assessments of potential skin cancer markers.
            </p>
            <p className="text-muted">
              The project aims to serve as a preliminary screening tool, helping users identify potential skin concerns that should be examined by healthcare professionals. We emphasize that DermaSense is not a replacement for professional medical diagnosis but rather a supportive tool for early detection.
            </p>
          </Card.Body>
        </Card>

        {/* Key Features */}
        <Row className="gy-4">
          {features.map((feature, index) => (
            <Col key={index} md={4} data-aos='slide-up'>
              <Card className="shadow-sm text-center p-3">
                <feature.Icon size={50} className="text-primary mb-3" />
                <Card.Title className="fw-semibold">{feature.title}</Card.Title>
                <Card.Text className="text-muted">{feature.description}</Card.Text>
              </Card>
            </Col>
          ))}
        </Row>

        {/* AI Model Section */}
        <Card className="text-white mt-5 shadow-lg p-4" style={{backgroundColor:'#2C7A7B'}} data-aos='slide-left'>
          <Card.Body>
            <div className="d-flex align-items-center mb-3">
              <FaBrain size={40} className="me-3" />
              <h2 className="fw-bold">Our AI Model</h2>
            </div>
            <p>
              DermaSense uses a deep learning model trained on publicly available skin cancer datasets. Our model employs transfer learning techniques and has been fine-tuned specifically for identifying common skin cancer markers.
            </p>
            <Row>
              <Col md={6}>
                <h4 className="fw-semibold">Model Features</h4>
                <ListGroup variant="flush">
                  <ListGroup.Item className="text-white border-0" style={{backgroundColor:'#2C7A7B'}}>
                    <FaBullseye className="me-2" /> Image classification and analysis
                  </ListGroup.Item>
                  <ListGroup.Item className=" text-white border-0" style={{backgroundColor:'#2C7A7B'}}>
                    <FaDatabase className="me-2" /> Trained on diverse skin types
                  </ListGroup.Item>
                  <ListGroup.Item className="text-white border-0" style={{backgroundColor:'#2C7A7B'}}>
                    <FaShieldAlt className="me-2" /> Privacy-preserving architecture
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
                <h4 className="fw-semibold">Current Capabilities</h4>
                <ListGroup variant="flush">
                  <ListGroup.Item className="text-white border-0" style={{backgroundColor:'#2C7A7B'}}>
                    🔹 Detection of major skin cancer types
                  </ListGroup.Item>
                  <ListGroup.Item className="text-white border-0" style={{backgroundColor:'#2C7A7B'}}>
                    🔹 Real-time image processing
                  </ListGroup.Item>
                  <ListGroup.Item className="text-white border-0" style={{backgroundColor:'#2C7A7B'}}>
                    🔹 Preliminary risk assessment
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        {/* Technology Stack */}
        <Card className="shadow-lg p-4 mt-5" data-aos='slide-right'>
          <Card.Body>
            <h2 className="fw-bold text-dark mb-4">Technology Stack</h2>
            <Row>
              {techStack.map((tech, index) => (
                <Col key={index} md={4}>
                  <h4 className="fw-semibold" style={{color:'#2C7A7B'}}>{tech.category}</h4>
                  <ListGroup variant="flush">
                    {tech.items.map((item, i) => (
                      <ListGroup.Item key={i} className="text-muted">{item}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Col>
              ))}
            </Row>
          </Card.Body>
        </Card>

        {/* Disclaimer */}
        <Card className="bg-warning mt-5 p-4" data-aos='slide-left'>
          <Card.Body>
            <h4 className="fw-semibold text-dark">Important Notice</h4>
            <p className="text-dark">
              DermaSense is a hackathon project and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with any questions you may have regarding medical conditions.
            </p>
          </Card.Body>
        </Card>

        {/* Team Section */}
        <Card className="shadow-lg text-center p-5 mt-5" data-aos='slide-right'>
          <Card.Body>
            <h2 className="fw-bold text-dark">Meet the Team</h2>
            <p className="text-muted">
              We are a group of students and developers passionate about using technology to make a difference in healthcare. This project was developed during HackHealth 2025.
            </p>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AboutPage;
