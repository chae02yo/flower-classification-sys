import * as React from "react";

interface userFileUploadReturnType {
    image: any;

    handlePreview: (e: any) => void;
}

const useFileUpload: () => userFileUploadReturnType = () => {

    const [image, setImage]: any = React.useState(null);

    const handlePreview = (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        return new Promise<void>((resolve) => {
            reader.onload = () => {
                setImage(reader.result || null)
                resolve();
            }
        })
    };

    return {
        image,

        handlePreview,
    }
}

export default useFileUpload;