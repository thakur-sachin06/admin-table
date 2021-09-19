import { render, fireEvent } from '@testing-library/react';
import { UserContext } from '../../container/context/UserContext';
import Users from '../../container/users';
import { users } from '../mockData/tableData';

const renderHomepage = () => {
  const updateUserData = jest.fn();
  const setFiltered = jest.fn();

  return render(
    <UserContext.Provider
      value={{
        userData: users,
        filteredData: users,
        setFiltered,
        updateUserData,
      }}
    >
      <Users />
    </UserContext.Provider>
  );
};

jest.setTimeout(30000);

describe('<Header />', () => {
  it('should renders header and search input', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => users,
      })
    );
    const { queryByTestId, getByText } = renderHomepage();
    expect(getByText('Admin Page')).toBeTruthy();
    const searchInput = queryByTestId('search-input');
    fireEvent.change(searchInput, {
      target: {
        value: 'Sachin',
      },
    });
    await new Promise((r) => setTimeout(r, 1000));
    fireEvent.change(searchInput, {
      target: {
        value: '',
      },
    });
    await new Promise((r) => setTimeout(r, 1000));
    fireEvent.change(searchInput, {
      target: {
        value: 'test',
      },
    });
    await new Promise((r) => setTimeout(r, 1000));
    fireEvent.change(searchInput, {
      target: {
        value: '',
      },
    });
    await new Promise((r) => setTimeout(r, 1000));
  });

  it('will reject the api request', () => {
    global.fetch = jest.fn(() =>
      Promise.reject({
        json: () => 'error',
      })
    );
    renderHomepage();
  });
});
