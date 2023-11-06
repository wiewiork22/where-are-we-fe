import { useState } from 'react';
import ModalAddEmployee from '../../../../components/AddEmployee/ModalAddEmployee.tsx';
import CustomSnackbar from '../../../../components/snackbars/CustomSnackbar.tsx';
import { useAddNewEmployee } from '../../../../utils/api.ts';

type AddEmployeeProps = {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
};

function AddEmployee(props: AddEmployeeProps) {
  const [showSnackbar, setShowSnackbar] = useState(false);

  const { mutate: mutateAddEmployee, isSuccess } = useAddNewEmployee();

  return (
    <div>
      <ModalAddEmployee
        modalIsOpen={props.isModalOpen}
        setModalIsOpen={props.setIsModalOpen}
        mutate={mutateAddEmployee}
        showSnackbar={() => setShowSnackbar(true)}
      />
      <CustomSnackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        status={isSuccess ? 'success' : 'error'}
        message={isSuccess ? 'Employee added' : 'Error adding employee'}
      />
    </div>
  );
}

export default AddEmployee;
