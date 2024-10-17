import * as React from 'react'
import FileUpload from './FileUpload';
import PredictFeedbackRequest from './PredictFeedbackRequest';

const Main: React.FC = () => {
    const [image, setImage] = React.useState<File | null>(null);

    return (
        <div>
            <FileUpload setImage={setImage} image={image} />
            <PredictFeedbackRequest image={image} />
        </div>
    )
}

export default Main;
