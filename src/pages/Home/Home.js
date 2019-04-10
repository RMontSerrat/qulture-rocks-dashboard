import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import { 
  START_RESULTS,
  SUCCESS_RESULTS,
  ERROR_RESULTS,
  HomeContext,
} from '../../store/modules';
import services from '../../store/services';
import List from '../../components/List/List';
import Loading from '../../components/Loading/Loading';
import Container from '../../components/Container/Container';
import Header from '../../components/Header/Header';

const StyledTableRow = styled(TableRow)`
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.07);
  }
`

const ResultContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const Home = ({ location, history }) => {
  const { state: { data, loading }, dispatch } = useContext(HomeContext);
  const [page, changePage] = useState(0);
  const [rowsPerPage, changeRowsPerPage] = useState(10);

  const getResults = async () => {
    try {
      dispatch({ type: START_RESULTS });
      const { data } = await services.getResults();
      dispatch({ type: SUCCESS_RESULTS, data });
      return { data };
    } catch {
      dispatch({ type: ERROR_RESULTS, error: true });
      return { data: null, error: true }
    }
  }
  
  const fetchData = () => {
    getResults();
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
            <StyledTableRow key={row.id} onClick={() => history.push(`/user/${row.id}`)}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.job_title}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
            </StyledTableRow>
          ))}
        </List>
      )
    }
    return null;
  }

  useEffect(() => {
    fetchData();
  }, [location.search]);

  return (
    <Container>
      <Header
      title="Usuários cadastrados"
      renderActions={(
        <Button variant="contained" type="submit" color="primary" onClick={() => history.push('/create')}>
          Criar
        </Button>
      )} />
      <ResultContainer>
        {renderContent()}
      </ResultContainer>
    </Container>
  )
}


export default Home;