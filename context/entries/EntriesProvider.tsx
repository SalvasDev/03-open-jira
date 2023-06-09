import { FC, useEffect, useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import { useSnackbar } from 'notistack';

import { Entry } from '../../interfaces/entry';
import entriesApi from '../../apis/entriesApi';

export interface EntriesState {
  entries: Entry[];
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}

interface Props {
  children: React.ReactNode
}


export const EntriesProvider: FC<Props> = ({ children }) => {


  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
  const { enqueueSnackbar } = useSnackbar();

  const addNewEntry = async (description: string) => {

    const { data } = await entriesApi.post<Entry>('/entries', { description })
    dispatch({ type: '[Entry] Add-Entry', payload: data });
  }

  const updateEntry = async ({ _id, description, status }: Entry, showSnackbar = false) => {

    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
      dispatch({ type: '[Entry] Entry-Updated', payload: data });


      if (showSnackbar) {
        enqueueSnackbar('Entrada actualizada', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right'
          }
        })
      }

    } catch (error) {
      console.log({ error });

    }
  }



  const deleteEntry = async (_id: string, showSnackbar = false) => {

    const { data } = await entriesApi.delete<Entry>(`/entries/${_id}`);
    dispatch({ type: '[Entry] Delete-Entry', payload: [data] });

    if (showSnackbar) {
      enqueueSnackbar('Entrada eliminada', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        }
      })
    }

  }



  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries');
    dispatch({ type: '[Entry] Refresh-Data', payload: data });
  }

  useEffect(() => {
    refreshEntries();
  }, []);

  return (
    <EntriesContext.Provider value={{
      ...state,
      /// Methods
      addNewEntry,
      deleteEntry,
      refreshEntries,
      updateEntry,

    }}>
      {children}
    </EntriesContext.Provider>
  )
};  