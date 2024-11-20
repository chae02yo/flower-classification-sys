import * as React from 'react';
import usePredictFeedbackRequest from './hooks/usePredictFeedbackRequest';
import FileUpload from './FileUpload';
import mainStyles from './css/Main.module.css'

interface PredictFeedbackProps {
    image: File | null;
}

const PredictFeedbackRequest: React.FC<PredictFeedbackProps> = ({image}) => {
    const {inputRef, readCorrectLabel, handleSubmit} = usePredictFeedbackRequest({image});

    return (
        <div>
            <div className={mainStyles.tooltipContainer}>
                <span className={mainStyles.tooltipIcon}>!</span>
                <span className={mainStyles.tooltipText}>꽃을 잘못 예측했나요?</span>
            </div>

            <div className={mainStyles.feedbackContainer}>
                <input  ref={inputRef} multiple type='text' onChange={readCorrectLabel} placeholder='올바른 꽃 이름을 작성해주세요.' className={mainStyles.textbox}></input>
                <button onClick={handleSubmit} className={mainStyles.feedbackButton}>피드백 전송</button>
            </div>
        </div>
    )
}

export default PredictFeedbackRequest;