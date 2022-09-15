import {consts} from '../consts';
import axios from 'axios';

export const ax = axios.create({
  baseURL: consts.apiUrl,
});
