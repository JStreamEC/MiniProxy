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

        if (!response.ok) {
            // Si la respuesta no es 200 OK, muestra el error
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        res.json(data); // Devuelve los datos JSON al cliente
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        res.status(500).json({ error: `Error al obtener los datos: ${error.message}` });
    }
});
