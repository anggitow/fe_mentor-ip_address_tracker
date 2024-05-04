import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import iconArrow from '@assets/icon-arrow.svg';
import imgLoading from '@assets/loading.png';
import DisplayData from '@components/DisplayData';
import Maps from '@components/Maps';
import callApiGeoIpify from '@helpers/call-api-geo-ipify';
import validateInput from '@helpers/validate-input';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [ipAddress, setIpAddress] = useState('');
  const [location, setLocation] = useState('');
  const [timezone, setTimezone] = useState('');
  const [isp, setIsp] = useState('');
  const [mapPosition, setMapPosition] = useState({ lat: 0, lng: 0 });

  const showSwal = (message) => {
    withReactContent(Swal).fire({ icon: 'error', title: 'Oops...', text: message });
  };

  const fetchData = async (params = {}) => {
    setIsSubmitting(true);
    setIpAddress('');
    setLocation('');
    setTimezone('');
    setIsp('');

    const response = await callApiGeoIpify(params);
    const { status, data } = response;
    if (status) {
      const { city, region, postalCode, timezone, lat, lng } = data.location;
      setIpAddress(data.ip);
      setLocation(city + ', ' + region + ' ' + postalCode);
      setTimezone('UTC ' + timezone);
      setIsp(data.isp);
      setMapPosition({ lat, lng });
    } else {
      showSwal(data.messages);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { value } = event.target.ip_or_domain;
    const input = validateInput(value);

    if (!input) {
      showSwal('Invalid input');
    } else {
      fetchData(input);
    }
  };

  return (
    <div className="font-rubik">
      <div className="h-[300px] bg-blue-700 bg-[url('@assets/pattern-bg-mobile.png')] bg-cover bg-center bg-no-repeat md:h-[250px] md:bg-[url('@assets/pattern-bg-desktop.png')]">
        <div className="flex flex-col items-center">
          <h3 className="py-6 text-2xl font-medium text-white md:py-6 md:text-[30px]">IP Address Tracker</h3>
          <div className="flex w-full max-w-[450px] flex-col items-center px-5 md:max-w-[unset]">
            <form onSubmit={handleSubmit} className="flex w-full justify-center pb-6 md:pb-10">
              <input
                type="text"
                className="h-12 w-full rounded-s-xl px-5 focus-visible:outline-none md:h-14 md:w-[500px] md:text-lg"
                placeholder="Search for any IP address or domain"
                name="ip_or_domain"
                value={inputValue}
                onChange={(event) => {
                  setInputValue(event.target.value.toLowerCase());
                }}
              />
              <button type="submit" className="rounded-e-xl bg-black px-5 text-white transition-all duration-200 hover:bg-very-dark-gray">
                <img src={iconArrow} alt="arrow" />
              </button>
            </form>
            <div className="relative z-10 flex w-full flex-col items-center justify-center space-y-4 rounded-xl bg-white p-5 text-center md:w-4/5 md:max-w-[1440px] md:flex-row md:items-stretch md:space-x-5 md:space-y-0 md:p-7 md:text-start">
              <DisplayData label="IP ADDRESS" data={ipAddress} />
              <DisplayData label="LOCATION" data={location} />
              <DisplayData label="TIMEZONE" data={timezone} />
              <DisplayData label="ISP" data={isp} border={false} />
              {isSubmitting && (
                <div className="absolute inset-0 !m-0 flex items-center justify-center rounded-xl bg-black/40">
                  <img src={imgLoading} alt="loading" className="h-16 animate-spin" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Maps position={mapPosition} />
    </div>
  );
}

export default App;
