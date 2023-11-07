import { Button } from '@mui/material';
import { useState } from 'react';
import ModalEditEmployee from '../../../../components/EditEmployee/ModalEditEmployee';
import { useEditEmployee } from '../../../../utils/api';
import { Employee } from '../../../../models/Employee';
import CustomSnackbar from '../../../../components/snackbars/CustomSnackbar';

const EditButtonStyle = {
  borderRadius: '50px',
  color: 'text.primary',
  float: 'left',
  margin: '5px 10px 0 0',
  textTransform: 'none',
  '&:hover': {
    backgroundColor: 'background.paper',
  },
};

function EditEmployee({ employee }: { employee: Employee }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { mutate: mutateEditEmployee, isSuccess } = useEditEmployee();
  const [showSnackbar, setShowSnackbar] = useState(false);

  return (
    <>
      <Button variant="outlined" size="small" sx={EditButtonStyle} onClick={() => setIsEditModalOpen(true)}>
        Edit
      </Button>
      <ModalEditEmployee
        modalIsOpen={isEditModalOpen}
        setModalIsOpen={setIsEditModalOpen}
        mutate={mutateEditEmployee}
        showSnackbar={() => setShowSnackbar(true)}
        employee={employee}
      />
      <CustomSnackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        status={isSuccess ? 'success' : 'error'}
        message={isSuccess ? 'Employee details updated' : 'Error updating employee details'}
      />
    </>
  );
}

export default EditEmployee;
