import React, { useEffect, useContext, useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import { 
  StoreContext,
  START_RESULTUSERS, 
  SUCCESS_RESULTUSERS,
  ERROR_RESULTUSERS 
} from '../../store';
import List from '../../components/List/List';
import Loading from '../../components/Loading/Loading';
import { apiUrl } from '../../config';

const Home = ({ location, history }) => {
  const { state: { data, loading }, dispatch } = useContext(StoreContext);
  const [page, changePage] = useState(0);
  const [rowsPerPage, changeRowsPerPage] = useState(10);

  const fetchData = async () => {
    dispatch({ type: START_RESULTUSERS, query: location.search });
    const response = await fetch(`${apiUrl}/users`);
    
    if (response) {
      const { users: data } = await response.json();
      dispatch({ type: SUCCESS_RESULTUSERS, data });
    } else {
      dispatch({ type: ERROR_RESULTUSERS, error: 'Erro de servidor' });
    }
  }

  const handleChangePage = (event, page) => {
    changePage(page);
  };

  const handleChangeRowsPerPage = event => {
    changeRowsPerPage(event.target.value);
    changePage(0)
  };

  const renderContent = () => {
    if (loading) {
      return <Loading />
    } else if (data && data.length > 0) {
      return (
        <List
          count={data.length}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          page={page}
          rowsPerPage={rowsPerPage}
          renderHead={(
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Cargo</TableCell>
                <TableCell align="right">E-mail</TableCell>
              </TableRow>
            </TableHead>
          )}
        >
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
            <TableRow key={row.id} onClick={() => history.push(`/user/${row.id}`)}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.job_title}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </TableRow>
          ))}
        </List>
      )
    }
    return null;
  }

  useEffect(() => {
    fetchData();
  }, [location.search]);

  return renderContent()
}


export default Home;