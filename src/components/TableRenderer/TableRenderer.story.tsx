// TableRenderer.story.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { Box, CircularProgress, Pagination, TableCell, TableRow, Typography } from '@mui/material';

import { TableRenderer, TableRendererProps, TableRendererRowProps } from '.';

type User = {
  id: number;
  name: string;
  surname: string;
  address: string;
  job: string;
  position: string;
  birthdate: Date;
};

const USERS: User[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: faker.person.firstName(),
  surname: faker.person.lastName(),
  address: faker.location.streetAddress(),
  job: faker.company.name(),
  position: faker.person.jobTitle(),
  birthdate: faker.date.past({ refDate: new Date(), years: 1990 }),
}));

const Template = (props: TableRendererProps<User>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(USERS.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = USERS.slice(startIndex, endIndex);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setIsFetching(true);

    setTimeout(() => {
      setCurrentPage(page);
      setIsFetching(false);
    }, 2000);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <TableRenderer
      {...props}
      StackProps={{ spacing: 4 }}
      columns={['ID', 'Имя', 'Фамилия', 'Адрес', 'Место работы', 'Должность', 'Дата рождения']}
      data={currentUsers}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={false}
      error={{ data: 'Неизвестная ошибка' }}
      renderRow={({ index, rowData: user }: TableRendererRowProps<User>) => {
        const { address, birthdate, job, name, position, surname, id } = user;

        return (
          <TableRow key={index}>
            <TableCell>{id}</TableCell>
            <TableCell>{name}</TableCell>
            <TableCell>{surname}</TableCell>
            <TableCell>{address}</TableCell>
            <TableCell>{job}</TableCell>
            <TableCell>{position}</TableCell>
            <TableCell>{new Date(birthdate).toLocaleDateString()}</TableCell>
          </TableRow>
        );
      }}
      renderFooter={{
        footer: ({ isFetching }) => (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Pagination
              page={currentPage}
              count={totalPages}
              boundaryCount={2}
              color="primary"
              shape="rounded"
              onChange={handlePageChange}
              disabled={isFetching}
            />
          </Box>
        ),
      }}
      renderOverlay={{
        empty: (
          <Typography variant="h6" component="h3">
            Данных нет...
          </Typography>
        ),
        error: (message) => (
          <Typography variant="h6" component="h3">
            Произошла ошибка :( <br /> <Typography color="text.secondary">(Сообщение: {message})</Typography>
          </Typography>
        ),
        loader: <CircularProgress />,
      }}
    />
  );
};

const meta = {
  component: Template,
} satisfies Meta<typeof Template>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, 'args'>;

export const Default: Story = {};
