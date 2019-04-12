import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import Loading from '../Loading/Loading';
import ImageUpload from '../ImageUpload/ImageUpload';

const ContainerInputs = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  > div {
    padding-bottom: 20px;
    width: 100%;
  }
`

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px 0;
  align-items: flex-start;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 40px;
  > button {
    margin: 0 5px;
    width: 85px;
    height: 36px;
  }
`

const UserForm = ({
    name,
    jobTitle,
    email,
    admissionDate,
    image,
    onSubmit,
    loading,
    onCancel,
  }) => {

  const [fields, changeFields] = useState({
    name,
    jobTitle,
    email,
    admissionDate,
    image,
  });

  const availableFields = {
    name: {
      value: 'Nome',
      placeholder: '',
    },
    email: {
      value: 'E-mail',
      placeholder: '',
    },
    jobTitle: {
      value: 'Cargo',
      placeholder: '',
    },
    admissionDate: {
      value: 'Data de admissão',
      placeholder: 'dd/mm/yyyy',
    }
  }

  const handleChange = e => {
    const { target: { name, value }} = e;
    changeFields({
      ...fields,
      [name]: value,
    });
  }

  const getDate = date => {
    const splittedDate = date.split('/');
    const day = splittedDate[0];
    const month = splittedDate[1];
    const year = splittedDate[2];

    return `${year}-${month}-${day}`;
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (onSubmit) {
      const { jobTitle, admissionDate, image, ...restFields } = fields;
      onSubmit({
        ...restFields,
        job_title: jobTitle,
        admission_date: getDate(admissionDate),
        photo_url: image || '',
      })
    }
  }

  const handleChangeImage = ({ preview }) => {
    changeFields({
      ...fields,
      image: preview,
    })
  }

  const { image: imageUrl, ...restFields } = fields;
  return (
    <StyledForm onSubmit={handleSubmit}>
      <ImageUpload onChange={handleChangeImage} url={imageUrl} />
      <ContainerInputs>
        {Object.keys(restFields).map(field => (
          <FormControl key={field}>
            <InputLabel htmlFor={field}>{availableFields[field].value}</InputLabel>
            <Input
              name={field}
              id={field}
              value={restFields[field]}
              data-testid={field}
              onChange={handleChange}
              placeholder={availableFields[field].placeholder}
            />
          </FormControl>
        ))}
        <ButtonContainer>
          <Button data-testid="submitButton" variant="contained" type="submit" color="primary">
            {loading ? <Loading color="white" size="small" /> : 'Enviar' }
          </Button>
          <Button variant="contained" onClick={onCancel}>
            Voltar
          </Button>
        </ButtonContainer>
      </ContainerInputs>
    </StyledForm>
  )
}

UserForm.propTypes = {
  name: PropTypes.string,
  jobTitle: PropTypes.string,
  email: PropTypes.string,
  admissionDate: PropTypes.string,
  image: PropTypes.string,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  loading: PropTypes.bool,
}

export default UserForm;