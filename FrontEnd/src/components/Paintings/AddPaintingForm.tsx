import { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {addPainting} from "../../services/ApiServices";

interface PaintingForm {
  dimensions: string;
  name: string;
  keyword: string;
  price: string;
  material: string;
  image: string;
}

const AddPaintingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<PaintingForm>();

  const navigate = useNavigate();

  const [imageBase64, setImageBase64] = useState("");

  const convertToBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
// React.ChangeEvent<HTMLInputElement>
  const handleImageUpload = async (event:any) => {
    if (event.target.files && event.target.files[0]) {
      const base64 = await convertToBase64(event.target.files[0]);
      setImageBase64(base64);
    }
  };

  const onSubmit = async (data: any) => {
    if (!imageBase64) {
      toast.error("Please upload an image");
      return;
    }

    const newPainting: PaintingForm = {      
      name: data.name,
      dimensions: data.dimensions,
      keyword: data.keyword,
      price: data.price,
      material: data.material,
      image: imageBase64,
    };


  try{
    const response = await addPainting(newPainting);
    if (response.status === 200) {
      toast.success("Painting added successfully");
       navigate("/");
       return
    }
  } catch (error) {
    console.log(error);
    return toast.error("Error adding painting");
  }



  // **** uses local storage ****//
    // const storedPaintings = JSON.parse(localStorage.getItem("paintings") || "[]");
    // storedPaintings.push(newPainting);
    // localStorage.setItem("paintings", JSON.stringify(storedPaintings));
    // toast.success("Painting added successfully");
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
          Add Painting
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
            fullWidth            
            label="Name"
            {...register("name", {
              required: "Name is required",
            })}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            inputMode="numeric"
            label="Dimensions(in cm)"
            {...register("dimensions", {
              required: "Dimensions are required",
              pattern: /^[0-9\s,]+$/,
            })}
            error={!!errors.dimensions}
            helperText={errors.dimensions?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            type="text"
            label="Keyword / Type"
            {...register("keyword", { required: "keyword is required" })}
            error={!!errors.keyword}
            helperText={errors.keyword?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Price (in Rs.)"
            inputMode="numeric"
            type="number"
            {...register("price", { required: "Price is required" })}           
            error={!!errors.price}
            helperText={errors.price?.message}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Material"
            {...register("material", { required: "Material is required" })}
            error={!!errors.material}
            helperText={errors.material?.message}
            sx={{ mb: 2 }}
          />
          {/* <TextField
            fullWidth
            label="Image URL"
            {...register("image", { required: "Image URL is required" })}
            error={!!errors.image}
            helperText={errors.image?.message}
            sx={{ mb: 2 }}
          /> */}
          <Button variant="contained" component="label" sx={{ mt: 2, backgroundColor: "var(--primaryLight-color)", color: "var(--primary-color)" }}>
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageUpload}
            />
          </Button>
          {imageBase64 && (
            <Typography variant="body2" sx={{ mt: 1, color: "var(--primaryLight-color)" }}>
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
              variant="contained"
              type="submit"
              sx={{
                mt: 2,
                backgroundColor: "var(--primary-color)",
                width: "165px",
                color: "white",
              }}
            >
              Add Painting
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default AddPaintingForm;

// export default AddPaintingForm
