import { Employee } from '../../../../models/Employee.ts';
import GoogleMapComponent from './GoogleMapComponent.tsx';
import LatLngLiteral = google.maps.LatLngLiteral;

const PolandLocation = {
  lat: 51.9194,
  lng: 19.1451,
};

type MapOptions = {
  center: LatLngLiteral;
  zoom: number;
  mapId: string;
};

function EmployeeMap(employees: Employee[]) {
  const mapId = import.meta.env.VITE_MAP_ID;

  const mapOptions: MapOptions = {
    center: PolandLocation,
    zoom: 6,
    mapId: mapId,
  };

  return <GoogleMapComponent mapOptions={mapOptions} employees={employees} />;
}

export default EmployeeMap;
