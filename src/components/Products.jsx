import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  Box,
  IconButton,
  Badge,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export function Products({ onAddToCart, cartItemsCount = 0 }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState({});
  const ITEMS_PER_PAGE = 6;
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  function loadProducts(url = "https://api.escuelajs.co/api/v1/products") {
    axios
      .get(url)
      .then((response) => {
        setProducts(response.data);
        setTotalPages(Math.ceil(response.data.length / ITEMS_PER_PAGE));
        setPage(1);
      })
      .catch((error) => {
        console.error("Error loading products:", error);
      });
  }

  function loadCategories() {
    axios
      .get("https://api.escuelajs.co/api/v1/categories")
      .then((response) => {
        setCategories([{ id: "all", name: "All" }, ...response.data]);
      })
      .catch((error) => {
        console.error("Error loading categories:", error);
      });
  }

  function handleCategoryChange(event) {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    setSelectedProduct(null);

    if (categoryId === "all") {
      loadProducts();
    } else {
      loadProducts(
        `https://api.escuelajs.co/api/v1/categories/${categoryId}/products`
      );
    }
  }

  function handlePageChange(event, value) {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const handleAddToCart = (item) => {
    setIsAddingToCart((prev) => ({ ...prev, [item.id]: true }));

    const itemToAdd = {
      id: item.id,
      title: item.title,
      price: item.price,
      images: item.images,
      quantity: 1,
    };

    onAddToCart(itemToAdd);

    setTimeout(() => {
      setIsAddingToCart((prev) => ({ ...prev, [item.id]: false }));
    }, 500);
  };

  const getCurrentPageProducts = () => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return products.slice(startIndex, endIndex);
  };

  return (
    <>
      <Box sx={{ mb: 10 }}>
        <NavBar />
      </Box>

      {/* Floating Cart Badge */}
      <Box sx={{ position: "fixed", top: 16, right: 16, zIndex: 1000 }}>
        <IconButton
          color="primary"
          onClick={() => navigate("/cart")}
          sx={{ backgroundColor: "white", boxShadow: 2 }}
        >
          <Badge badgeContent={cartItemsCount} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Box>

      <Container maxWidth="lg">
        <Typography
          variant="h4"
          color="primary"
          textAlign="center"
          fontWeight="bold"
          mb={4}
        >
          Explore Our Products
        </Typography>

        {!selectedProduct && (
          <Box sx={{ mb: 4, display: "flex", justifyContent: "center" }}>
            <FormControl sx={{ width: "50%" }}>
              <InputLabel id="category-select-label">
                Select Category
              </InputLabel>
              <Select
                labelId="category-select-label"
                value={selectedCategory}
                label="Select Category"
                onChange={handleCategoryChange}
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {selectedProduct ? (
          <Card>
            <CardMedia
              component="img"
              height="300"
              image={
                selectedProduct.images?.[0] || "https://via.placeholder.com/150"
              }
              alt={selectedProduct.title}
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {selectedProduct.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                gutterBottom
              >
                ${selectedProduct.price}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedProduct.description}
              </Typography>
              <Button
                variant="contained"
                onClick={() => setSelectedProduct(null)}
              >
                Back
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            <Grid container spacing={3}>
              {getCurrentPageProducts().map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={
                        item.images?.[0] || "https://via.placeholder.com/150"
                      }
                      alt={item.title}
                      sx={{ objectFit: "cover" }}
                    />
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h6" gutterBottom>
                        {item.title}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        gutterBottom
                      >
                        ${item.price}
                      </Typography>
                      <Box sx={{ mt: "auto", display: "flex", gap: 1 }}>
                        <Button
                          variant="contained"
                          startIcon={
                            isAddingToCart[item.id] ? null : (
                              <ShoppingCartIcon />
                            )
                          }
                          onClick={() => handleAddToCart(item)}
                          disabled={isAddingToCart[item.id]}
                          fullWidth
                        >
                          {isAddingToCart[item.id]
                            ? "Adding..."
                            : "Add to Cart"}
                        </Button>
                        <Button
                          component={Link}
                          to={`/products/${item.id}`}
                          variant="outlined"
                          startIcon={<VisibilityIcon />}
                        >
                          View
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box
              sx={{ mt: 4, mb: 4, display: "flex", justifyContent: "center" }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          </>
        )}
      </Container>
    </>
  );
}

export default Products;
