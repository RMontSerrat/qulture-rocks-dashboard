import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const StyledTablePagination = styled.div`
  display: flex;
`
export const TablePaginationActions = ({
  onChangePage,
  page,
  count,
  rowsPerPage,
}) => {
  const handleFirstPageButtonClick = event => {
    onChangePage(0);
  };

  const handleBackButtonClick = event => {
    onChangePage(page - 1);
  };

  const handleNextButtonClick = event => {
    onChangePage(page + 1);
  };

  const handleLastPageButtonClick = event => {
    onChangePage(
      Math.max(0, Math.ceil(count / rowsPerPage) - 1),
    );
  };

  return (
    <StyledTablePagination>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="Primeira página"
      >
        {<FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Última página"
      >
        {<KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Pŕoxima página"
      >
        {<KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Última página"
      >
        {<LastPageIcon />}
      </IconButton>
    </StyledTablePagination>
  );
}

TablePaginationActions.propTypes = {
  onChangePage: PropTypes.func,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  count: PropTypes.number,
}

const StyledPaper = styled(Paper)`
  width: 100%;
  margin: 20px 0;
`

const List = ({
  rowsPerPage,
  page,
  count,
  renderHead,
  children,
  onChangePage,
  onChangeRowsPerPage,
}) => {
  return (
    <StyledPaper>
      <div>
        <Table>
          {renderHead}
          <TableBody>
            {children}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                colSpan={3}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={onChangePage}
                onChangeRowsPerPage={onChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
                labelRowsPerPage={<span>Linhas por página</span>}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </StyledPaper>
  );
}

List.propTypes = {
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  count: PropTypes.number,
  renderHead: PropTypes.node,
  children: PropTypes.node,
  onChangePage: PropTypes.func,
  onChangeRowsPerPage: PropTypes.func,
}

export default List;
