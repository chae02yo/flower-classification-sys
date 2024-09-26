import * as React from 'react'
import useFileUpload from './hooks/useFileUpload';

const FileUpload = () => {
    const {image, handlePreview} = useFileUpload();

    return (
        <div>
            <input 
            accept="image/*"
            multiple type='file'
            onChange={handlePreview}
            ></input>

            <img width={'100%'}
            src={image}
            />
        </div>
    )
}

export default FileUpload;