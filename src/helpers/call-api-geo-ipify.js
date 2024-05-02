import axios from 'axios';

const geoIpifyApiUrl = import.meta.env.VITE_GEO_IPIFY_API_URL;
const geoIpifyApiKey = import.meta.env.VITE_GEO_IPIFY_API_KEY;

const callApiGeoIpify = async (params = {}) => {
  try {
    const response = await axios.request({
      method: 'GET',
      url: geoIpifyApiUrl + '/api/v2/country,city',
      params: {
        apiKey: geoIpifyApiKey,
        ...params
      }
    });

    return {
      status: true,
      data: response.data
    };
  } catch (error) {
    return {
      status: false,
      data: error.response.data
    };
  }
};

export default callApiGeoIpify;
