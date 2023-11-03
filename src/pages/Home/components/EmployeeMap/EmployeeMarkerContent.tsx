import Paper from '@mui/material/Paper';
import { Employee } from '../../../../models/Employee.ts';
import { Typography } from '@mui/material';

const avatarStyle = {
  margin: '20px',
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '50%',
  fontWeight: 'bold',
};

const colorPairs = [
  { backgroundColor: '#333333', textColor: '#FFFFFF' },
  { backgroundColor: '#2C3E50', textColor: '#FFFFFF' },
  { backgroundColor: '#34495E', textColor: '#FFFFFF' },
  { backgroundColor: '#333333', textColor: '#FF5733' },
  { backgroundColor: '#2C3E50', textColor: '#FF5733' },
  { backgroundColor: '#34495E', textColor: '#FF5733' },
  { backgroundColor: '#333333', textColor: '#45B39D' },
  { backgroundColor: '#2C3E50', textColor: '#45B39D' },
  { backgroundColor: '#34495E', textColor: '#45B39D' },
  { backgroundColor: '#333333', textColor: '#007acc' },
];

function EmployeeMarkerContent(employee: Employee) {
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
