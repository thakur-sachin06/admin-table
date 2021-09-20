import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import Pagination from '../../../container/common/pagination';
import { UserContext } from '../../../container/context/UserContext';
import { users } from '../../mockData/tableData';

beforeEach(cleanup);

const renderPagination = () => {
  const setFiltered = jest.fn();
  const filterData = jest.fn();

  return render(
    <UserContext.Provider
      value={{
        userData: users,
        filteredData: users,
        setFiltered,
      }}
    >
      <Pagination
        filteredData={users}
        userData={users}
        filterData={filterData}
      />
    </UserContext.Provider>
  );
};

jest.setTimeout(30000);

describe('<Header />', () => {
  it('should renders header and search input', () => {
    const { getByText } = renderPagination();
    expect(getByText('1')).toBeTruthy();
  });

  it('should go to next page', () => {
    const { queryByTestId, container } = renderPagination();
    const buttons = container.querySelectorAll('button');
    expect(buttons[0]).toHaveClass('active');
    fireEvent.click(queryByTestId('navigate-next'));
    expect(buttons[1]).toHaveClass('active');
  });

  it('should go to prev page', () => {
    const { queryByTestId, container } = renderPagination();
    const buttons = container.querySelectorAll('button');
    expect(buttons[0]).toHaveClass('active');
    fireEvent.click(buttons[3]);
    expect(buttons[3]).toHaveClass('active');
    fireEvent.click(queryByTestId('navigate-prev'));
    expect(buttons[2]).toHaveClass('active');
  });

  it('should got to last page', () => {
    const { container } = renderPagination();
    const buttons = container.querySelectorAll('button');
    expect(buttons[0]).toHaveClass('active');
    fireEvent.click(buttons[4]);
    expect(buttons[4]).toHaveClass('active');
    fireEvent.click(buttons[0]);
  });
});
