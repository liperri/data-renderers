import { PropsWithChildren, createContext, useContext, useState } from 'react';

interface TableRendererSelectedRow<TData> {
  row: TData;
  index: number;
}

export interface TableRendererContextProps<TData> {
  selectedRows: TableRendererSelectedRow<TData>[];
  handleSelectRow(event: React.ChangeEvent<HTMLInputElement>, checked: boolean, row: TData, index: number): void;
  handleSelectAllRows(data: TData[], checked: boolean): void;
}

export const TableRendererContext = createContext<TableRendererContextProps<any>>({
  selectedRows: [],
  handleSelectRow() {
    return;
  },
  handleSelectAllRows() {
    return;
  },
});

const TableRendererProvider = <TData,>({ children }: PropsWithChildren) => {
  const [selectedRows, setSelectedRows] = useState<TableRendererSelectedRow<TData>[]>([]);

  function handleSelectRow(event: React.ChangeEvent<HTMLInputElement>, checked: boolean, row: TData, index: number) {
    event.stopPropagation();

    setSelectedRows((prevSelectedRows) =>
      checked
        ? [...prevSelectedRows, { row, index }]
        : prevSelectedRows.filter((selectedRow) => selectedRow.index !== index),
    );
  }

  function handleSelectAllRows(data: TData[] = [], checked: boolean) {
    setSelectedRows(checked ? data.map((row, index) => ({ row, index })) : []);
  }

  return (
    <TableRendererContext.Provider value={{ selectedRows, handleSelectRow, handleSelectAllRows }}>
      {children}
    </TableRendererContext.Provider>
  );
};

export const useTableRenderer = <TData,>() => {
  const context = useContext(TableRendererContext);

  if (!context) throw new Error('useTableRendererContext должен использоваться внутри TableRendererProvider');

  return context as TableRendererContextProps<TData>;
};

TableRendererProvider.displayName = 'TableRendererProvider';

export default TableRendererProvider;
