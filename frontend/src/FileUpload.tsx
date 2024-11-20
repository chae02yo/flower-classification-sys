import * as React from 'react'
import useFileUpload from './hooks/useFileUpload';
import mainStyles from './css/Main.module.css'

interface FileUploadProps {
    setImage: (file: File | null) => void;
    image: File | null;
}

const FileUpload: React.FC<FileUploadProps> = ({setImage, image}) => {
    const {text, setText, handleSubmit} = useFileUpload({image});

    const handlePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setImage(file);

        // 이미지가 변경될 때 text 초기화
        if (file) {
            setText('');
        }
    }

    return (
        <div className={mainStyles.imageContainer}>
            <input accept="image/*" multiple type='file' onChange={handlePreview} className={mainStyles.fileInput}></input>

            {image && <img className={mainStyles.imagePreview} width={'80%'} src={URL.createObjectURL(image)} alt="preview" />}

            {text && (
                <div className={mainStyles.resultContainer}>
                    <p className={mainStyles.predictedClass}>{text}</p>
                </div>
            )}

            <button onClick={handleSubmit} className={mainStyles.predictButton}>예측하기</button>
        </div>
    )
}

export default FileUpload;