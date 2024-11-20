import * as React from 'react'
import FileUpload from './FileUpload';
import PredictFeedbackRequest from './PredictFeedbackRequest';
import mainStyles from './css/Main.module.css'

const Main: React.FC = () => {
    const [image, setImage] = React.useState<File | null>(null);

    return (
        <div className={mainStyles.container}>
            <h1 className={mainStyles.title}>꽃 분류 시스템</h1>
            <FileUpload setImage={setImage} image={image} />
            <PredictFeedbackRequest image={image} />
        </div>
    )
}

export default Main;
