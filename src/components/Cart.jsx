import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  IconButton,
  Box,
  Grid,
  Paper,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";

function Cart({ cartItems, onUpdateQuantity, onRemoveItem }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setPaymentComplete(true);
      cartItems.forEach((item) => onRemoveItem(item.id));
    }, 2000);
  };

  if (paymentComplete) {
    return (
      <Container maxWidth="sm" sx={{ mt: 12 }}>
        <Alert
          severity="success"
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& .MuiAlert-message": { width: "100%" },
          }}
        >
          <Typography variant="h5" gutterBottom align="center">
            Payment Successful!
          </Typography>
          <Typography align="center">Thank you for your purchase.</Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingBagIcon />}
            onClick={() => {
              setPaymentComplete(false);
              navigate("/products");
            }}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Alert>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ mt: 12 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <ShoppingCartIcon
            sx={{ fontSize: 60, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            Shopping Cart is Empty
          </Typography>
          <Typography color="text.secondary" paragraph>
            Add some products to your cart to proceed.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ShoppingBagIcon />}
            onClick={() => navigate("/products")}
            sx={{ mt: 2 }}
          >
            Continue Shopping
          </Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          {cartItems.map((item) => (
            <Card
              key={item.id}
              sx={{ mb: 2, display: "flex", position: "relative" }}
            >
              <CardMedia
                component="img"
                sx={{ width: 200, height: 200, objectFit: "cover" }}
                image={item.images?.[0] || "https://via.placeholder.com/200"}
                alt={item.title}
              />
              <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="h6" gutterBottom>
                    {item.title}
                  </Typography>
                  <Typography variant="h6" color="primary" gutterBottom>
                    ${item.price}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mt: 2,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      color="primary"
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body1" sx={{ mx: 2 }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                      color="primary"
                    >
                      <AddIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => onRemoveItem(item.id)}
                      sx={{ ml: 2 }}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography color="text.secondary">Total Items</Typography>
              <Typography>
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Typography color="text.secondary">Total Amount</Typography>
              <Typography variant="h6" color="primary">
                ${totalAmount.toFixed(2)}
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              startIcon={
                isCheckingOut ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              {isCheckingOut ? "Processing..." : "Proceed to Payment"}
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cart;
