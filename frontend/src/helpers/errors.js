import { get } from 'lodash';
import { INTERNAL_ERROR } from '../constants/API';

export const catchAPIError = (e) => get(e, 'response.data.message', INTERNAL_ERROR);
