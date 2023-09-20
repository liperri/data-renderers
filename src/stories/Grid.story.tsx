// Grid.story.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid as MuiGrid,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';

import { getRandomNumberFromRange } from '../utils/helpers';

import { ListRenderer } from '../components';

type User = {
  id: number;
  name: string;
  surname: string;
  address: string;
  job: string;
  position: string;
  birthdate: Date;
  photo: string;
};

const USERS: User[] = Array.from({ length: 50 }, (_, index) => ({
  id: index + 1,
  name: faker.person.firstName(),
  surname: faker.person.lastName(),
  address: faker.location.streetAddress(),
  job: faker.company.name(),
  position: faker.person.jobTitle(),
  birthdate: faker.date.past({ refDate: new Date(), years: 1990 }),
  photo: faker.image.avatar(),
}));

const Grid = () => {
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
    <ListRenderer
      element={<MuiGrid container spacing={3} />}
      data={currentUsers}
      isLoading={isLoading}
      isFetching={isFetching}
      isError={false}
      error={{ data: 'Неизвестная ошибка' }}
      render={{
        item: (user) => (
          <MuiGrid item lg={4} md={6} xs={12} key={user.id}>
            <Paper sx={{ p: 2.5, flexDirection: 'column', alignItems: 'stretch' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                <Avatar src={user.photo}>{user.name}</Avatar>

                <Typography component="h2" variant="h4">
                  {user.name} {user.surname}
                </Typography>
              </Stack>

              <Typography color="text.secondary">
                <b>{user.address}</b>
              </Typography>

              <Typography>
                {user.job} {user.position}
              </Typography>
            </Paper>
          </MuiGrid>
        ),
        skeleton: (index: number) => (
          <MuiGrid item lg={4} md={6} xs={12} key={index}>
            <Paper sx={{ p: 2.5, flexDirection: 'column', alignItems: 'stretch' }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton width={getRandomNumberFromRange(120, 230)} variant="rounded" />
              </Stack>

              <Skeleton width={getRandomNumberFromRange(120, 230)} height={26} />
              <Skeleton width={getRandomNumberFromRange(320, 430)} height={26} />
            </Paper>
          </MuiGrid>
        ),
      }}
      renderFooter={{
        footer: ({ isEmpty, isFetching }) =>
          !isEmpty && (
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
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" component="h3">
              Данных нет...
            </Typography>

            <Button>Refetch</Button>
          </Box>
        ),
        error: (message) => (
          <Box>
            <Typography variant="h6" component="h3">
              Произошла ошибка :( <br /> <Typography color="text.secondary">(Сообщение: {message})</Typography>
            </Typography>

            <Button>Refetch</Button>
          </Box>
        ),
        loader: <CircularProgress />,
      }}
    />
  );
};

const meta = {
  component: Grid,
} satisfies Meta<typeof Grid>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, 'args'>;

export const Default: Story = {};
