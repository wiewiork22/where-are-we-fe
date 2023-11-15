import { Employee } from '../../../../models/Employee.ts';
import { Cluster, MarkerClusterer } from '@googlemaps/markerclusterer';
import EmployeeMarkerContent from './EmployeeMarkerContent.tsx';
import Marker from './Marker.tsx';
import EmployeeListPopup from './EmployeeListPopup.tsx';
import { useRef } from 'react';
import ReactDOM, { createRoot } from 'react-dom/client';

type Props = {
  map: google.maps.Map;
  employees: Employee[];
};

function EmployeeMarkers({ map, employees }: Props) {
  const markerToEmployeeMap = new Map<google.maps.marker.AdvancedMarkerElement, Employee>();
  const lastEmployeeListPopupInfoWindow = useRef<google.maps.InfoWindow>();

  const onClusterClick = (event: google.maps.MapMouseEvent, cluster: Cluster, map: google.maps.Map) => {
    const markers = cluster.markers ?? [];

    const employees: Employee[] = markers
      .map((marker) => markerToEmployeeMap.get(marker as google.maps.marker.AdvancedMarkerElement))
      .filter((employee): employee is Employee => employee !== undefined);

    const container = document.createElement('div');
    createRoot(container);

    ReactDOM.hydrateRoot(container, EmployeeListPopup(employees));

    const infoWindow = new window.google.maps.InfoWindow({ content: container });

    infoWindow.setPosition(event.latLng);

    lastEmployeeListPopupInfoWindow.current?.close();

    lastEmployeeListPopupInfoWindow.current = infoWindow;

    infoWindow.open({ map: map });
  };

  const cluster = useRef(
    new MarkerClusterer({
      map: map,
      markers: [],
      onClusterClick: onClusterClick,
    })
  );

  return (
    <>
      {employees.map((employee) => (
        <Marker
          id={employee.id}
          key={employee.id}
          map={map}
          markerTitle={employee.fullName}
          position={{ lat: employee.address.lat, lng: employee.address.lng }}
          onMarkerCreated={(marker) => {
            markerToEmployeeMap.set(marker, employee);
            cluster.current.addMarker(marker);
          }}
        >
          {EmployeeMarkerContent(employee)}
        </Marker>
      ))}
    </>
  );
}

export default EmployeeMarkers;
