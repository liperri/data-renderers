import { PropsWithChildren, createContext, useState } from 'react';

interface TableRendererSelectedRow<TData> {
  rowData: TData;
  index: number;
}

export interface TableRendererContextProps<TData> {
  selectedRows: TableRendererSelectedRow<TData>[];
  handleSelectRow(event: React.ChangeEvent<HTMLInputElement>, checked: boolean, rowData: TData, index: number): void;
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

  function handleSelectRow(
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    rowData: TData,
    index: number,
  ) {
    event.stopPropagation();

    setSelectedRows((prevSelectedRows) =>
      checked
        ? [...prevSelectedRows, { rowData, index }]
        : prevSelectedRows.filter((selectedRow) => selectedRow.index !== index),
    );
  }

  function handleSelectAllRows(data: TData[] = [], checked: boolean) {
    setSelectedRows(checked ? data.map((rowData, index) => ({ rowData, index })) : []);
  }

  return (
    <TableRendererContext.Provider value={{ selectedRows, handleSelectRow, handleSelectAllRows }}>
      {children}
    </TableRendererContext.Provider>
  );
};

TableRendererProvider.displayName = 'TableRendererProvider';

export default TableRendererProvider;
