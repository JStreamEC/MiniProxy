const express = require("express");
const fetch = require("node-fetch");

const app = express();
const PORT = process.env.PORT || 3000; // Alwaysdata asigna un puerto automáticamente

app.use(express.json());

// Proxy para redirigir la solicitud y añadir el encabezado Referer
app.get("/proxy", async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).json({ error: "Falta el parámetro 'url'" });
    }

    try {
        const response = await fetch(targetUrl, {
            headers: {
                Referer: "https://www.sportlive.cc/", // Agrega el encabezado Referer
            },
        });
        const data = await response.json();
        res.json(data); // Devuelve los datos JSON al cliente
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: "Error al obtener los datos" });
    }
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor proxy escuchando en el puerto ${PORT}`);
});
