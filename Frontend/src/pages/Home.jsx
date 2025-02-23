import { Box, Image, Text, Button, Card, HStack, VStack, Icon} from "@chakra-ui/react";
import Aos from "aos";
import React, { useEffect } from "react";
import { Badge, Col, Container, Row } from "react-bootstrap";
import {
  FaShieldAlt,
  FaSun,
  FaSearch,
  FaCheckCircle,
  FaMobile,
  FaLock,
  FaFacebookSquare,FaWhatsappSquare,FaTwitterSquare,FaInstagramSquare,FaLinkedin
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  useEffect(() => {
    Aos.init({
      duration: 500,
      delay: 200,
    });

  }, []);

  const navigate = useNavigate();

  const theme = {
    colors: {
      primary: "#2C7A7B", // teal.700
      secondary: "#81E6D9", // teal.200
      text: {
        primary: "#2D3748", // gray.700
        secondary: "#4A5568", // gray.600
      },
      bg: {
        light: "#F7FAFC", // gray.50
        card: "white",
      },
    },
  };

  const features = [
    {
      title: "Skin Cancer is the most common cancer Worldwide",
      icon: <FaShieldAlt size={40} color={theme.colors.primary} />,
    },
    {
      title: "Most Skin Cancer Cases Are Linked to Sun Exposure",
      icon: <FaSun size={40} color={theme.colors.primary} />,
    },
    {
      title: "Skin Cancer is the Most Treatable Cancer When Detected Early",
      icon: <FaSearch size={40} color={theme.colors.primary} />,
    },
  ];

  const whyUs = [
    {
      title: "Accuracy",
      description:
        "With over 90% accuracy, DermaSense combining advanced AI technology with oversight from a panel of dermatologists to give you trusted results.",
      icon: <FaCheckCircle size={30} color={theme.colors.primary} />,
    },
    {
      title: "Clear Insights at Your Fingertips",
      description:
        "Gain immediate insights anytime, anywhere. DermaSense's user-friendly design ensures 24/7 access to skin health insights, empowering you to take proactive steps for your skin.",
      icon: <FaMobile size={30} color={theme.colors.primary} />,
    },
    {
      title: "Security",
      description:
        "We prioritize your privacy with top-tier encryption and data security measures, so you can use DermaSense with confidence.",
      icon: <FaLock size={30} color={theme.colors.primary} />,
    },
  ];
  return (
    <Container fluid className="mt-5 bg-gradient-to-b from-teal-50 to-teal-100">
      <Box
        position="relative"
        width="100%"
        bgColor={"lightgray"}
        height={{ base: "400px", sm: "300px" }}
      >
        {/* Background Image */}
        <Image
          src="/skinmobiles.jpeg"
          width="100%"
          height="100%"
          objectFit="cover"
        />

        <Text
          position="absolute"
          top={"20%"}
          left="2%" // Adjust left positioning
          transform="translateY(-50%)"
          style={{ color: "#2C7A7B" }}
          fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
          fontWeight="bolder"
          textAlign="left"
          bg="rgba(245, 242, 242, 0.72)" // Optional: Adds contrast for better visibility
          p={2}
          borderRadius="md"
        >
          Accurate Skin Cancer Detection
          <br />
          Made Simple
        </Text>
      </Box>
      <Text className="text-center mt-3" fontSize={"2xl"}>
        We are building a <span style={{ color: "#2563eb" }}> platform </span>{" "}
        that connects patients, doctors, and insurers to optimize skin health.
      </Text>

      <div className="row col-12 mt-2">
        {features.map((val, index) => {
          return (
            <div className="col-md-4 col-sm-12 mt-2" key={index}>
              <Card.Root
                data-aos="flip-up"
                overflow="hidden"
                variant={"elevated"}
                rounded={20}
              >
                <div
                  className="text-center d-flex justify-content-center align-items-center"
                  style={{ height: "100px" }}
                >
                  {val.icon}
                </div>
                <Card.Body gap="2">
                  <Card.Title fontSize={"2xl"} className="text-center">
                    {val.title}
                  </Card.Title>
                </Card.Body>
              </Card.Root>
            </div>
          );
        })}
      </div>

      <Container className="row mt-5" fluid>
        <Image
          src="skinvision.avif"
          className="col-md-6 col-sm-12"
          objectFit={"cover"}
          rounded={50}
        />

        <div className="col-md-6 col-sm-12">
          <h1 className="mt-2">Why DermaSense?</h1>

          {whyUs.map((item, val) => {
            return (
              <Card.Root
                key={val}
                flexDirection="row"
                overflow="hidden"
                className="mt-2"
                data-aos="flip-left"
                variant={"subtle"}
                rounded={10}
              >
                <div
                  className="text-center d-flex justify-content-center align-items-center"
                  style={{ height: "100px" }}
                >
                  {item.icon}
                </div>

                <Box>
                  <Card.Body>
                    <Card.Title mb="2">{item.title}</Card.Title>
                    <Card.Description>{item.description}</Card.Description>
                  </Card.Body>
                </Box>
              </Card.Root>
            );
          })}
        </div>
      </Container>

      <Container className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3 p-4 mt-3 flex flex-col items-center text-center">
        <h2 className="text-3xl font-bold mb-4 text-center text-white">
          Ready to Take Control of Your Skin Health?
        </h2>
        <p className="text-xl mb-8 text-center text-white">
          Join DermaSense for early detection
        </p>
        <button
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors"
          onClick={() => navigate("/skinHealth")}
        >
          Get Started Now
        </button>
      </Container>

      <Box bg="gray.900" color="white" marginTop={5} py={10} px={4}>
      <Container fluid>
        <Row className="gy-4">
          {/* Brand & Description */}
          <Col md={4} sm={12}>
            <VStack align="start" spacing={3}>
              <Text fontSize="2xl" fontWeight="bold">DermaSense</Text>
              <Text color="gray.400">
                Revolutionizing skin cancer detection through AI technology.
              </Text>
            </VStack>
          </Col>

          {/* Quick Links */}
          <Col md={2} sm={6}>
            <VStack align="start" spacing={2}>
              <Text fontSize="lg" fontWeight="semibold">Quick Links</Text>
              <Link href="#" _hover={{ color: "white" }} color="gray.400">About Us</Link>
              <Link href="#" _hover={{ color: "white" }} color="gray.400">How It Works</Link>
              <Link href="#" _hover={{ color: "white" }} color="gray.400">For Doctors</Link>
              <Link href="#" _hover={{ color: "white" }} color="gray.400">Contact</Link>
            </VStack>
          </Col>

          {/* Resources */}
          <Col md={2} sm={6}>
            <VStack align="start" spacing={2}>
              <Text fontSize="lg" fontWeight="semibold">Resources</Text>
              <Link href="#" _hover={{ color: "white" }} color="gray.400">Blog</Link>
              <Link href="#" _hover={{ color: "white" }} color="gray.400">Research</Link>
              <Link href="#" _hover={{ color: "white" }} color="gray.400">Privacy Policy</Link>
              <Link href="#" _hover={{ color: "white" }} color="gray.400">Terms of Service</Link>
            </VStack>
          </Col>

          {/* Social Media */}
          <Col md={4} sm={12}>
            <VStack align="start" spacing={3}>
              <Text fontSize="lg" fontWeight="semibold">Connect With Us</Text>
              <HStack spacing={4}>
                <Icon as={FaFacebookSquare} boxSize={6} color="gray.400" _hover={{ color: "blue.400", transform: "scale(1.1)", transition: "0.3s" }} />
                <Icon as={FaTwitterSquare} boxSize={6} color="gray.400" _hover={{ color: "blue.400", transform: "scale(1.1)", transition: "0.3s" }} />
                <Icon as={FaInstagramSquare} boxSize={6} color="gray.400" _hover={{ color: "pink.400", transform: "scale(1.1)", transition: "0.3s" }} />
                <Icon as={FaLinkedin} boxSize={6} color="gray.400" _hover={{ color: "blue.400", transform: "scale(1.1)", transition: "0.3s" }} />
              </HStack>
            </VStack>
          </Col>
        </Row>

        {/* Divider & Copyright */}
        {/* <Divider borderColor="gray.700" my={6} /> */}
        <hr/>
        <Text textAlign="center" color="gray.400">
          &copy; 2025 DermaSense. All rights reserved.
        </Text>
      </Container>
    </Box>

    </Container>
  );
}
// import { Box, Image, Text, Container, SimpleGrid, Flex, Heading, useDisclosure } from "@chakra-ui/react";
// import { Card } from "react-bootstrap";
// import Aos from "aos";
// import React, { useEffect } from "react";

