import axios from "axios";
import * as React from "react";

interface useFileUploadProps {
    image: File | null;
}

interface useFileUploadReturnType {
    handleSubmit: () => void;
}

const useFileUpload = (props: useFileUploadProps): useFileUploadReturnType => {
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
            console.log(res.data);
        })
        .catch((error) => {
            console.error('Error upload file: ', error)
        });     
    }

    return {
        handleSubmit,
    }
}

export default useFileUpload;