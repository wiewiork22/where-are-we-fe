import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import { Employee } from '../../../../models/Employee.ts';
import EmployeeMarkers from './EmployeeMarkers.tsx';
import MapOptions = google.maps.MapOptions;

type Props = {
  mapOptions: MapOptions;
  employees: Employee[];
};

function GoogleMapComponent({ mapOptions, employees }: Props) {
  const [map, setMap] = useState<google.maps.Map>();
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (ref.current) {
      setMap(new window.google.maps.Map(ref.current, mapOptions));
    }
  }, []);

  return (
    <Box style={{ width: '100%', height: '500px' }} ref={ref} id="map">
      {map && <EmployeeMarkers map={map} employees={employees} />}
    </Box>
  );
}

export default GoogleMapComponent;
