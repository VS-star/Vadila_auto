import {Request, Response} from 'express';
import axios from 'axios';

interface CountryInfo {
    error: boolean,
    msg: string,
    data?: string[]
}

const apiCities = async (req: Request, res: Response) => {
    const country = {country: req.params.country};
    await axios.post('https://countriesnow.space/api/v0.1/countries/cities', country)
    .then(response => {
        const result: CountryInfo = response.data;
        res.status(200).send(result.data);
    })
    .catch(error => {
        res.status(404).send(error.response.msg);
    });
}

export default apiCities;