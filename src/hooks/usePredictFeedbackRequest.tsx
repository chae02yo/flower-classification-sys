import axios from 'axios';
import * as React from 'react'
import useFileUpload from './useFileUpload';

interface usePredictFeedbackRequestProps {
    image: File | null;
}

interface usePredictFeedbackRequestReturnType {
    inputRef: React.RefObject<HTMLInputElement>;
    readCorrectLabel: (e: any) => void;
    handleSubmit: () => void;
}

const usePredictFeedbackRequest = (props: usePredictFeedbackRequestProps): usePredictFeedbackRequestReturnType => {
    const [correctLabel, setCorrectLabel] = React.useState("");

    const inputRef = React.useRef<HTMLInputElement>(null);

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
            alert('피드백이 성공적으로 전송됐습니다.');
            console.log('Submit success');

            // 텍스트 박스 초기화
            if (inputRef.current) {
                inputRef.current.value = '';
            }
        })
        .catch((error) => {
            console.error('Error submit file: ', error)
        });

    }

    return {
        inputRef,
        readCorrectLabel,
        handleSubmit
    }
}

export default usePredictFeedbackRequest;