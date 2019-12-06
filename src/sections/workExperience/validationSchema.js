import * as yup from 'yup'
import { COUNTRY, COMPANY } from './fieldsNames'

const REQUIRED_MESSAGE = 'This field is required'

//TODO: validate more fields...
export default yup.object({
  [COUNTRY]: yup.string().required(REQUIRED_MESSAGE),
  [COMPANY]: yup.string().required(REQUIRED_MESSAGE),
})