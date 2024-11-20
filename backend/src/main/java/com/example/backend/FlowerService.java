package com.example.backend;

import com.example.backend.domain.FlowerPredictFeedback;
import com.example.backend.domain.FlowerPredictFeedbackRepository;
import com.example.backend.dto.FlowerPredictFeedbackResponse;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class FlowerService {

    private final FlowerPredictFeedbackRepository flowerPredictFeedbackRepository;

    private final String FLASK_SERVER_URL = "http://localhost:5000/predict";

    public FlowerService(FlowerPredictFeedbackRepository flowerPredictFeedbackRepository) {
        this.flowerPredictFeedbackRepository = flowerPredictFeedbackRepository;
    }

    public ResponseEntity<String> uploadFile(MultipartFile file) throws IOException {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new MultipartInputStreamFileResource(file.getInputStream(), file.getOriginalFilename()));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        return restTemplate.postForEntity(FLASK_SERVER_URL, requestEntity, String.class);
    }

    @Transactional
    public void saveFeedback(MultipartFile image, String correctLabel) throws IOException {
        byte[] imageBytes = image.getBytes();

        flowerPredictFeedbackRepository.save(new FlowerPredictFeedback(imageBytes, correctLabel));
    }

    public List<FlowerPredictFeedbackResponse> getFlowerPredictFeedback() {
        return flowerPredictFeedbackRepository.findAll().stream()
                .map(FlowerPredictFeedbackResponse::new)
                .collect(Collectors.toList());
    }


    // MultipartFile을 InputStreamResource로 변환
    public static class MultipartInputStreamFileResource extends InputStreamResource {
        private final String filename;

        public MultipartInputStreamFileResource(InputStream inputStream, String filename) {
            super(inputStream);
            this.filename = filename;
        }

        @Override
        public String getFilename() {
            return this.filename;
        }

        @Override
        public long contentLength() throws IOException {
            return -1;
        }
    }
}
