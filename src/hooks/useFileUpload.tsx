import axios from "axios";
import * as React from "react";

interface useFileUploadProps {
    image: File | null;
}

interface useFileUploadReturnType {
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    handleSubmit: () => void;
}

const useFileUpload = (props: useFileUploadProps): useFileUploadReturnType => {
    const [text, setText] = React.useState('');
    
    const handleSubmit = () => {
        if (!props.image) {
            alert("이미지를 선택해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append('file', props.image);

        axios.post('/api/predict', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            setText(res.data.predicted_class);
            console.log(res.data);
        })
        .catch((error) => {
            console.error('Error upload file: ', error)
        });     
    }

    return {
        text,
        setText,
        handleSubmit,
    }
}

export default useFileUpload;