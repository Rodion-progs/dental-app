import axios from '../../core/axios';

export default {
  get: () => axios.get('/appointments'),
  post: () => axios.post('/appointments', values),
}
