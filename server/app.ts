import express from 'express';
import cors from 'cors';
import getCountries from './api/apiCountries';
import getCities from './api/apiCities';
import getPopulation from './api/apiPopulation';

const app = express();
const port = 5000;

app.use(cors());

app.get('/api/getCountries', getCountries);
app.get('/api/getCities/:country', getCities);
app.get('/api/getPopulation/:city', getPopulation);

app.listen(port, () => {
    console.log(`Application is start on port ${port}`);
});