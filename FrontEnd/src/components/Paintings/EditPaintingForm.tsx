import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { updatedPainting } from "../../services/ApiServices";
import { getPaintingById } from "../../services/ApiServices";

interface Painting {
  id: number;
  name: string;
  dimensions: string;
  keyword: string;
  price: string;
  material: string;
  image: string;
}

const EditPaintingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();  
  const paintingId = location.state.id;  
  const [paintingData, setPaintingData] = useState<Painting>();

  const [imageBase64, setImageBase64] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Painting>();


  const getPainting = async(paintingId: any) => {
    try {
      const response = await getPaintingById(paintingId);
      if (response.status === 200) {
        setPaintingData(response.res);
        return;
      }
    } catch (error) {
      
    }
  }

useEffect(() => {
  if (paintingId) {
    getPainting(paintingId);
  }
}, [paintingId]);

  useEffect(() => {    
    if (paintingData) {
      setValue("name", paintingData.name || "NA");
      setValue("dimensions", paintingData.dimensions || "NA");
      setValue("keyword", paintingData.keyword || "NA");
      setValue("price", paintingData.price || "NA");
      setValue("material", paintingData.material || "NA");
      setImageBase64(paintingData.image || "NA"); 
    }
  }, [paintingData, setValue]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase64(reader.result as string); // Set the image data to the state
      };
      reader.readAsDataURL(file);
    }
  };


  const onSubmit = async (data: Painting) => {  
    //to modify data  
    const payload = {
      ...data,
      image: imageBase64,
    }
    try {
      const response = await updatedPainting(payload, paintingId);      
      if (response.status === 200) {
        navigate("/");
        toast.success("Painting updated successfully");
        return;
      }
    } catch (error) {
      console.log("error occured: ", error);
      toast.error("Something went wrong");
      return;
    }

    // ***** with local storage *****
    // const storedPaintings: Painting[] = JSON.parse(
    //   localStorage.getItem("paintings") || "[]"
    // );
    // const updatedPaintings = storedPaintings.map((p) =>
    //   p.id === painting.id
    //     ? { ...data, id: painting.id, image: imageBase64 || painting.image } // Use the new image or retain the old one
    //     : p
    // );
    // localStorage.setItem("paintings", JSON.stringify(updatedPaintings));
    // toast.success("Painting updated successfully");
    // navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "white",
      }}
    >
      <Container
        sx={{
          border: "1px solid var(--primary-color)",
          borderRadius: "10px",
          width: "80%",
          height: "90%",
          msOverflowY: "auto",
        }}
      >
        <Typography
          variant="h4"
          sx={{ textAlign: "center", my: 2, color: "var(--primary-color)" }}
        >
          Edit Painting
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Name"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Dimensions"
            {...register("dimensions", { required: "Dimensions are required" })}
            error={!!errors.dimensions}
            helperText={errors.dimensions?.message}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Keyword/Type"
            {...register("keyword", { required: "Keyword is required" })}
            error={!!errors.keyword}
            helperText={errors.keyword?.message}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Price"
            {...register("price", { required: "Price is required" })}
            error={!!errors.price}
            helperText={errors.price?.message}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Material"
            {...register("material", { required: "Material is required" })}
            error={!!errors.material}
            helperText={errors.material?.message}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
            sx={{ mb: 2 }}
          />

            {/* Image Upload Section */}
            <Button
            variant="contained"
            component="label"
            sx={{
              mt: 2,
              backgroundColor: "var(--primaryLight-color)",
              color: "var(--primary-color)",
            }}
          >
            Upload Image
            <input            
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </Button>

          {imageBase64 && (
            <Typography
              variant="body2"
              sx={{ mt: 1, color: "var(--primaryLight-color)" }}
            >
              Image uploaded successfully!
            </Typography>
          )}
        
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                backgroundColor: "var(--primary-color)",
                width: "165px",
                color: "white",
              }}
            >
              Update Painting
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default EditPaintingForm;
