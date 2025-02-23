import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  createListCollection,
  Fieldset,
  Input,
  Spinner,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PasswordInput } from "../components/ui/password-input";
import { Field } from "../components/ui/field";
import { Container } from "react-bootstrap";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../components/ui/select";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "../components/ui/file-upload";
import { HiUpload } from "react-icons/hi";

import {
  AddressAutofill,
  AddressMinimap,
  useConfirmAddress,
} from "@mapbox/search-js-react";
import MapComponent from "../customcomponent/MapComponent";
import { showToast } from "../customcomponent/ToastComponent";
import axios from "axios";
import LocationSearch from "../customcomponent/LocationSearch";
import Aos from "aos";
import TextParser from "../customcomponent/TextParser";

export default function SkinHealth() {
  const { login } = useContext(AppContext);

  const frameworks = createListCollection({
    items: [
      { label: "Male", value: "0" },
      { label: "Female", value: "1" },
      { label: "Others", value: "2" },
    ],
  });

  const locations = createListCollection({
    items: [
      { label: "Back", value: "0" },
      { label: "Abdomen", value: "1" },
      { label: "Trunk", value: "2" },
      { label: "Lower Extremity", value: "3" },
      { label: "Face", value: "4" },
      { label: "Chest", value: "5" },
      { label: "Upper Extremity", value: "6" },
      { label: "Hand", value: "7" },
      { label: "Other", value: "8" },
    ],
  });

  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([...selectedFiles, ...files]); // Store full File objects
    setValue("imageFile", [...selectedFiles, ...files]); // Update form state
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const resetVal = () => {
    setSelectedFiles([]);
    setValue("imageFile", ""); // Reset React Hook Form field
  };
  const [load, setLoad] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [success, setSuccess] = useState(false);
  const [mapLoad, setMapLoad] = useState(false);
  const [hospitals, setHospitals] = useState([]);
  const [prompt, setPrompt] = useState(null);
  // const [loadres,setLoadRes] = useState(false);

  const fetchHospitals = async () => {
    try {
      setSuccess((prev) => !prev);
      setMapLoad((prev) => !prev);
      let url = String(import.meta.env.VITE_URL);
      url += `hospitals/nearby?lat=${selectedLocation.geometry.coordinates[0]}&lng=${selectedLocation.geometry.coordinates[1]}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setHospitals(response.data);

      if (response.data.success) {
        showToast(response.data.message, "success");
        reset();
      } else {
        setSuccess(false);
        showToast(response.data.message, "error");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setMapLoad(false);
    }
  };

  const sendData = async (data) => {
    const formData = new FormData();

    if (data.imageFile && data.imageFile.length > 0) {
      formData.append("imageFile", data.imageFile[0]);
    }
    formData.append("address", selectedLocation.place_name);
    formData.append("sex", data.gender);
    formData.append("age", data.age);
    formData.append("localization", data.localization);
    formData.append(
      "coordinates",
      selectedLocation.geometry.coordinates.join(", ")
    );

    // for (let pair of formData.entries()) {
    //   console.log(pair[0] + ": " + pair[1]);
    // }

    try {
      setLoad(true);
      let url = String(import.meta.env.VITE_URL);
      url += "v1/imageUpload";

      const response = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      //console.log(response);

      if (response.data.success) {
        setPrompt(response.data.result);
        showToast(response.data.message, "success");
        setSuccess((prev) => !prev);
        await fetchHospitals();
        reset();
      } else {
        setSuccess(false);
        //console.log('bye')
        showToast(response.data.message, "error");
      }
    } catch (err) {
      if (err.response) {
        // Server responded with a status code outside 2xx
        showToast(err.response.data.message || "Login failed", "error");
      } else {
        // Network or unknown error
        showToast("Something went wrong. Please try again.", "error");
      }
      //console.log('asd')
    } finally {
      reset();
      resetVal();
      setLoad(false);
    }
  };

  useEffect(() => {
    Aos.init({
      duration: 500,
      delay: 200,
    });
  }, []);



  return (
    <Container fluid className="mt-5 bg-gradient-to-b from-teal-50 to-teal-100">
      {login ? (
        <>
          <Container className="mt-5 d-flex justify-content-center align-items-center">
            <div
              className="w-100 bg-light mt-5 shadow-lg p-3"
              style={{ maxWidth: "450px" }}
              data-aos="fade-up"
            >
              <form onSubmit={handleSubmit(sendData)}>
                <Fieldset.Root
                  size="lg"
                  maxW="md"
                  width="100%"
                  marginTop={"5%"}
                  colorPalette={"teal"}
                >
                  <Stack>
                    <Fieldset.Legend
                      className="text-center"
                      style={{ color: "#2C7A7B" }}
                    >
                      Skin Analysis
                    </Fieldset.Legend>
                    <Text fontWeight={"bolder"} className="text-center">
                      Early detection saves lives
                    </Text>
                  </Stack>

                  <Fieldset.Content>
                    <SelectRoot
                      {...register("gender")}
                      collection={frameworks}
                      size="sm"
                    >
                      <SelectLabel>Select Gender</SelectLabel>
                      <SelectTrigger>
                        <SelectValueText placeholder="Select Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        {frameworks.items.map((val) => (
                          <SelectItem item={val} key={val.value}>
                            {val.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot>

                    <Field label="Age">
                      <Input required {...register("age")} type="number" />
                    </Field>

                    <SelectRoot
                      {...register("localization")}
                      collection={locations}
                      size="sm"
                    >
                      <SelectLabel>Localization</SelectLabel>
                      <SelectTrigger>
                        <SelectValueText placeholder="Select Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.items.map((val) => (
                          <SelectItem item={val} key={val.value}>
                            {val.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </SelectRoot>

                    <Field label="Address">
                      <LocationSearch onSelectLocation={setSelectedLocation} />
                    </Field>

                    <Field label="Upload Image">
                      <FileUploadRoot
                        accept={["image/*"]}
                        {...register("imageFile")}
                        onChange={handleFileChange}
                      >
                        <FileUploadTrigger asChild>
                          <Button variant="outline" size="sm" width={"100%"}>
                            <HiUpload /> Upload Image
                          </Button>
                        </FileUploadTrigger>
                        <FileUploadList />
                      </FileUploadRoot>
                    </Field>
                  </Fieldset.Content>

                  <Button
                    type="submit"
                    colorPalette={"green"}
                    variant={"subtle"}
                    alignSelf="flex-center"
                    marginTop={"5%"}
                    rounded={"2%"}
                    disabled={load}
                  >
                    {load ? <Spinner /> : "Submit"}
                  </Button>
                </Fieldset.Root>
              </form>
            </div>
          </Container>
          {prompt && (
           <Box 
           mx="auto" 
           p={6} 
           marginTop={5}
           borderWidth="1px" 
           borderRadius="lg" 
           boxShadow="lg" 
           bg="gray.50"
         >
           <VStack spacing={4} align="start">
             
             {/* Title */}
             <Text fontSize="xl" fontWeight="bold" color="blue.600">
               AI-Powered Skin Health Guidance 🩺✨
             </Text>
     
             <hr/>
     
              <TextParser text={prompt}/>
             <hr />
           </VStack>
         </Box>
          )}

          {
            <Container>
              {mapLoad ? (
                <div className="d-flex mb-2 mt-2 align-items-center justify-content-center">
                  {" "}
                  <Spinner size={"lg"} colorPalette={"teal"} />{" "}
                </div>
              ) : (
                <MapComponent hospitalData={hospitals} />
              )}
            </Container>
          }
        </>
      ) : (
        <h1 className="text-center mt-5">Please Login First...</h1>
      )}
    </Container>
  );
}
