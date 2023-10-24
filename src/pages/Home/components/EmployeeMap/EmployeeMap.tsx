import { ReactElement, useEffect, useRef } from 'react';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <Typography variant="h3">{status} ..</Typography>;
  if (status === Status.FAILURE) return <Typography variant="h3">{status} ...</Typography>;
  return <></>;
};

function MyMapComponent({ center, zoom }: { center: google.maps.LatLngLiteral; zoom: number }) {
  const ref = useRef(null);

  useEffect(() => {
    new window.google.maps.Map(ref.current!, {
      center,
      zoom,
    });
  }, []);

  return <Box style={{ width: '100%', height: '500px' }} ref={ref} id="map" />;
}

const PolandLocation = {
  lat: 51.9194,
  lng: 19.1451,
};

function EmployeeMap() {
  const center = PolandLocation;
  const zoom = 6;

  const apiKey = import.meta.env.VITE_MAP_API_KEY;

  return (
    <Wrapper apiKey={apiKey} render={render}>
      <MyMapComponent center={center} zoom={zoom} />
    </Wrapper>
  );
}

export default EmployeeMap;
