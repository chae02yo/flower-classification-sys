import * as React from 'react'
import useFileUpload from './hooks/useFileUpload';

const FileUpload = () => {
    const {image, handlePreview, handleSubmit} = useFileUpload();

    return (
        <div>
            <input 
            accept="image/*"
            multiple type='file'
            onChange={handlePreview}
            ></input>

            {image && <img width={'80%'} src={URL.createObjectURL(image)} alt="preview" />}

            <button onClick={handleSubmit}>예측하기</button>
        </div>
    )
}

export default FileUpload;