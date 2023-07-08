// Define a type for the slice state
export interface KeepNote {
    id: string ;
    title: string;
    note: string;
  }
  
  export interface InitialState {
    notes: KeepNote[];
    loading: boolean;
    error: string | null | undefined;
  }

