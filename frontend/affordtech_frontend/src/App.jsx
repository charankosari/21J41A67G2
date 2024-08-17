import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  InputAdornment,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Box,
  Button,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

const App = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("mobile");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price");

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:1337/api/ck/categories/${category}/products`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const filteredProducts = products
    .filter((product) =>
      product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "price") {
        return a.price - b.price;
      } else if (sortOption === "rating") {
        return b.rating - a.rating;
      } else {
        return b.discount - a.discount;
      }
    });

  return (
    <Paper
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        paddingTop: "20px",
      }}
    >
      <Container>
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
              marginBottom: "16px",
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    startIcon={<FilterListIcon />}
                    sx={{ marginRight: 1 }}
                  >
                    Filters
                  </Button>
                </InputAdornment>
              ),
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <FormControl
              variant="outlined"
              sx={{ marginBottom: "16px", minWidth: 120 }}
            >
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                onChange={handleCategoryChange}
                label="Category"
              >
                <MenuItem value="mobile">Mobile</MenuItem>
                <MenuItem value="TV">TV</MenuItem>
              </Select>
            </FormControl>

            <FormControl
              variant="outlined"
              sx={{ marginBottom: "16px", minWidth: 120 }}
            >
              <InputLabel>Sort by</InputLabel>
              <Select
                value={sortOption}
                onChange={handleSortChange}
                label="Sort by"
              >
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
                <MenuItem value="discount">Discount</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card
                  sx={{
                    backgroundColor: "#ffffff",
                    borderRadius: "10px",
                    boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
                    transition: "transform 0.2s",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://via.placeholder.com/300?text=${product.productName}`}
                    alt={product.productName}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.productName}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {product.description}
                    </Typography>
                    <Typography variant="body1">
                      Price: ₹{product.price}
                    </Typography>
                    <Typography variant="body1">
                      Rating: {product.rating} ★
                    </Typography>
                    <Typography variant="body1">
                      Discount: {product.discount}%
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "50px",
                color: "#757575",
              }}
            >
              <SentimentDissatisfiedIcon sx={{ fontSize: 60 }} />
              <Typography variant="h6">No products found</Typography>
            </Box>
          )}
        </Grid>
      </Container>
    </Paper>
  );
};

export default App;
