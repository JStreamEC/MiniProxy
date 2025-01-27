import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 10000; // Usar el puerto proporcionado por Replit

app.use(express.json());

app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send('Falta la URL de destino');
    }

    try {
        const response = await fetch(targetUrl, {
            headers: {
                'Referer': 'https://www.sportlive.cc/',
            },
        });

        if (!response.ok) {
            return res.status(response.status).send('Error al obtener los datos');
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los datos');
    }
});

app.listen(port, () => {
    console.log(`Proxy activo en http://localhost:${port}`);
});
