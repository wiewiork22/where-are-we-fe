import Paper from '@mui/material/Paper';
import { Employee } from '../../../../models/Employee.ts';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const avatarStyle = {
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  fontWeight: 'bold',
};

function EmployeeMarkerContent(employee: Employee) {
  const theme = useTheme();

  const primaryColor = theme.palette.primary.main;
  const secondaryColor = theme.palette.secondary.main;

  const colorPairs = [
    { backgroundColor: '#432d45', textColor: primaryColor },
    { backgroundColor: '#432d45', textColor: secondaryColor },
    { backgroundColor: '#310135', textColor: primaryColor },
    { backgroundColor: '#310135', textColor: secondaryColor },
    { backgroundColor: '#3d1f40', textColor: secondaryColor },
    { backgroundColor: '#3d1f40', textColor: primaryColor },
    { backgroundColor: '#330537', textColor: secondaryColor },
    { backgroundColor: '#330537', textColor: primaryColor },
    { backgroundColor: '#29152a', textColor: secondaryColor },
    { backgroundColor: '#29152a', textColor: primaryColor },
    { backgroundColor: '#522656', textColor: secondaryColor },
    { backgroundColor: '#522656', textColor: primaryColor },
    { backgroundColor: '#4c1750', textColor: secondaryColor },
    { backgroundColor: '#4c1750', textColor: primaryColor },
  ];

  const firstLettersOfFullName = employee.fullName
    .split(' ')
    .map((name) => name[0])
    .join('');

  const colorPair = colorPairs[Math.floor(Math.random() * colorPairs.length)];

  return (
    <Paper sx={avatarStyle} style={{ backgroundColor: colorPair.backgroundColor }} elevation={3}>
      <Typography sx={{ fontSize: '50', color: colorPair.textColor }}>{firstLettersOfFullName}</Typography>
    </Paper>
  );
}

export default EmployeeMarkerContent;
