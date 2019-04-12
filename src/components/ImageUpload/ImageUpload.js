import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useDropzone} from 'react-dropzone';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import fallbackImage from './fallback-image.png';

const ThumbsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-items: center;
`;

const Image = styled.div`
  display: inline-flex;
  border-radius: 50px;
  margin-bottom: 10px;
  width: 100px;
  height: 100px;
  background-image: ${props => `url(${props.background})`};
  background-size: 100% auto;
`

const ImageUpload = ({ url = fallbackImage, onChange }) => {
  const [file, setFile] = useState({
    preview: url,
  });
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFile(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }));
    }
  });
  
  useEffect(() => () => {
    URL.revokeObjectURL && URL.revokeObjectURL(file.preview);
    if (onChange) {
      onChange(file);
    }
  }, [file]);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <ThumbsContainer className="dropzone">
        <Image background={file.preview || fallbackImage} />
        <Button variant="contained">
          {file.preview === fallbackImage ? 'Adicionar foto' : 'Alterar foto'}
        </Button>
      </ThumbsContainer>
    </div>
  );
}

ImageUpload.propTypes = {
  url: PropTypes.string,
  onChange: PropTypes.func,
}

export default ImageUpload;