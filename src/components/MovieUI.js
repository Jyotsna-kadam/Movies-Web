import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Container,
  Grid,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import moviesData from "./movies-filter-react.json";

const Movie = () => {
  const [filters, setFilters] = useState({
    language: [],
    country: [],
    genre: [],
  });

  const clearFilters = () => {
    setFilters({
      language: [],
      country: [],
      genre: [],
    });
    applyFilters({
      language: [],
      country: [],
      genre: [],
    });
  };

  const [filteredMovies, setFilteredMovies] = useState(moviesData);

  const applyFilters = (updatedFilters) => {
    let filtered = moviesData.filter((movie) => {
      return (
        (updatedFilters.language.length === 0 ||
          updatedFilters.language.some((lang) =>
            movie.movielanguages.includes(lang)
          )) &&
        (updatedFilters.genre.length === 0 ||
          updatedFilters.genre.some((genre) =>
            movie.moviegenres.includes(genre)
          ))
      );
    });
    setFilteredMovies(filtered);
  };

  const handleSelectChange = (filterName, selectedValues) => {
    setFilters({
      ...filters,
      [filterName]: selectedValues,
    });
    applyFilters({ ...filters, [filterName]: selectedValues });
  };

  return (
    <Container
      style={{ backgroundColor: "#111", color: "#fff", padding: "20px" }}
    >
      <Typography
        variant="h6"
        style={{
          position: "absolute",
          top: "10px",
          right: "190px",
          color: "#ccc",
        }}
      >
        © Jyotsna Kadam
      </Typography>
      <Typography
        variant="h1"
        style={{ fontSize: "40px", marginBottom: "20px" }}
      >
        Movies Filter
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card
            style={{ backgroundColor: "#222", color: "#fff", padding: "10px" }}
          >
            <CardContent>
              {/* <Typography variant="h2" style={{ fontSize:"40px" }} >Filters</Typography> */}
              <div style={{ marginTop: "20px" }}>
                <Typography variant="h3" style={{ fontSize: "30px" }}>
                  Languages
                </Typography>
                <Select
                  multiple
                  value={filters.language}
                  onChange={(event) =>
                    handleSelectChange("language", event.target.value)
                  }
                  renderValue={(selected) => selected.join(", ")}
                  style={{ width: "100%", marginBottom: "10px", color: "#fff",border: "1px solid #fff" }}
                >
                  {[
                    "Hindi",
                    "English",
                    "Tamil",
                    "Telugu",
                    "Kannada",
                    "Malayalam",
                  ].map((lang) => (
                    <MenuItem key={lang} value={lang}>
                      <Checkbox checked={filters.language.includes(lang)} />
                      <ListItemText primary={lang} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div style={{ marginTop: "20px" }}>
                <Typography variant="h3" style={{ fontSize: "30px" }}>
                  Genres
                </Typography>
                <Select
                  multiple
                  value={filters.genre}
                  onChange={(event) =>
                    handleSelectChange("genre", event.target.value)
                  }
                  renderValue={(selected) => selected.join(", ")}
                  style={{ width: "100%", marginBottom: "10px", color: "#fff", border: "1px solid #fff"}}
                >
                  {[
                    "Action",
                    "Adventure",
                    "Comedy",
                    "Drama",
                    "Fantasy",
                    "Romance",
                    "Thriller",
                    "Documentary",
                    "Crime",
                    "Sport",
                  ].map((genre) => (
                    <MenuItem key={genre} value={genre}>
                      <Checkbox checked={filters.genre.includes(genre)} />
                      <ListItemText primary={genre} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <Button
                variant="contained"
                color="primary"
                onClick={clearFilters}
                style={{ marginTop: "20px" }}
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h2">Movie List</Typography>
          <Grid container spacing={3}>
            {filteredMovies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie.imdbmovieid}>
                <Card
                  style={{
                    marginBottom: "20px",
                    backgroundColor: "#000",
                    color: "#fff",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={movie.moviemainphotos[0]}
                    alt={movie.movietitle}
                  />
                  <CardContent>
                    <Typography variant="h3" style={{ marginBottom: "10px" }}>
                      {movie.movietitle}
                    </Typography>
                    <Typography>
                      Languages: {movie.movielanguages.join(", ")}
                    </Typography>
                    <Typography>
                      Countries: {movie.moviecountries.join(", ")}
                    </Typography>
                    <Typography>
                      Genres: {movie.moviegenres.join(", ")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Movie;
