import Typography from '@mui/material/Typography';

function PageNotFound() {
  return (
    <>
      <Typography variant="h2" color="#2A514B" style={{ paddingBottom: '40px' }}>
        Sorry, this page is not found
      </Typography>

      <Typography paragraph style={{ paddingBottom: '50px' }}>
        We can add a funny photo later or just redirect it to "/Home"
      </Typography>
    </>
  );
}
export default PageNotFound;
