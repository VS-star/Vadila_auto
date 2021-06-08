import {Request, Response} from 'express';
import axios from 'axios';

interface PopulationInfo {
    year: string,
    value: string,
    sex: string,
    reliabilty: string
}

interface CityInfo {
    error: boolean,
    msg: string,
    data?: {
        city: string,
        country: string,
        populationCounts: PopulationInfo[]
    }
}

const apiPopulation = async (req: Request, res: Response) => {
    const city = {city: req.params.city};
    await axios.post('https://countriesnow.space/api/v0.1/countries/population/cities', city)
    .then(response => {
        const result: CityInfo = response.data;
        const data = result.data?.populationCounts[0];
        res.status(200).send(`${data?.value} (${data?.year})`);
    })
    .catch(error => {
        res.status(200).send(error.response.msg);
    });
}

export default apiPopulation;