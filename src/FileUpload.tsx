import * as React from 'react'
import useFileUpload from './hooks/useFileUpload';

interface FileUploadProps {
    setImage: (file: File | null) => void;
    image: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({setImage, image}) => {
    const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImage(file);
    }
    const {handleSubmit} = useFileUpload({image});

    return (
        <div>
            <input accept="image/*" multiple type='file' onChange={handlePreview}></input>

            {image && <img width={'80%'} src={URL.createObjectURL(image)} alt="preview" />}

            <button onClick={handleSubmit}>예측하기</button>
        </div>
    )
}

export default FileUpload;