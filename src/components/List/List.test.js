import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { TablePaginationActions } from './List';

afterEach(cleanup);
describe('<TablePaginationActions />', () => {
  it('should render disable icons', () => {
    const { getByLabelText } = render(
      <TablePaginationActions page={0} count={2} rowsPerPage={10} />
    );

    const firstPage = getByLabelText('Primeira página');
    const lastPage = getByLabelText('Última página');

    expect(firstPage.disabled).toBe(true);
    expect(lastPage.disabled).toBe(true);
  });

  it('should call onChange on page change', () => {
    const onChange = jest.fn();
    const { getByLabelText } = render(
      <TablePaginationActions page={0} count={30} rowsPerPage={10} onChangePage={onChange} />
    );
    const nextPage = getByLabelText('Pŕoxima página');
    expect(nextPage.disabled).toBe(false);
    fireEvent.click(nextPage);
    expect(onChange).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
