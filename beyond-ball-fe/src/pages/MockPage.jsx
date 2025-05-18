import React, { useEffect, useState } from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import { RequestInstance } from '../APIs/RequestInstance';
import { USER_ENDPOINTS } from '../APIs/Endpoints';
import Storage from '../utils/Storage';
import Layout from "../components/sidebar/Layout.jsx";

const MockPage = () => {
    const [response, setResponse] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const teamId = Storage.getTeamIdFromToken();
  
    useEffect(() => {
      const url = USER_ENDPOINTS.MOCK.replace("{teamId}", teamId);
  
      RequestInstance.get(url)
        .then((res) => {
          setResponse(res.data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.response?.data || "Access denied or invalid token.");
          setLoading(false);
        });
    }, [teamId]);
  
    return (
      <Layout>
        <Box
          sx={{
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Admin Mock Page
          </Typography>
  
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error" variant="body1">
              {error}
            </Typography>
          ) : (
            <Typography variant="body1">{response}</Typography>
          )}
        </Box>
      </Layout>
    );
  };

export default MockPage;
