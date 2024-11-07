from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np
import io
from PIL import Image
import json

app = Flask(__name__)

# 모델 로드
model = tf.keras.models.load_model('flower_classification_model_3.h5')

# 신뢰도 임계값
CONFIDENCE_THRESHOLD = 0.5

# 클래스 이름 로드
with open('class_names.json', 'r') as f:
    class_names = json.load(f)

class_names = [class_names[str(i)] for i in range(len(class_names))]

# 전처리 함수 정의
def preprocess_image(image):
    np_image = np.array(image)

    if image.size[0] > image.size[1]:
        image.thumbnail((10000000, 256))
    else:
        image.thumbnail((256, 10000000))

    left_margin = (image.width - 224) / 2
    bottom_margin = (image.height - 224) / 2
    right_margin = left_margin + 224
    top_margin = bottom_margin + 224

    image = image.crop((left_margin, bottom_margin, right_margin, top_margin))
    
    np_image = np.array(image) / 255.0
    mean = np.array([0.485, 0.456, 0.406])
    std = np.array([0.229, 0.224, 0.225])
    np_image = (np_image - mean) / std

    return np_image

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400
    
    file = request.files['file']
    img_bytes = file.read()
    img = Image.open(io.BytesIO(img_bytes))
    
    # 전처리 적용
    img_array = preprocess_image(img)
    img_array = np.expand_dims(img_array, axis=0)

    # 예측
    predictions = model.predict(img_array)
    predicted_index = np.argmax(predictions[0])  # 예측 확률이 가장 높은 클래스 인덱스
    predicted_confidence = np.max(predictions[0])  # 최고 예측 확률

    # 신뢰도 임계값에 따라 결과 결정
    if predicted_confidence < CONFIDENCE_THRESHOLD:
        result = {
            'predicted_class': '꽃이 아닌 이미지입니다.',
            'confidence': str(predicted_confidence)
        }
    else:
        result = {
            'predicted_class': class_names[predicted_index],
            'predictions': predictions.tolist(),
            'confidence': str(predicted_confidence)
        }

    return jsonify(result)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