// export default function Home() {
//   useEffect(() => {
//     Aos.init({
//       duration: 800,
//       delay: 100,
//       once: true
//     });
//   }, []);

//   // Custom theme colors for medical/healthcare feel
//   const theme = {
//     colors: {
//       primary: "#2C7A7B", // teal.700
//       secondary: "#81E6D9", // teal.200
//       text: {
//         primary: "#2D3748", // gray.700
//         secondary: "#4A5568" // gray.600
//       },
//       bg: {
//         light: "#F7FAFC", // gray.50
//         card: "white"
//       }
//     }
//   };

//   const features = [
//     {
//       title: "Skin Cancer is the most common cancer Worldwide",
//       icon: <FaShieldAlt size={40} color={theme.colors.primary} />,
//     },
//     {
//       title: "Most Skin Cancer Cases Are Linked to Sun Exposure",
//       icon: <FaSun size={40} color={theme.colors.primary} />,
//     },
//     {
//       title: "Skin Cancer is the Most Treatable Cancer When Detected Early",
//       icon: <FaSearch size={40} color={theme.colors.primary} />,
//     }
//   ];

//   const whyUs = [
//     {
//       title: "Accuracy",
//       description: "With over 90% accuracy, DermaSense combining advanced AI technology with oversight from a panel of dermatologists to give you trusted results.",
//       icon: <FaCheckCircle size={30} color={theme.colors.primary} />,
//     },
//     {
//       title: "Clear Insights at Your Fingertips",
//       description: "Gain immediate insights anytime, anywhere. DermaSense's user-friendly design ensures 24/7 access to skin health insights, empowering you to take proactive steps for your skin.",
//       icon: <FaMobile size={30} color={theme.colors.primary} />,
//     },
//     {
//       title: "Security",
//       description: "We prioritize your privacy with top-tier encryption and data security measures, so you can use DermaSense with confidence.",
//       icon: <FaLock size={30} color={theme.colors.primary} />,
//     }
//   ];

