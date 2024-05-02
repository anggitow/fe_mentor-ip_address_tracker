import iconArrow from '@assets/icon-arrow.svg';
import DisplayData from '@components/DisplayData';

function App() {
  return (
    <div className="font-rubik">
      <div className="h-[300px] bg-blue-700 bg-[url('@assets/pattern-bg-mobile.png')] bg-cover bg-center bg-no-repeat md:h-[280px] md:bg-[url('@assets/pattern-bg-desktop.png')]">
        <div className="flex flex-col items-center">
          <h3 className="py-6 text-2xl font-medium text-white md:py-8 md:text-[30px]">IP Address Tracker</h3>
          <div className="flex w-full max-w-[450px] flex-col items-center px-5 md:max-w-[unset]">
            <form className="flex w-full justify-center pb-6 md:pb-12">
              <input
                type="text"
                className="h-12 w-full rounded-s-xl px-5 focus-visible:outline-none md:h-16 md:w-[500px]"
                placeholder="Search for any IP address or domain"
                name="ip_domain"
              />
              <button type="submit" className="hover:bg-very-dark-gray rounded-e-xl bg-black px-5 text-white transition-all duration-200">
                <img src={iconArrow} alt="arrow" />
              </button>
            </form>
            <div className="flex w-full flex-col items-center justify-center space-y-6 rounded-xl bg-white p-6 text-center md:w-4/5 md:max-w-[1440px] md:flex-row md:items-stretch md:space-x-5 md:space-y-0 md:p-7 md:text-start">
              <DisplayData label="IP ADDRESS" data="172.217.12.142" />
              <DisplayData label="LOCATION" data="Daerah Istimewa Yogyakarta, PH" />
              <DisplayData label="TIMEZONE" data="UTC+08:00" />
              <DisplayData label="ISP" data="Linode, Inc." border={false} />
            </div>
          </div>
        </div>
      </div>
      <div className="h-80 bg-orange-400">map</div>
    </div>
  );
}

export default App;
