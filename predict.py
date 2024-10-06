from flask import Flask, request, jsonify
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np
import io
from PIL import Image

app = Flask(__name__)

model = tf.keras.models.load_model('flower_classification_model.h5')

class_names = ['동백꽃', '달맞이꽃', '목련']

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes))

    img = img.resize((224, 224))
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)

    predictions = model.predict(img_array)
    predicted_index = np.argmax(predictions[0]) # 가장 높은 예측 값을 가진 클래스 인덱스 추출

    predicted_class = class_names[predicted_index]

    result = {
        'predictions': predictions.tolist(),
        'predicted_class': predicted_class
    }


    return jsonify(result)

if __name__ == '__main__':
    app.run(host= '0.0.0.0', port = 5000)