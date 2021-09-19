import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from '@testing-library/react';
import Table from '../../../container/common/table';
import { UserContext } from '../../../container/context/UserContext';
import {
  users,
  tableHeaders,
} from '../../mockData/tableData';

afterEach(cleanup);

const renderTable = (data) => {
  const setFiltered = jest.fn();

  return render(
    <UserContext.Provider
      value={{
        userData: data,
        filteredData: data,
        setFiltered,
      }}
    >
      <Table tableHeaders={tableHeaders} />
    </UserContext.Provider>
  );
};

describe('<Table />', () => {
  it('should renders empty table', () => {
    const data = [];
    const { queryByTestId, getByText } = renderTable(data);
    expect(getByText('No data found')).toBeTruthy();
    // checking the columns name
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Email')).toBeTruthy();
    expect(getByText('Role')).toBeTruthy();
    expect(getByText('Actions')).toBeTruthy();
  });

  it('should renders table with data', async () => {
    const { getByText } = renderTable(users);
    expect(() =>
      getByText('No data found for this search')
    ).toThrowError();
    expect(getByText('Sachin')).toBeTruthy();
    expect(getByText('admin')).toBeTruthy();
    expect(getByText('test@abc.in')).toBeTruthy();

    // checking the columns name
  });

  it('should edit a user', async () => {
    const { getByText, queryByTestId, queryAllByTestId } =
      renderTable(users);
    expect(() => getByText('No data found')).toThrowError();
    expect(getByText('Sachin')).toBeTruthy();
    expect(getByText('admin')).toBeTruthy();
    expect(getByText('test@abc.in')).toBeTruthy();
    const edit = queryAllByTestId('edit-user')[0];
    fireEvent.click(edit);
    expect(getByText('Edit this User')).toBeTruthy();
    const name = queryByTestId('name-input');
    expect(name.value).toBe('Sachin');
    fireEvent.change(name, { target: { value: 'Thakur' } });
    expect(name.value).toBe('Thakur');
    const email = queryByTestId('email-input');
    fireEvent.change(email, {
      target: { value: 'thakur@abc.in' },
    });
    const role = queryByTestId('role-input');
    fireEvent.change(role, {
      target: { value: 'member' },
    });
    fireEvent.click(queryByTestId('confirm-button'));
  });

  it('should close the edit modal', async () => {
    const { getByText, queryByTestId, queryAllByTestId } =
      renderTable(users);
    expect(() => getByText('No data found')).toThrowError();
    const edit = queryAllByTestId('edit-user')[0];
    fireEvent.click(edit);
    expect(getByText('Edit this User')).toBeTruthy();
    fireEvent.click(queryByTestId('cancel-button'));
    expect(() =>
      getByText('Edit this User')
    ).toThrowError();
  });

  it('should delete the user', async () => {
    const { getByText, queryByTestId, queryAllByTestId } =
      renderTable(users);
    expect(() => getByText('No data found')).toThrowError();
    const deleteBtn = queryAllByTestId('delete-user')[0];
    fireEvent.click(deleteBtn);
    expect(getByText('Delete User')).toBeTruthy();
    expect(
      getByText(
        'Are you sure you want to delete this user ?'
      )
    ).toBeTruthy();
    fireEvent.click(queryByTestId('confirm-button'));
    expect(() => getByText('Delete User')).toThrowError();
  });

  it('should close the modal', async () => {
    const { getByText, queryByTestId, queryAllByTestId } =
      renderTable(users);
    expect(() => getByText('No data found')).toThrowError();
    const deleteBtn = queryAllByTestId('delete-user')[0];
    fireEvent.click(deleteBtn);
    expect(getByText('Delete User')).toBeTruthy();
    fireEvent.click(queryByTestId('cancel-button'));
    expect(() => getByText('Delete User')).toThrowError();
  });

  it('should select and deselect same user', async () => {
    const { getByText, queryByTestId, queryAllByTestId } =
      renderTable(users);
    expect(() => getByText('No data found')).toThrowError();
    expect(queryByTestId('delete-selected')).toBeTruthy();
    const checkbox = queryAllByTestId('checkbox')[0];
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(false);
  });

  it('should select multiple users to delete', async () => {
    const { getByText, queryByTestId, queryAllByTestId } =
      renderTable(users);
    expect(() => getByText('No data found')).toThrowError();
    expect(queryByTestId('delete-selected')).toBeTruthy();
    const checkbox = queryAllByTestId('checkbox')[0];
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
    fireEvent.click(queryByTestId('delete-selected'));
  });
});
