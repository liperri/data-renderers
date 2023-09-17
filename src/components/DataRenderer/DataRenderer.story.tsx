// DataRenderer.story.tsx

import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { Avatar, Box, Button, CircularProgress, Paper, Skeleton, Stack, Typography } from '@mui/material';

import { getRandomNumber } from '../../utils/helpers';

import { DataRenderer } from '.';

type User = {
  name: string;
  surname: string;
  address: string;
  job: string;
  position: string;
  birthdate: Date;
  photo: string;
};

const USER: User = {
  name: faker.person.firstName(),
  surname: faker.person.lastName(),
  address: faker.location.streetAddress(),
  job: faker.company.name(),
  position: faker.person.jobTitle(),
  birthdate: faker.date.past({ refDate: new Date(), years: 1990 }),
  photo: faker.image.avatar(),
};

const Template = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setUser(USER);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <DataRenderer
      element={<Paper sx={{ p: 2.5, maxWidth: 475 }} />}
      data={user}
      isLoading={isLoading}
      isFetching={false}
      isError={false}
      error={{ data: 'Неизвестная ошибка' }}
      renderData={{
        item: (user) => (
          <>
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
          </>
        ),
        skeleton: (
          <>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton width={getRandomNumber(120, 230)} variant="rounded" />
            </Stack>

            <Skeleton width={getRandomNumber(120, 230)} height={26} />
            <Skeleton width={getRandomNumber(320, 430)} height={26} />
          </>
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
  component: Template,
} satisfies Meta<typeof Template>;

export default meta;
type Story = Omit<StoryObj<typeof meta>, 'args'>;

export const Default: Story = {};
