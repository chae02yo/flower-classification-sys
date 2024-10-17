import * as React from 'react';
import usePredictFeedbackRequest from './hooks/usePredictFeedbackRequest';
import FileUpload from './FileUpload';

interface PredictFeedbackProps {
    image: File | null;
}

const PredictFeedbackRequest: React.FC<PredictFeedbackProps> = ({image}) => {
    const {readCorrectLabel, handleSubmit} = usePredictFeedbackRequest({image});

    return (
        <div>
            <input multiple type='text' onChange={readCorrectLabel}></input>
            <button onClick={handleSubmit}>피드백 보내기</button>
        </div>
    )
}

export default PredictFeedbackRequest;