import {Request, Response} from 'express';
import axios from 'axios';

interface CountryInfo {
    country: string,
    cities: string[]
}

interface CountriesInfo {
    error: boolean,
    msg: string,
    data?: CountryInfo[]
}

const apiCountries = async (req: Request, res: Response) => {
    await axios.get('https://countriesnow.space/api/v0.1/countries')
    .then(response => {
        const result: CountriesInfo = response.data;
        let data: string[] = [];
        result.data?.map(d => data.push(d.country));
        res.status(200).send(data);
    })
    .catch(error => {
        res.status(404).send(error.response.msg);
    })
}

export default apiCountries;