import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
  Badge,
  IconButton,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function ProductDetail({ onAddToCart, cartItemsCount = 0 }) {
  const [product, setProduct] = useState(null);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://api.escuelajs.co/api/v1/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error loading product:", error);
      });
  }, [id]);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    const itemToAdd = {
      id: product.id,
      title: product.title,
      price: product.price,
      images: product.images,
      quantity: 1,
    };

    onAddToCart(itemToAdd);

    setTimeout(() => {
      setIsAddingToCart(false);
    }, 500);
  };

  if (!product) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 12, mb: 5, mx: "auto", maxWidth: "lg", px: 3 }}>
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

      <Card sx={{ maxWidth: 800, mx: "auto", boxShadow: 3 }}>
        <CardMedia
          component="img"
          height="400"
          image={product.images?.[0] || "https://via.placeholder.com/150"}
          alt={product.title}
          sx={{ objectFit: "cover" }}
        />
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {product.description}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/products")}
            >
              Back to Products
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              startIcon={isAddingToCart ? <CircularProgress size={20} /> : null}
            >
              {isAddingToCart ? "Adding..." : "Add to Cart"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ProductDetail;
