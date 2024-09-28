import { useEffect, useState, useRef } from "react";
import {
  Typography,
  Card,
  CardMedia,
  Box,
  IconButton,
  Container,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = "7cb4f6596ecee13484427f16c45ae5ff";
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`;

  // Ref for å få tilgang til scrollområdet
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Funksjon for å scrolle til venstre
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: -300, // Juster denne verdien for hvor langt du vil scrolle
        behavior: "smooth",
      });
    }
  };

  // Funksjon for å scrolle til høyre
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: 300, // Juster denne verdien for hvor langt du vil scrolle
        behavior: "smooth",
      });
    }
  };

  return (
    <Container>
      <Typography
        style={{
          color: "white",
          margin: "12px 0px 12px 0px",
          fontWeight: "bold", // Legg til denne linjen
        }}
        variant="h4"
        gutterBottom
        textAlign="left"
      >
        Populære Filmer
      </Typography>

      {loading && <Typography>Laster...</Typography>}
      {error && <Typography>Feil: {error.message}</Typography>}

      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Navigasjonspil til venstre */}
        <IconButton
          onClick={scrollLeft}
          sx={{
            position: "absolute",
            left: 0,
            zIndex: 2,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <ArrowBackIos />
        </IconButton>

        {/* Scrollbar-containeren */}
        <Box
          ref={scrollContainerRef}
          sx={{
            display: "flex",
            flexDirection: "row",
            overflowX: "scroll",
            overflowY: "hidden",
            flexWrap: "nowrap",
            width: "100%",
            scrollBehavior: "smooth",
            "-ms-overflow-style": "none",
            "scrollbar-width": "none",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {movies.map((movie, index) => (
            <Box key={movie.id} sx={{ position: "relative", marginRight: 2 }}>
              {/* Nummerering av filmen */}
              <Typography
                variant="h2"
                component="div"
                sx={{
                  position: "absolute",
                  bottom: -20,
                  left: 10,
                  zIndex: 2,
                  color: "#fff",
                  fontWeight: "bold",
                  textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
                  fontSize: "3rem",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              >
                {index + 1}
              </Typography>

              {/* Filmkort med hover-animasjon */}
              <Card
                sx={{
                  minWidth: 140, // Mindre bredde for å ligne Netflix
                  height: 225, // Mindre høyde for en mer kompakt stil
                  borderRadius: "15px", // Rundere kanter som på Netflix
                  overflow: "hidden",
                  position: "relative",
                  transition:
                    "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)", // Gir et fint skyggelagt utseende ved hover
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  alt={movie.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </Card>
            </Box>
          ))}
        </Box>

        {/* Navigasjonspil til høyre */}
        <IconButton
          onClick={scrollRight}
          sx={{
            position: "absolute",
            right: 0,
            zIndex: 2,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
          }}
        >
          <ArrowForwardIos />
        </IconButton>
      </Box>
    </Container>
  );
}

export default App;
