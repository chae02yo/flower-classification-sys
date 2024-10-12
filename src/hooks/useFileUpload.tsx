import axios from "axios";
import * as React from "react";

interface useFileUploadReturnType {
    image: any;

    handlePreview: (e: any) => void;
    handleSubmit: () => void;
}

const useFileUpload: () => useFileUploadReturnType = () => {
    const [image, setImage]: any = React.useState(null);
    const [prediction, setPrediction] = React.useState('');

    const handlePreview = (e: any) => {
        const file = e.target.files[0];
        setImage(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise<void>((resolve) => {
            reader.onload = () => {
                resolve();
            }
        });
    };

    const handleSubmit = () => {
        if (!image) {
            alert("이미지를 선택해주세요.");
            return;
        }

        const formData = new FormData();
        formData.append('file', image);

        axios.post('/api/predict', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            console.log(res.data);
            setPrediction(res.data.predictions);
        })
        .catch((error) => {
            console.error('Error upload file: ', error)
        });     
    }

    return {
        image,

        handlePreview,
        handleSubmit,
    }
}

export default useFileUpload;