//   return (
//     <Container maxW="container.xl" py={8}>
//       {/* Hero Section */}
//       <Box
//         position="relative"
//         height={{ base: "400px", md: "300px" }}
//         borderRadius="xl"
//         overflow="hidden"
//         data-aos="fade-down"
//         mb={12}
//       >
//         <Image
//           src="/skinmobiles.jpeg"
//           alt="Skin cancer detection"
//           objectFit="cover"
//           w="100%"
//           h="100%"
//         />
//         <Box
//           position="absolute"
//           top="20%"
//           left={8}
//           bg="rgba(255, 255, 255, 0.9)"
//           p={6}
//           borderRadius="xl"
//           maxW="md"
//           boxShadow="lg"
//         >
//           <Heading
//             as="h1"
//             fontSize={{ base: "3xl", md: "4xl" }}
//             color={theme.colors.primary}
//             lineHeight="1.2"
//           >
//             Accurate Skin Cancer Detection
//             <br />
//             Made Simple
//           </Heading>
//         </Box>
//       </Box>

//       {/* Mission Statement */}
//       <Text
//         textAlign="center"
//         fontSize={{ base: "xl", md: "2xl" }}
//         color={theme.colors.text.primary}
//         mb={12}
//         data-aos="fade-up"
//       >
//         We are building a{" "}
//         <Text as="span" color={theme.colors.primary} fontWeight="600">
//           platform
//         </Text>{" "}
//         that connects patients, doctors, and insurers to optimize skin health.
//       </Text>

//       {/* Features Grid */}
//       <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={16}>
//         {features.map((feature, index) => (
//           <Card
//             key={index}
//             data-aos="flip-up"
//             data-aos-delay={index * 100}
//             style={{
//               borderRadius: '1rem',
//               border: `1px solid ${theme.colors.secondary}`,
//               transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//             }}
//             className="hover-card"
//           >
//             <Card.Body className="text-center p-6">
//               <Flex direction="column" align="center" gap={4}>
//                 {feature.icon}
//                 <Text
//                   fontSize="xl"
//                   fontWeight="600"
//                   color={theme.colors.primary}
//                 >
//                   {feature.title}
//                 </Text>
//               </Flex>
//             </Card.Body>
//           </Card>
//         ))}
//       </SimpleGrid>

//       {/* Why DermaSense Section */}
//       <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={12}>
//         <Box
//           borderRadius="xl"
//           overflow="hidden"
//           boxShadow="lg"
//         >
//           <Image
//             src="skinvision.avif"
//             alt="DermaSense in action"
//             objectFit="cover"
//             w="100%"
//             h="400px"
//           />
//         </Box>

//         <Box>
//           <Heading
//             as="h2"
//             fontSize="3xl"
//             color={theme.colors.primary}
//             mb={6}
//           >
//             Why DermaSense?
//           </Heading>

//           {whyUs.map((item, index) => (
//             <Card
//               key={index}
//               data-aos="fade-left"
//               data-aos-delay={index * 100}
//               className="mb-4"
//               style={{
//                 borderRadius: '0.75rem',
//                 border: `1px solid ${theme.colors.secondary}`,
//               }}
//             >
//               <Card.Body>
//                 <Flex gap={4}>
//                   {item.icon}
//                   <Box>
//                     <Text
//                       fontSize="xl"
//                       fontWeight="600"
//                       color={theme.colors.primary}
//                       mb={2}
//                     >
//                       {item.title}
//                     </Text>
//                     <Text color={theme.colors.text.secondary}>
//                       {item.description}
//                     </Text>
//                   </Box>
//                 </Flex>
//               </Card.Body>
//             </Card>
//           ))}
//         </Box>
//       </SimpleGrid>
//     </Container>
//   );
// }

// Add this CSS to your stylesheet
