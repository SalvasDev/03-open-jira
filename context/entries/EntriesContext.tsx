import { Entry } from '@/interfaces';
import { createContext } from 'react';


interface ContextProps {
  entries: Entry[];
  /// Methods
  addNewEntry: (description: string) => void
  deleteEntry: (_id: string, showSnackbar?: boolean) => void
  refreshEntries: () => void
  updateEntry: (entry: Entry, showSnackbar?: boolean) => void

}


export const EntriesContext = createContext({} as ContextProps);