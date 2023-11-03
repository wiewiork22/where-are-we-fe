import { ReactElement } from 'react';
import { Status, Wrapper } from '@googlemaps/react-wrapper';
import Typography from '@mui/material/Typography';
import { Employee } from '../../../../models/Employee.ts';
import GoogleMapComponent from './GoogleMapComponent.tsx';
import LatLngLiteral = google.maps.LatLngLiteral;

const PolandLocation = {
  lat: 51.9194,
  lng: 19.1451,
};

const render = (status: Status): ReactElement => {
  if (status === Status.LOADING) return <Typography variant="h3">{status} ..</Typography>;
  if (status === Status.FAILURE) return <Typography variant="h3">{status} ...</Typography>;
  return <></>;
};

type MapOptions = {
  center: LatLngLiteral;
  zoom: number;
  mapId: string;
};

function EmployeeMap(employees: Employee[]) {
  const apiKey = import.meta.env.VITE_MAP_API_KEY;
  const mapId = import.meta.env.VITE_MAP_ID;

  const mapOptions: MapOptions = {
    center: PolandLocation,
    zoom: 6,
    mapId: mapId,
  };

  return (
    <Wrapper apiKey={apiKey} render={render} libraries={['marker', 'core']}>
      <GoogleMapComponent mapOptions={mapOptions} employees={employees} />
    </Wrapper>
  );
}

export default EmployeeMap;
