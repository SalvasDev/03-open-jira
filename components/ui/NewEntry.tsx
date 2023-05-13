import { ChangeEvent, useContext, useState } from 'react';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui/UIContext';
import { Box, Button, TextField } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/AddCircleOutline';

export const NewEntry = () => {

  const {addNewEntry } = useContext(EntriesContext) 
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext)

  const [ inputValue, setInputValue ] = useState('');
  const [ touched, setTouched ] = useState(false);


  const OnTextFieldChanges = ( event: ChangeEvent<HTMLInputElement> ) => {
   setInputValue( event.target.value ); 
  }

  const onSave = () => {
    if ( inputValue.length === 0 ) return;
    addNewEntry(inputValue);   
    setIsAddingEntry(false);
    setTouched(false);
    setInputValue('');
  }

  return (
    <Box sx={{ mb: 2, paddingX: 2 }}>
      {
        isAddingEntry ? (
          <>
            <TextField 
              fullWidth
              sx={{ mt: 2, mb: 1 }}
              placeholder='Nueva entrada'
              autoFocus
              multiline
              label='Nueva entrada'
              helperText= { inputValue.length <= 0 && touched && 'Ingrese un valor' }
              error={ inputValue.length <= 0 && touched }              
              value= { inputValue }
              onChange={ OnTextFieldChanges }
              onBlur={ () => setTouched(true) }
            />
            <Box sx={{display: 'flex', justifyContent:'space-between'}}>
                <Button
                  variant='text'
                  onClick={ () => setIsAddingEntry( false )  }
                >
                  Cancelar
                </Button>
                <Button
                  variant='outlined'
                  color= 'secondary'
                  endIcon={<SaveIcon/>}
                  onClick={ onSave }
                >
                  Guardar
                </Button>
            </Box>

          </>
        )
        
        :(
          <Button
              startIcon={ <AddIcon /> }
              fullWidth
              variant= 'outlined'
              onClick={ () => setIsAddingEntry( true )  }
            >
              Agregar tarea
            </Button>  
        )    
      }
    </Box>
  )
}
