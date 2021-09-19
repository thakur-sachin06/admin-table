import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import Header from '../../../container/common/header';
import { UserContext } from '../../../container/context/UserContext';
import { users } from '../../mockData/tableData';

beforeEach(cleanup);

const renderHeader = () => {
  const setSearchText = jest.fn();
  const debounceSearch = jest.fn();
  const setFiltered = jest.fn();

  return render(
    <UserContext.Provider
      value={{
        userData: users,
        filteredData: users,
        setFiltered,
      }}
    >
      <Header
        setSearchText={setSearchText}
        debounceSearch={debounceSearch}
      />
    </UserContext.Provider>
  );
};

jest.setTimeout(30000);

describe('<Header />', () => {
  it('should renders header and search input', () => {
    const { queryByTestId, getByText } = renderHeader();
    expect(getByText('Admin Page')).toBeTruthy();
    expect(queryByTestId('search-input')).toBeTruthy();
  });

  it('should call the search', async () => {
    const { queryByTestId } = renderHeader();
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
  });
});
