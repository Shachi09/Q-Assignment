import React, { useEffect, useState } from "react";
import {
  Container,
  Modal,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import { deletePainting, getAllPaintings } from "../../services/ApiServices";

interface Painting {
  id: number;
  name: string;
  price: string;
  image: string;
}

const AllPaintingsList = () => {
  const navigate = useNavigate();
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(null);
  const [selectedPainting, setSelectedPainting] = useState<any>(null);

  const checkAuth = () => {
    if (!sessionStorage.getItem("loggedUser")) {
      toast.warning("Please first log in");
      navigate("/login-user");
      return false;
    }
    return true;
  };

  const getAllPaintingsList = async () => {
    try {
      const response = await getAllPaintings();
      if (response.status === 200) {
        setPaintings(response?.res);
      }
    } catch (error) {
      console.error("Error fetching paintings:", error);
    }
  };

  const handleOpen = (modalName: any) => {
    setOpenModal(modalName);
  };

  const handleClose = () => {
    setOpenModal(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!checkAuth()) return;
    setSearch(e.target.value);
  };

  const handleAddPainting = () => {
    if (!checkAuth()) return;
    navigate("/add-painting");
  };

  const handleViewDetails = (painting: any) => {
    if (!checkAuth()) return;
    setSelectedPainting(painting);
    handleOpen("viewModal");
    // setOpen(true);
  };

  const handleEditPainting = (painting: any) => {
    if (!checkAuth()) return;
    navigate("/edit-painting", { state: painting });
  };

  const handleDeleteClick = (painting: any) => {
    if (!checkAuth()) return;
    setSelectedPainting(painting);
    handleOpen("deleteModal");
    // setOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await deletePainting(selectedPainting.id);

      if (response.status_code === 200) {
        toast.success("Painting deleted successfully");
        handleClose();
        getAllPaintingsList();
      } else {
        throw new Error(response.message || "Failed to delete painting");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    // **** use with local storage ****
    // if (selectedPainting && selectedPainting.id) {
    //   const updatedPaintings = paintings.filter((p:any) => p.id !== selectedPainting.id);
    //   console.log("updatedPaintings: ", updatedPaintings);
    //   // return;

    //   setPaintings(updatedPaintings);
    //   localStorage.setItem("paintings", JSON.stringify(updatedPaintings));
    //  handleClose();
    // }

    // const filteredPaintings = paintings.filter((painting) =>
    //   painting.name.toLowerCase().includes(search.toLowerCase())
    // );
  };

  //to call the api on page render
  useEffect(() => {
    getAllPaintingsList(); //comment this to use local storage code

    // **** uses local storage ****
    //   const storedPaintings = JSON.parse(
    //     localStorage.getItem("paintings") || "[]"
    //   );
    //   setPaintings(storedPaintings);
    //   checkAuth();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "white",
        overflowY: "auto",
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
          Painting List
        </Typography>
        <Grid
          // container
          size={{ xs: 12 }}
          spacing={2}
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            // border: "1px solid red",
          }}
          justifyContent="space-between"
        >
          <Button
            variant="contained"
            onClick={handleAddPainting}
            sx={{ backgroundColor: "var(--primary-color)", color: "white" }}
          >
            + Add Painting
          </Button>
          {/* </Grid> */}
        </Grid>
        {paintings?.length === 0 ? (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", mt: 4, color: "var(--primary-color)" }}
          >
            No data available
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {paintings?.map((painting: any) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={painting.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="200"
                    image={painting.image}
                    alt={painting.name}
                  />
                  <CardContent>
                    <Typography variant="h6">{painting.name}</Typography>
                    <Typography variant="body1">
                      Price: ₹{painting.price}
                    </Typography>
                    <Box
                      sx={{
                        border: "1px solid var(--primaryLight-color)",
                        borderRadius: "10px",
                        marginTop: "10px",
                        padding: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                      }}
                    >
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleViewDetails(painting)}
                        sx={{ ml: 1 }}
                      >
                        <PreviewIcon sx={{ color: "var(--primary-color)" }} />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditPainting(painting)}
                        sx={{ ml: 1 }}
                      >
                        <EditIcon sx={{ color: "var(--primary-color)" }} />
                        {/* <ModeEditIcon /> */}
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteClick(painting)}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon sx={{ color: "var(--primary-color)" }} />
                        {/* <DeleteIcon /> */}
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
                <Modal open={openModal === "viewModal"} onClose={handleClose}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: 300,
                      bgcolor: "white",
                      boxShadow: 24,
                      p: 3,
                      borderRadius: "10px",
                      textAlign: "center",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "var(--primary-color)" }}
                    >
                      Painting Details
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,
                        mt: 2,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={selectedPainting?.image}
                        alt={selectedPainting?.name}
                        sx={{ width: "100%", height: "auto", maxWidth: 280 }}
                      />
                      <Typography
                        variant="h6"
                        sx={{ color: "var(--primary-color)" }}
                      >
                        {selectedPainting?.name}
                      </Typography>
                      <Grid
                        container
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Grid
                          size={{ sm: 12 }}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ color: "var(--primary-color)" }}
                          >
                            Price: {selectedPainting?.price}
                          </Typography>
                        </Grid>
                        <Grid
                          size={{ sm: 12 }}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ color: "var(--primary-color)" }}
                          >
                            Material: {selectedPainting?.material}
                          </Typography>
                        </Grid>
                        <Grid
                          size={{ sm: 12 }}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-start",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ color: "var(--primary-color)" }}
                          >
                            Dimensions: {selectedPainting?.dimensions}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Modal>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
      {/* <Modal open={open} onClose={() => setOpen(false)}> */}
      <Modal open={openModal === "deleteModal"} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "white",
            boxShadow: 24,
            p: 3,
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Confirm Deletion</Typography>
          <Typography variant="body2" color="var(--primary-color)">
            Are you sure you want to delete this painting?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
              gap: "8px",
            }}
          >
            <Button
              variant="outlined"
              sx={{ ml: 2 }}
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => handleDeleteConfirm()}
              sx={{ backgroundColor: "var(--secondary-color)", color: "white" }}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AllPaintingsList;
