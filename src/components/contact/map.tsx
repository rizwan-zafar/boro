import Map from '@components/ui/map';

const ContactMap = () => {
  return (
    <Map
      lat={1.295831}
      lng={103.76261}
      height={'420px'}
      zoom={15}
      showInfoWindow={true}
    />
  );
};

export default ContactMap;
