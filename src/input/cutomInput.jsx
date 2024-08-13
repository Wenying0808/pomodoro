import { InputBase, styled } from "@mui/material";

const CustomInput = styled(InputBase)(({ theme }) => ({
    borderBottom: '1px solid transparent',
    outline: 'none',
    backgroundColor: 'transparent',
  
    '&:hover': {
        borderBottom: '1px solid #BBBCBE',
    },
  
    '&.Mui-focused': {
        borderBottom: '1px solid #4758DC',
        outline: 'none',
    },

  }));

  export default CustomInput;
