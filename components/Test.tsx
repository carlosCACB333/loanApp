import React from 'react';
import {DataTable} from 'react-native-paper';

const numberOfItemsPerPageList = [2, 3, 4];

const items = [
  {
    key: 1,
    name: 'Page 1',
  },
  {
    key: 2,
    name: 'Page 2',
  },
  {
    key: 3,
    name: 'Page 3',
  },
  {
    key: 4,
    name: 'Page 4',
  },
  {
    key: 5,
    name: 'Page 5',
  },
  {
    key: 6,
    name: 'Page 6',
  },
  {
    key: 7,
    name: 'Page 7',
  },
  {
    key: 8,
    name: 'Page 8',
  },
];

export const Test = () => {
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [numberOfItemsPerPage]);

  const showItems = items.slice(from, to);
  return (
    <DataTable
      style={{
        width: 300,
      }}>
      <DataTable.Header>
        <DataTable.Title>Dessert</DataTable.Title>
        <DataTable.Title numeric>Calories</DataTable.Title>
        <DataTable.Title numeric>Fat</DataTable.Title>
      </DataTable.Header>

      {showItems.map(item => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell numeric>159</DataTable.Cell>
          <DataTable.Cell numeric>6.0</DataTable.Cell>
        </DataTable.Row>
      ))}

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
        onPageChange={page => setPage(page)}
        label={`${from + 1}-${to} de ${items.length}`}
        showFastPaginationControls
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={numberOfItemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        selectPageDropdownLabel={'Filas por página'}
      />
    </DataTable>
  );
};
