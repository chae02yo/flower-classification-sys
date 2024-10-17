import axios from 'axios';
import * as React from 'react'
import useFileUpload from './useFileUpload';

interface usePredictFeedbackRequestProps {
    image: File | null;
}

interface usePredictFeedbackRequestReturnType {
    readCorrectLabel: (e: any) => void;
    handleSubmit: () => void;
}

const usePredictFeedbackRequest = (props: usePredictFeedbackRequestProps): usePredictFeedbackRequestReturnType => {
    const [correctLabel, setCorrectLabel] = React.useState("");

    const readCorrectLabel = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCorrectLabel(e.target.value);
    }

    const handleSubmit = () => {
        if (!props.image) {
            console.error("No image file provided");
            return;
        }
        const formData = new FormData();
        formData.append('file', props.image);
        formData.append('correctLabel', correctLabel);

        axios.post('/api/feedback', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then((res) => {
            console.log('Submit success');
        })
        .catch((error) => {
            console.error('Error submit file: ', error)
        });

    }

    return {
        readCorrectLabel,
        handleSubmit
    }
}

export default usePredictFeedbackRequest;